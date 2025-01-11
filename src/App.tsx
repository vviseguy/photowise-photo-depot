import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import Login from "./routes/Login";
// import Dashboard from "./routes/Dashboard";
// import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
// import Dashboard from "./routes/Dashboard";
import LoginComplaint from "./routes/LoginComplaint";
import "./App.css"
import Footer from "./components/Footer";
import { PaneDisplay } from "./components/projects/PaneDisplay";
import { ProjectList } from "./pages/ProjectList";
import { SearchProvider } from "./context/SearchContext";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./routes/ProtectedRoute";
const App: React.FC = () => {
  const { initLogin, logout, user } = useAuth();

  return (
    <>
      <div className="setting">
        {/* <Toaster/> */}
        <BrowserRouter>
          <SearchProvider>
            {/* Always show Header */}
            <Header onLogin={initLogin} onLogout={logout} showSearch={true} email={user?.email} />
            <div className="app-container">
              <Routes>
                {/* Public route */}
                <Route path="/login" element={<LoginComplaint />} />

                {/* Protected route */}
                <Route path="/dashboard" element={<ProtectedRoute children={<ProjectList />} />} />

                {/* Catch-all / Default route / Login redirect*/}

                <Route path="/redirect" element={<div>Redirecing...</div>} />
                <Route path="/photowise-photo-depot/redirect" element={<div>Redirecing...</div>} />
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
            <Footer />
          </SearchProvider>
        </BrowserRouter>

        <PaneDisplay />
      </div>
    </>
  );
};


const AuthenticatedRoutes = () => (
  <Routes>
    <Route element={<div>hi</div>}>
      <Route index element={<Navigate to="/feed" />} />
      <Route
        path="feed"
        element={
          <div>hi</div>
        }
      />
      <Route
        path="story"
        element={
          <div>hi</div>
        }
      />
      <Route
        path="following"
        element={
          <div>hi</div>
        }
      />
      <Route
        path="followers"
        element={
          <div>hi</div>
        }
      />
      <Route path="logout" element={<Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/feed" />} />
    </Route>
  </Routes>
);

const UnauthenticatedRoutes = () => {

  return (
    <Routes>
      <Route path="/login" element={<div>hi</div>} />
      <Route path="/register" element={<div>hi</div>} />
      <Route path="*" element={<div>hi</div>} />
    </Routes>
  );
};


export default App;
