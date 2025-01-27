// İstifadəçi autentifikasiyasını yoxlayan funksiya
function checkUserAuthentication() {
    const isAuthenticated = localStorage.getItem("Admin_token");
  
    if (!isAuthenticated) {
      window.location.href = "./login.html";
    }
  }
  
  // Hər səhifədə yoxlamaq üçün
  document.addEventListener("DOMContentLoaded", () => {
    checkUserAuthentication();
  });
  