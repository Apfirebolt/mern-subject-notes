import { Routes, Route, useLocation, useNavigate } from "react-router";
import Home from "./views/Home";
import Login from "./views/Login";
import Footer from "./components/FooterComponent";
import Header from "./components/HeaderComponent";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import Settings from "./views/Settings";
import SubjectDetail from "./views/SubjectDetail";
import { ToastContainer } from "react-toastify";
import { useAppStore } from "./store";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const isPlainPage = ["/", "/login", "/register"].includes(location.pathname);

  // 3. Fixed selection keyword mapper here: change state.logout to state.logoutUser
  const logoutUser = useAppStore((state) => state.logoutUser);

  const logOut = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {!isPlainPage && <Header logOut={logOut} />}
      
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
              <Route path="/settings" element={<Settings />} />
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
