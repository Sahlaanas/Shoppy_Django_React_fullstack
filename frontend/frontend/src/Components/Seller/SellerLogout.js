
function SellerLogout() {
    console.log("Before removal:", {
      login: localStorage.getItem("vendor_login"),
      username: localStorage.getItem("vendor_username"),
      id: localStorage.getItem("vendor_id")
    });
    
    localStorage.removeItem("vendor_login");
    localStorage.removeItem("vendor_username");
    localStorage.removeItem("vendor_id");
    
    console.log("After removal:", {
      login: localStorage.getItem("vendor_login"),
      username: localStorage.getItem("vendor_username"),
      id: localStorage.getItem("vendor_id")
    });
    
    // Add a small delay before redirecting to see the console logs
    setTimeout(() => {
      window.location.href = "/seller/login";
    }, 500);
  }

export default SellerLogout;
