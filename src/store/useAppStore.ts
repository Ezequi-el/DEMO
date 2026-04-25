import { create } from 'zustand';

interface RewardRecord {
  id: string;
  rewardId: number;
  name: string;
  type: 'time' | 'unlock' | 'benefit';
  date: string;
  instructions: string;
}

interface UserState {
  role: 'minor' | 'guardian' | 'authority';
  currentView: 'home' | 'rewards' | 'alerts' | 'profile' | 'settings' | 'education';
  points: number;
  streak: number;
  username: string;
  age: number;
  isLinkedToTutor: boolean;
  isAuthenticated: boolean;
  isSigningUp: boolean;
  inventory: RewardRecord[];
  logout: () => void;
  login: () => void;
  setIsSigningUp: (isSigningUp: boolean) => void;
  setPoints: (points: number) => void;
  setRole: (role: 'minor' | 'guardian' | 'authority') => void;
  setCurrentView: (view: 'home' | 'rewards' | 'alerts' | 'profile' | 'settings' | 'education') => void;
  addPoints: (amount: number) => void;
  setLinkedToTutor: (isLinked: boolean) => void;
  addToInventory: (rewardRecord: RewardRecord) => void;
  setAge: (age: number) => void;
}

export const useAppStore = create<UserState>((set) => ({
  role: 'minor',
  currentView: 'home',
  points: 1250,
  streak: 5,
  username: 'AlexDigital',
  age: 11,
  isLinkedToTutor: true,
  isAuthenticated: false,
  isSigningUp: false,
  inventory: [],
  login: () => set({ isAuthenticated: true }),
  setIsSigningUp: (isSigningUp) => set({ isSigningUp }),
  logout: () => set({ role: 'minor', currentView: 'home', username: 'AlexDigital', age: 11, isAuthenticated: false, isSigningUp: false, isLinkedToTutor: true, inventory: [] }),
  setPoints: (points) => set({ points }),
  setRole: (role) => set({ role }),
  setCurrentView: (currentView) => set({ currentView }),
  addPoints: (amount) => set((state) => ({ points: state.points + amount })),
  setLinkedToTutor: (isLinkedToTutor) => set({ isLinkedToTutor }),
  addToInventory: (rewardRecord) => set((state) => ({ inventory: [rewardRecord, ...state.inventory] })),
  setAge: (age) => set({ age }),
}));
