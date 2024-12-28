import { useSelector } from "react-redux";
import "./App.css";
import Homepage from "./pages/Homepage/Homepage";
import { Route, Routes } from "react-router-dom";
import NotFountPage from "./pages/NotFoundPage/NotFountPage";
import CategoryCoins from "./Category-coins/CategoryCoins";
import SearchListPage from "./pages/ListPage/SearchListPage";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import AdminPanel from "./AdminPanel/AdminPanel";
import EditOrAddCoin from "./AdminPanel/EditOrAddCoin/EditOrAddCoin";
import SignIn from "./pages/SignIn/SignIn"; 
import Login from "./pages/Login/Login";  

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/AdminPanel" element={<AdminPanel />} />
        <Route path="/AdminPanel/edit/:name" element={<EditOrAddCoin />} />

        <Route path="/" element={<Homepage />} />

        <Route path="/sign-in" element={<SignIn />} /> 
        <Route path="/login" element={<Login />} /> 

        <Route path="/categories" element={<CategoryCoins />} />
        <Route path="/categories/:id" element={<SearchListPage />} />
        <Route path="/categories/:id/:name" element={<DetailsPage />} />

        <Route path="/*" element={<NotFountPage />} />
      </Routes>
    </div>
  );
}

export default App;
