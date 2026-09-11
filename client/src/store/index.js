import { create } from 'zustand';
import { createAuthSlice } from './slices/authSlice';
import { createUserSlice } from './slices/userSlice';
import { createSubjectSlice } from './slices/subjectSlice';

export const useAppStore = create((set, get) => ({
  ...createAuthSlice(set, get),
  ...createUserSlice(set, get),
  ...createSubjectSlice(set, get)
}));