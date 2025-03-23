import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import { routes } from "./routes";
import LoginScreen from "./pages/loginScreen/LoginScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Page without MainLayout */}
        <Route path="/" element={<LoginScreen />} />
        <Route path="/home" element={<MainLayout />}>
          {routes}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
