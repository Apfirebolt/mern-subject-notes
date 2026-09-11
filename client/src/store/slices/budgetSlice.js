import httpClient from "../../plugins/interceptor";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils";

export const createBudgetSlice = (set, get) => ({
  // State Definitions
  availableBudgets: [],
  budgetCount: 0,
  nextPageUrl: null,
  prevPageUrl: null,
  budgetLoading: false,
  budgetError: null,

  // 1. READ: Fetch Budgets (Supports DRF pagination URLs)
  fetchAvailableBudgets: async (urlOrPath = "/budgets") => {
    set({ budgetLoading: true, budgetError: null });
    try {
      const requestPath = urlOrPath.includes("http")
        ? urlOrPath.split("/api")[1]
        : urlOrPath;

      const res = await httpClient.get(requestPath);

      set({
        availableBudgets: res.data.results,
        budgetCount: res.data.count,
        nextPageUrl: res.data.next,
        prevPageUrl: res.data.previous,
        budgetLoading: false,
      });
    } catch (err) {
      console.error("Fetch budgets error:", err);
      set({
        budgetError: err.response?.data?.detail || "Failed to fetch budgets",
        budgetLoading: false,
      });
    }
  },

  // 2. CREATE: Add New Budget
  addBudget: async (budgetData) => {
    set({ budgetLoading: true, budgetError: null });
    try {
      const res = await httpClient.post("/budgets", budgetData);

      set((prev) => ({
        availableBudgets: [res.data, ...prev.availableBudgets],
        budgetCount: prev.budgetCount + 1,
        budgetLoading: false,
      }));

      toast.success("Budget created!", toastOptions);
      return res.data;
    } catch (err) {
      console.error("Add budget error:", err);
      const msg = err.response?.data?.detail || "Failed to create budget";
      set({ budgetError: msg, budgetLoading: false });
      toast.error(msg, toastOptions);
      throw err;
    }
  },
  
  // 3. UPDATE: Modify budget details
  updateBudget: async (id, updatedData) => {
    set({ budgetLoading: true, budgetError: null });
    try {
      const res = await httpClient.put(`/budgets/${id}`, updatedData);

      const updatedList = get().availableBudgets.map((budget) =>
        budget.id === id ? res.data : budget,
      );

      set({ availableBudgets: updatedList, budgetLoading: false });
      toast.success("Budget updated!", toastOptions);
      return res.data;
    } catch (err) {
      console.error("Update budget error:", err);
      const msg = err.response?.data?.detail || "Failed to update budget";
      set({ budgetError: msg, budgetLoading: false });
      toast.error(msg, toastOptions);
      throw err;
    }
  },

  // 4. DELETE: Remove budget
  deleteBudget: async (id) => {
    set({ budgetLoading: true, budgetError: null });
    try {
      await httpClient.delete(`/budgets/${id}`);

      const filteredList = get().availableBudgets.filter(
        (budget) => budget.id !== id,
      );

      set({
        availableBudgets: filteredList,
        budgetCount: Math.max(0, get().budgetCount - 1),
        budgetLoading: false,
      });

      toast.success("Budget deleted.", toastOptions);
    } catch (err) {
      console.error("Delete budget error:", err);
      const msg = err.response?.data?.detail || "Failed to delete budget";
      set({ budgetError: msg, budgetLoading: false });
      toast.error(msg, toastOptions);
      throw err;
    }
  },
});
