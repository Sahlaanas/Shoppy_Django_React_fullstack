//Packages
import { Route, Routes } from "react-router-dom";
import { CartContext, CurrencyContext } from "./Context";
import { useState } from "react";

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
import AllSellers from "./Components/AllSellers";
import ProductDetail from "./Components/ProductDetail";
import Checkout from "./Components/Checkout";
import OrderSuccess from "./Components/OrderSuccess";
import OrderFailure from "./Components/OrderFailure";
import TagProducts from "./Components/TagProducts";
import ConfirmOrder from "./Components/ConfirmOrder";

//Customer Panel
import Register from "./Components/Customer/Register";
import Login from "./Components/Customer/Login";
import Dashboard from "./Components/Customer/Dashboard";
import Orders from "./Components/Customer/Orders";
import Wishlist from "./Components/Customer/Wishlist";
import Profile from "./Components/Customer/Profile";
import ChangePassword from "./Components/Customer/ChangePassword";
import AddressList from "./Components/Customer/AddressList";
import AddAddress from "./Components/Customer/AddAddress";
import UpdateAddress from "./Components/Customer/UpdateAddress";
import AddReview from "./Components/Customer/AddReview";

//Seller Panel
import SellerRegister from "./Components/Seller/SellerRegister";
import SellerDashboard from "./Components/Seller/SellerDashboard";
import SellerLogin from "./Components/Seller/SellerLogin"; 
import SellerProducts from "./Components/Seller/SellerProducts";
import SellerDetail from "./Components/Seller/SellerDetail";
import AddProduct from "./Components/Seller/AddProduct";
import SellerOrders from "./Components/Seller/SellerOrders";
import Customers from "./Components/Seller/Customers";
import Reports from "./Components/Seller/Reports";
import SellerProfile from "./Components/Seller/SellerProfile";
import SellerChangePassword from "./Components/Seller/SellerChangePassword";
import Logout from "./Components/Customer/Logout";
import SellerLogout from "./Components/Seller/SellerLogout";
import UpdateProduct from "./Components/Seller/UpdateProduct";
import CustomerOrders from "./Components/Seller/CustomerOrders";
import DailyReport from "./Components/Seller/DailyReport";
import MonthlyReport from "./Components/Seller/MonthlyReport";
import YearlyReport from "./Components/Seller/YearlyReport";
import BookCard from "./Components/BookCard";

const checkCart=localStorage.getItem('cartData');
const currentCurrency = localStorage.getItem('currency');

function App() {
  const [cartData, setCartData] = useState(() => {
    try {
      return checkCart ? JSON.parse(checkCart) : []; // ✅ Only parse if not null
    } catch (error) {
      console.error("❌ Error parsing cartData from localStorage:", error);
      return []; // ✅ Fallback to an empty array
    }
  });
  const [currencyData, setCurrencyData] = useState(currentCurrency);

  return (
    <CurrencyContext.Provider value={{currencyData,setCurrencyData}}>
    <CartContext.Provider value={{cartData, setCartData}}>
    <div className="App"> 
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:category_slug/:category_id" element={<CategoryProducts />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/sellers" element={<AllSellers />} />
        <Route path="/product/:product_slug/:product_id" element={<ProductDetail />} />
        <Route path="/seller/:seller_username/:seller_id" element={<SellerDetail />} />
        <Route path="/products/:tag" element={<TagProducts />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirm-order" element={<ConfirmOrder />} />
        <Route path="/order/success" element={<OrderSuccess />} />
        <Route path="/order/failure" element={<OrderFailure />} />
        {/* Customer Routes */}
        <Route path="/customer/register" element={<Register />} />
        <Route path="/customer/login" element={<Login />} />
        <Route path="/customer/logout" element={<Logout />} />
        <Route path="/customer/dashboard" element={<Dashboard />} />
        <Route path="/customer/orders" element={<Orders />} />
        <Route path="/customer/wishlist" element={<Wishlist />} />
        <Route path="/customer/profile" element={<Profile />} />
        <Route path="/customer/change-password" element={<ChangePassword />} />
        <Route path="/customer/addresslist" element={<AddressList />} />
        <Route path="/customer/add-address" element={<AddAddress />} />
        <Route path="/customer/update-address/:address_id" element={<UpdateAddress />} />
        <Route path="/customer/add-review/:product_id" element={<AddReview />} />
        {/* Seller Routes */}
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/seller/logout" element={<SellerLogout />} />
        <Route path="/seller/register" element={<SellerRegister />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route path="/seller/products" element={<SellerProducts />} />
        <Route path="/seller/add-product" element={<AddProduct />} />
        <Route path="/seller/update-product/:product_id" element={<UpdateProduct />} />
        <Route path="/seller/orders" element={<SellerOrders />} />
        <Route path="/seller/customers" element={<Customers />} />
        <Route path="/seller/reports" element={<Reports />} />
        <Route path="/seller/profile" element={<SellerProfile />} />
        <Route path="/seller/change-password" element={<SellerChangePassword />} />
        <Route path="/seller/customer/:customer_id/orderitems" element={<CustomerOrders />} />
        <Route path="/seller/daily-report" element={<DailyReport />} />
        <Route path="/seller/monthly-report" element={<MonthlyReport />} />
        <Route path="/seller/yearly-report" element={<YearlyReport />} />
        {/* <Route path="/bookcard" element={<BookCard />} /> */}

       </Routes>
      <Footer />
    </div>
    </CartContext.Provider>
    </CurrencyContext.Provider>
  );
}

export default App;
