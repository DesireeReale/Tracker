import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  User, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut 
} from 'firebase/auth';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  setDoc, 
  getDoc,
  serverTimestamp,
  orderBy
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export interface Transaction {
  id: string;
  category: string;
  amount: number;
  date: string;
  description: string;
  type: 'expense' | 'fixed' | 'income';
  userId: string;
}

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface AppContextType {
  user: User | null;
  loading: boolean;
  salary: number;
  setSalary: (amount: number) => Promise<void>;
  savingsGoal: number;
  setSavingsGoal: (amount: number) => Promise<void>;
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, 'id' | 'userId'>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  totalExpenses: number;
  totalFixedCosts: number;
  balance: number;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [salary, setSalaryState] = useState(4500);
  const [savingsGoal, setSavingsGoalState] = useState(1000);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        // Load user settings
        try {
          const userDoc = await getDoc(doc(db, 'userProfiles', u.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setSalaryState(data.salary || 4500);
            setSavingsGoalState(data.savingsGoal || 1000);
          } else {
            // Create default profile
            await setDoc(doc(db, 'userProfiles', u.uid), {
              userId: u.uid,
              salary: 4500,
              savingsGoal: 1000,
              updatedAt: serverTimestamp()
            });
          }
        } catch (error) {
          console.error("Error loading profile", error);
        }
      } else {
        setTransactions([]);
        setSalaryState(4500);
        setSavingsGoalState(1000);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', user.uid),
      orderBy('date', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const txs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Transaction[];
      setTransactions(txs);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'transactions');
    });

    return () => unsubscribe();
  }, [user]);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const setSalary = async (amount: number) => {
    if (!user) return;
    try {
      await setDoc(doc(db, 'userProfiles', user.uid), {
        salary: amount,
        updatedAt: serverTimestamp()
      }, { merge: true });
      setSalaryState(amount);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `userProfiles/${user.uid}`);
    }
  };

  const setSavingsGoal = async (amount: number) => {
    if (!user) return;
    try {
      await setDoc(doc(db, 'userProfiles', user.uid), {
        savingsGoal: amount,
        updatedAt: serverTimestamp()
      }, { merge: true });
      setSavingsGoalState(amount);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `userProfiles/${user.uid}`);
    }
  };

  const addTransaction = async (t: Omit<Transaction, 'id' | 'userId'>) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'transactions'), {
        ...t,
        userId: user.uid,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'transactions');
    }
  };

  const deleteTransaction = async (id: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'transactions', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `transactions/${id}`);
    }
  };

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalFixedCosts = transactions
    .filter(t => t.type === 'fixed')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = salary - totalExpenses - totalFixedCosts;

  return (
    <AppContext.Provider value={{
      user, loading,
      salary, setSalary,
      savingsGoal, setSavingsGoal,
      transactions, addTransaction, deleteTransaction,
      totalExpenses, totalFixedCosts, balance,
      login, logout
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
