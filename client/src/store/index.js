import { create } from 'zustand';
import { createAuthSlice } from './slices/authSlice';
import { createServiceSlice } from './slices/serviceSlice';
import { createSubscriptionSlice } from './slices/subscriptionSlice';
import { createBudgetSlice } from './slices/budgetSlice';
import { createUserSlice } from './slices/userSlice';

export const useAppStore = create((set, get) => ({
  ...createAuthSlice(set, get),
  ...createServiceSlice(set, get),
  ...createSubscriptionSlice(set, get),
  ...createBudgetSlice(set, get),
  ...createUserSlice(set, get),
}));