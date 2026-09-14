import { Routes, Route, Link, useLocation, useNavigate } from "react-router"; // 1. Added useNavigate
import Home from "./views/Home";
import Login from "./views/Login";
import Footer from "./components/FooterComponent";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import SubjectDetail from "./views/SubjectDetail";
import { ToastContainer } from "react-toastify";
import { useAppStore } from "./store";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const isPlainPage = ["/", "/login", "/register"].includes(location.pathname);

  // 3. Fixed selection keyword mapper here: change state.logout to state.logoutUser
  const logoutUser = useAppStore((state) => state.logoutUser);

  const linkClass = (path) => {
    const base = "px-4 py-2 rounded-lg font-medium text-sm transition-all ";
    return location.pathname === path
      ? base + "bg-indigo-600 text-white shadow-sm"
      : base + "text-gray-600 hover:bg-gray-100 hover:text-gray-900";
  };

  const logOut = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* App Header: Only shows when logged in and browsing app views */}
      {!isPlainPage && (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
              💸 <span className="hidden sm:inline">Notespace</span>
            </h1>
            <nav className="flex space-x-1 sm:space-x-2 items-center">
              <Link to="/dashboard" className={linkClass("/dashboard")}>
                Dashboard
              </Link>
              <Link to="/settings" className={linkClass("/settings")}>
                Settings
              </Link>

              {/* 5. Swapped Link for a semantic button component layout to handle event trigger cleanly */}
              <button
                onClick={logOut}
                className="px-3 py-2 text-sm text-gray-400 hover:text-red-500 font-medium transition-colors cursor-pointer"
              >
                Logout
              </button>
            </nav>
          </div>
        </header>
      )}

      {/* Main View Container */}
      <main className={isPlainPage ? "" : "max-w-5xl mx-auto px-4 py-8"}>
        {isPlainPage ? (
          /* Public / Authentication Views (No card wrapper) */
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        ) : (
          /* Protected / Application Management Dashboard Views */
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm min-h-[400px]">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/subjects/:subjectId" element={<SubjectDetail />} />
            </Routes>
          </div>
        )}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </main>
      <Footer />
    </div>
  );
}
