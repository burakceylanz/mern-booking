import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import { useAuth } from "./context";
import NotfoundPage from "./pages/not-found";
import SignUpPage from "./pages/signup";
import AddHotelPage from "./pages/add-hotel";
import Layout from "./components/layout"; 
import MyHotels from "./pages/my-hotels";
import MyHotelDetails from "./pages/my-hotel-details";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {isAuthenticated ? (
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} /> 
          <Route path="add-hotel" element={<AddHotelPage />} />
          <Route path="my-hotels" element={<MyHotels />} />
          <Route path="my-hotels/:hotelId" element={<MyHotelDetails />} />
        </Route>
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
