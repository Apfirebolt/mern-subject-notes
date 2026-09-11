import { useAppStore } from "../store";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";

const UserDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const user = useAppStore((state) => state.user);
  const userLoading = useAppStore((state) => state.userLoading);
  const fetchUserDetail = useAppStore((state) => state.fetchUserDetail);

  useEffect(() => {
    if (userId) {
      fetchUserDetail(userId);
    }
    document.title = "Subscription Manager - User Detail";
  }, [userId, fetchUserDetail]);

  if (userLoading) {
    return (
      <div className="flex justify-center py-12 text-sm text-gray-400 animate-pulse">
        Loading user details...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">User not found</p>
        <button
          onClick={() => navigate("/people")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to People
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <button
        onClick={() => navigate("/people")}
        className="text-sm text-blue-600 hover:text-blue-700 mb-4"
      >
        ← Back to People
      </button>

      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-xs">
        <h1 className="text-3xl font-bold text-gray-900">
          {user?.userData?.username || user?.username}
        </h1>
        <p className="mt-2 text-gray-600">{user?.email}</p>
      </div>
    </div>
  );
};

export default UserDetail;
