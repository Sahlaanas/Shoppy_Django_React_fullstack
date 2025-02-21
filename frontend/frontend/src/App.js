//Packages
import { Route, Routes } from "react-router-dom";

//Assets
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

//Websites
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Categories from "./Components/Categories";
import CategoryProducts from "./Components/CategoryProducts";
import AllProducts from "./Components/AllProducts";
import ProductDetail from "./Components/ProductDetail";
import Checkout from "./Components/Checkout";
import OrderSuccess from "./Components/OrderSuccess";
import OrderFailure from "./Components/OrderFailure";

//Customer Panel
import Register from "./Components/Customer/Register";
import Login from "./Components/Customer/Login";
import Dashboard from "./Components/Customer/Dashboard";
import Orders from "./Components/Customer/Orders";
import Wishlist from "./Components/Customer/Wishlist";
import Profile from "./Components/Customer/Profile";
import ChangePassword from "./Components/Customer/ChangePassword";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:category_slug/:category_id" element={<CategoryProducts />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/product/:product_slug/:product_id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order/success" element={<OrderSuccess />} />
        <Route path="/order/failure" element={<OrderFailure />} />
        <Route path="/customer/register" element={<Register />} />
        <Route path="/customer/login" element={<Login />} />
        <Route path="/customer/dashboard" element={<Dashboard />} />
        <Route path="/customer/orders" element={<Orders />} />
        <Route path="/customer/wishlist" element={<Wishlist />} />
        <Route path="/customer/profile" element={<Profile />} />
        <Route path="/customer/change-password" element={<ChangePassword />} />
       </Routes>
      <Footer />
    </div>
  );
}

export default App;
