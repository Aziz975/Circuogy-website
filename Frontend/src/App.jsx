
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/Pages/Home";
import Services from "./components/Pages/Services";
import Technology from "./components/Pages/Technology";
import Pledge from "./components/Pages/Pledge";
import Career from "./components/Pages/Career";
import About from "./components/Pages/About.jsx";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar/Navbar";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Blog from "./components/Pages/Blog.jsx";
import CareerApplication from "./components/Career/CareerApplication.jsx";
import ExploreMining from "./components/Home/ExploreMining.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import AdminBlog from "./pages/AdminBlog.jsx";

function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />

      <Routes>
        {/* Public website routes */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/services" element={<Services />} /> */}
        <Route path="/technology" element={<Technology />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/pledge" element={<Pledge />} />
        <Route path="/career" element={<Career />} />
        <Route path="/career1" element={<CareerApplication />} />
        <Route path="/about" element={<About />} />
        <Route path="/exploremining" element={<ExploreMining />} />

        {/* Public admin login */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Protected admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminBlog />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/changepassword"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        {/* Optional login URL alias */}
        <Route
          path="/admin/login"
          element={<Navigate to="/admin" replace />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
