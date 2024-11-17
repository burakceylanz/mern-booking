import { Route, Routes } from "react-router-dom";
import LoginPage from "./Page/login";
import HomePage from "./Page/home";
import { useAuth } from "./context";
import NotfoundPage from "./Page/not-found";
import SignUpPage from "./Page/signup";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {isAuthenticated ? (
        <Route path="/" element={<HomePage />} />
      ) : (
        <>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </>
      )}

      <Route path="*" element={<NotfoundPage />} />
    </Routes>
  );
}

export default App;
