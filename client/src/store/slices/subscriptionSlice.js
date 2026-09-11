import httpClient from "../../plugins/interceptor";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils";

export const createSubscriptionSlice = (set, get) => ({
  // State Definitions
  availableSubscriptions: [],
  subscriptionDetails: null,
  subscriptionCount: 0,
  nextPageUrl: null,
  prevPageUrl: null,
  subscriptionLoading: false,
  subscriptionError: null,

  // 1. READ: Fetch Subscriptions (Supports DRF pagination URLs)
  fetchAvailableSubscriptions: async (urlOrPath = "/subscriptions") => {
    set({ subscriptionLoading: true, subscriptionError: null });
    try {

      const res = await httpClient.get(urlOrPath);

      set({
        availableSubscriptions: res.data.results,
        subscriptionCount: res.data.count,
        nextPageUrl: res.data.next,
        prevPageUrl: res.data.previous,
        subscriptionLoading: false,
      });
    } catch (err) {
      console.error("Fetch subscriptions error:", err);
      set({
        subscriptionError:
          err.response?.data?.detail || "Failed to fetch subscriptions",
        subscriptionLoading: false,
      });
    }
  },

  // GET single subscription by ID (for detail view)
  fetchSubscriptionById: async (id) => {
    set({ subscriptionLoading: true, subscriptionError: null });
    try {
      const res = await httpClient.get(`/subscriptions/${id}`);
      set({ subscriptionDetails: res.data, subscriptionLoading: false });
      return res.data;
    } catch (err) {
      console.error(`Fetch subscription ${id} error:`, err);
      set({
        subscriptionError:
          err.response?.data?.detail || "Failed to fetch subscription details",
        subscriptionLoading: false,
      });
      throw err;
    }
  },

  // 2. CREATE: Add New Subscription
  addSubscription: async (newSubscriptionData) => {
    set({ subscriptionLoading: true, subscriptionError: null });
    try {
      const res = await httpClient.post("/subscriptions", newSubscriptionData);

      set({
        availableSubscriptions: [res.data, ...get().availableSubscriptions],
        subscriptionCount: get().subscriptionCount + 1,
        subscriptionLoading: false,
      });

      toast.success("Subscription successfully created!", toastOptions);
      return res.data;
    } catch (err) {
      console.error("Create subscription error:", err);
      const msg = err.response?.data?.detail || "Failed to create subscription";
      set({ subscriptionError: msg, subscriptionLoading: false });
      toast.error(msg, toastOptions);
      throw err;
    }
  },

  // 3. UPDATE: Modify subscription details
  updateSubscription: async (id, updatedData) => {
    set({ subscriptionLoading: true, subscriptionError: null });
    try {
      const res = await httpClient.put(`/subscriptions/${id}`, updatedData);

      const updatedList = get().availableSubscriptions.map((subscription) =>
        subscription.id === id ? res.data : subscription,
      );

      set({ availableSubscriptions: updatedList, subscriptionLoading: false });
      toast.success("Subscription updated!", toastOptions);
      return res.data;
    } catch (err) {
      console.error("Update subscription error:", err);
      const msg = err.response?.data?.detail || "Failed to update subscription";
      set({ subscriptionError: msg, subscriptionLoading: false });
      toast.error(msg, toastOptions);
      throw err;
    }
  },

  // 4. DELETE: Remove subscription
  deleteSubscription: async (id) => {
    set({ subscriptionLoading: true, subscriptionError: null });
    try {
      await httpClient.delete(`/subscriptions/${id}`);

      const filteredList = get().availableSubscriptions.filter(
        (subscription) => subscription.id !== id,
      );

      set({
        availableSubscriptions: filteredList,
        subscriptionCount: Math.max(0, get().subscriptionCount - 1),
        subscriptionLoading: false,
      });

      toast.success("Subscription deleted.", toastOptions);
    } catch (err) {
      console.error("Delete subscription error:", err);
      const msg = err.response?.data?.detail || "Failed to delete subscription";
      set({ subscriptionError: msg, subscriptionLoading: false });
      toast.error(msg, toastOptions);
      throw err;
    }
  },
});
