import httpClient from "../../plugins/interceptor";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { toastOptions } from "../../utils";

export const createAuthSlice = (set, get) => {
  let initialUser = null;

  if (Cookies.get("user")) {
    try {
      initialUser = JSON.parse(Cookies.get("user"));
    } catch (err) {
      console.warn("Failed to parse stored user cookie:", err);
      initialUser = null;
    }
  }

  return {
    user: initialUser,
    profileData: null,
    token: Cookies.get("token") || null,
    authLoading: false,
    authError: null,

    loginUser: async (email, password) => {
      try {
        set({ authLoading: true, authError: null });

        const response = await httpClient.post(
          "auth/login",
          { email, password },
          { timeout: 10000 },
        );

        if (response.status !== 200) {
          throw new Error("Login failed");
        }

        toast.success("Login successful", toastOptions);

        Cookies.set("user", JSON.stringify(response.data), { expires: 7 });
        Cookies.set("token", response.data.access, { expires: 7 });

        set({
          user: response.data,
          token: response.data.access,
          authLoading: false,
        });
      } catch (error) {
        console.error("Login error:", error);
        const backendMessage =
          error.response?.data?.message ||
          error.response?.data?.detail ||
          error.response?.data?.error ||
          (error.code === "ECONNABORTED"
            ? "Login request timed out. Please try again."
            : null) ||
          "Failed to login";

        set({ authError: backendMessage, authLoading: false });
      }
    },

    logoutUser: () => {
      Cookies.remove("user");
      Cookies.remove("token");
      set({ user: null, token: null, authError: null });
      toast.success("Logout successful", toastOptions);
    },

    registerUser: async (username, email, password) => {
      try {
        set({ authLoading: true, authError: null });
        await httpClient.post("auth", { username, email, password });
        toast.success("Registration successful! Please log in.", toastOptions);
      } catch (error) {
        console.error("Registration error:", error);
        const backendMessage =
          error.response?.data?.detail || "Failed to register";
        set({ authError: backendMessage });
      } finally {
        set({ authLoading: false });
      }
    },

    fetchUser: async () => {
      try {
        set({ authLoading: true, authError: null });
        const token = Cookies.get("token");

        if (!token) {
          set({ authError: "No token found", authLoading: false });
          return;
        }

        const response = await httpClient.get(
          "http://localhost:8000/api/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        console.log("Fetched user profile:", response.data);
        set({ profileData: response.data, authLoading: false });
      } catch (error) {
        console.error("Fetch user error:", error);
        set({ authError: "Failed to fetch user", authLoading: false });
      }
    },

    updateUser: async (updatedData) => {
      try {
        set({ authLoading: true, authError: null });
        const token = Cookies.get("token");

        if (!token) {
          set({ authError: "No token found", authLoading: false });
          return;
        }

        const response = await httpClient.put(
          "http://localhost:8000/api/profile",
          updatedData,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        set({ profileData: response.data, authLoading: false });
        toast.success("Profile updated successfully", toastOptions);
      } catch (error) {
        console.error("Update user error:", error);
        const backendMessage =
          error.response?.data?.detail || "Failed to update profile";
        set({ authError: backendMessage, authLoading: false });
      }
    },

    updatePassword: async (currentPassword, newPassword) => {
      try {
        set({ authLoading: true, authError: null });
        const token = Cookies.get("token");

        if (!token) {
          set({ authError: "No token found", authLoading: false });
          return;
        }

        await httpClient.post(
          "http://localhost:8000/api/change-password",
          { current_password: currentPassword, new_password: newPassword },
          { headers: { Authorization: `Bearer ${token}` } },
        );

        set({ authLoading: false });
        toast.success("Password updated successfully", toastOptions);
      } catch (error) {
        console.error("Update password error:", error);

        // Look for detail, message, OR your specific non_field_errors array
        const backendData = error.response?.data;
        let backendMessage = "Failed to update password";

        if (backendData) {
          if (Array.isArray(backendData.non_field_errors)) {
            backendMessage = backendData.non_field_errors.join(", ");
          } else {
            backendMessage =
              backendData.detail || backendData.message || backendMessage;
          }
        }

        set({ authError: backendMessage, authLoading: false });
        
        throw new Error(backendMessage);
      }
    },
  };
};
