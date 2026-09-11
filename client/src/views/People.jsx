import { useAppStore } from "../store";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const People = () => {
  const user = useAppStore((state) => state.user);
  const users = useAppStore((state) => state.users);
  const userLoading = useAppStore((state) => state.userLoading);
  const router = useNavigate();

  const fetchAvailableUsers = useAppStore(
    (state) => state.fetchAvailableUsers,
  );

  const handleView = (userId) => {
    // Navigate to user detail page
    router(`/people/${userId}`);
  }

  useEffect(() => {
    fetchAvailableUsers();
    document.title = "Subscription Manager - People";
  }, [fetchAvailableUsers]);

  return (
    <div className="space-y-8">
      {/* Dynamic Greeting Header */}
      <div className="sm:flex sm:items-center sm:justify-between border-b border-gray-100 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Welcome back,{" "}
            {user?.userData?.username || "Subscriber"}!
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Connect with friends, family, or colleagues to share subscription insights and manage group expenses collaboratively.
          </p>
        </div>
      </div>

      {/* Loading Indicator Fallback */}
      {userLoading && users.length === 0 ? (
        <div className="flex justify-center py-12 text-sm text-gray-400 animate-pulse">
          Syncing user inventory...
        </div>
      ) : users.length === 0 ? (
        /* Empty Catalog Fallback Layout */
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-2xl">
          <span className="text-3xl">📦</span>
          <p className="mt-2 text-sm font-medium text-gray-900">
            No users cataloged yet
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Get started by creating your very first user profile.
          </p>
        </div>
      ) : (
        /* Reactive Service Grid Deck */
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-xs transition-all hover:shadow-md hover:border-gray-300/70"
            >
              <div className="flex items-start gap-4">
                <div className="space-y-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 truncate">
                    {user.username}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                    {user.email}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleView(user.id)}
                  className="inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-semibold text-green-600 bg-green-50/50 hover:bg-green-50 border border-green-100 transition-colors"
                >
                  View
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default People;
