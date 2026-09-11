import httpClient from "../../plugins/interceptor";

export const createUserSlice = (set, get) => ({
  // State Definitions
  users: [],
  userData: null,
  userCount: 0,
  nextPageUrl: null,
  prevPageUrl: null,
  userLoading: false,
  userError: null,

  // 1. READ: Fetch Users (Supports DRF pagination URLs)
  fetchAvailableUsers: async (urlOrPath = "/users") => {
    set({ userLoading: true, userError: null });
    try {
      const requestPath = urlOrPath.includes("http")
        ? urlOrPath.split("/api")[1]
        : urlOrPath;

      const res = await httpClient.get(requestPath);

      set({
        users: res.data.results,
        userCount: res.data.count,
        nextPageUrl: res.data.next,
        prevPageUrl: res.data.previous,
        userLoading: false,
      });
    } catch (err) {
      console.error("Fetch users error:", err);
      set({
        userError: err.response?.data?.detail || "Failed to fetch users",
        userLoading: false,
      });
    }
  },

  // GET single user by ID (for detail view)
  fetchUserById: async (id) => {
    set({ userLoading: true, userError: null });
    try {
      const res = await httpClient.get(`/users/${id}`);
      set({ userData: res.data, userLoading: false });
      return res.data;
    } catch (err) {
      console.error(`Fetch user ${id} error:`, err);
      set({
        userError: err.response?.data?.detail || "Failed to fetch user details",
        userLoading: false,
      });
      throw err;
    }
  },

  // follow a user
  followUser: async (id) => {
    set({ userLoading: true, userError: null });
    try {
      const res = await httpClient.get(`/users/${id}`);
      set({ userData: res.data, userLoading: false });
      return res.data;
    } catch (err) {
      console.error(`Fetch user ${id} error:`, err);
      set({
        userError: err.response?.data?.detail || "Failed to fetch user details",
        userLoading: false,
      });
      throw err;
    }
  },

  // unfollow a user
  unfollowUser: async (id) => {
    set({ userLoading: true, userError: null });
    try {
      const res = await httpClient.get(`/users/${id}`);
      set({ userData: res.data, userLoading: false });
      return res.data;
    } catch (err) {
      console.error(`Fetch user ${id} error:`, err);
      set({
        userError: err.response?.data?.detail || "Failed to fetch user details",
        userLoading: false,
      });
      throw err;
    }
  },

  // accept follow invitation
  acceptInvitation: async (id) => {
    set({ userLoading: true, userError: null });
    try {
      const res = await httpClient.get(`/users/${id}`);
      set({ userData: res.data, userLoading: false });
      return res.data;
    } catch (err) {
      console.error(`Fetch user ${id} error:`, err);
      set({
        userError: err.response?.data?.detail || "Failed to fetch user details",
        userLoading: false,
      });
      throw err;
    }
  },
});
