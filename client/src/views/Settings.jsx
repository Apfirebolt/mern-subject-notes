import { useEffect, useState } from "react";
import { useAppStore } from "../store";
import { Field, Label, Input } from "@headlessui/react";
import { toast } from "react-toastify";

const Settings = () => {
  const user = useAppStore((state) => state.profileData);
  const fetchUserProfile = useAppStore((state) => state.fetchUser);
  const updateUserProfile = useAppStore((state) => state.updateUser);
  const changePassword = useAppStore((state) => state.updatePassword);
  const authLoading = useAppStore((state) => state.authLoading);
  const authError = useAppStore((state) => state.authError);

  // 1. Separate states for both individual forms
  const [profileForm, setProfileForm] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // 2. Synchronize store user data into local form states on load
  useEffect(() => {
    fetchUserProfile();
    document.title = "Subscription Manager - Settings";
  }, [fetchUserProfile]);

  useEffect(() => {
    if (user) {
      // Accommodate nested structure variations safely
      const data = user.userData || user;
      setProfileForm({
        username: data.username || "",
        email: data.email || "",
        firstName: data.firstName || "",
        lastName: data.lastName || "",
      });
    }
  }, [user]);

  // 3. Form Input Change Handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  // 4. Form Submission Actions
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(profileForm);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    try {
      // Hook this directly to a changePassword state trigger inside authSlice later
      await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      toast.success("Password updated successfully!");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      console.log('Some error occurred while changing password', err);
      toast.error(err.message || "Failed to update password");
    }
  };

  return (
    <div className="space-y-10 divide-y divide-gray-200">
      
      {/* ─── SECTION 1: PROFILE INFORMATION FORM ─── */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">Profile Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            Update your public user handle, personal identity tokens, and core mailing destination details.
          </p>
        </div>

        <form onSubmit={handleProfileSubmit} className="md:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-6">
          {authError && (
            <div className="rounded-xl bg-red-50 p-4 border border-red-100 text-sm text-red-800">{authError}</div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field className="space-y-1">
              <Label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Username</Label>
              <Input
                type="text"
                name="username"
                required
                value={profileForm.username}
                onChange={handleProfileChange}
                className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition"
              />
            </Field>

            <Field className="space-y-1">
              <Label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Email Address</Label>
              <Input
                type="email"
                name="email"
                required
                value={profileForm.email}
                onChange={handleProfileChange}
                className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field className="space-y-1">
              <Label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">First Name</Label>
              <Input
                type="text"
                name="firstName"
                value={profileForm.firstName}
                onChange={handleProfileChange}
                placeholder="Not configured yet"
                className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition"
              />
            </Field>

            <Field className="space-y-1">
              <Label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Name</Label>
              <Input
                type="text"
                name="lastName"
                value={profileForm.lastName}
                onChange={handleProfileChange}
                placeholder="Not configured yet"
                className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition"
              />
            </Field>
          </div>

          {user?.is_staff && (
            <div className="inline-flex items-center gap-1.5 rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-600/20">
              🛡️ System Staff Privileges Authorized
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={authLoading}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 disabled:opacity-50 transition-colors cursor-pointer"
            >
              Save Profile changes
            </button>
          </div>
        </form>
      </div>

      {/* ─── SECTION 2: CHANGE PASSWORD SECURITY FORM ─── */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 pt-10 md:grid-cols-3">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">Security Credentials</h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            Revoke old operational token values and establish a new authorization password checkpoint sequence.
          </p>
        </div>

        <form onSubmit={handlePasswordSubmit} className="md:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-5">
          <Field className="space-y-1">
            <Label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Current Password</Label>
            <Input
              type="password"
              name="currentPassword"
              required
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition"
            />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field className="space-y-1">
              <Label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">New Password</Label>
              <Input
                type="password"
                name="newPassword"
                required
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition"
              />
            </Field>

            <Field className="space-y-1">
              <Label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Confirm New Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                required
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition"
              />
            </Field>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={authLoading}
              className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-gray-800 disabled:opacity-50 transition-colors cursor-pointer"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Settings;