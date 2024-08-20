import { Route, Routes } from "react-router-dom";
import LoginPage from "./Page/login";
import HomePage from "./Page/home";
import { useAuth } from "./context";
import NotfoundPage from "./Page/not-found";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {isAuthenticated ? (
        <Route path="/" element={<HomePage />} />
      ) : (
        <Route path="/login" element={<LoginPage />} />
      )}
       <Route path="*" element={<NotfoundPage />} /> 
    </Routes>
  );
}

export default App;
