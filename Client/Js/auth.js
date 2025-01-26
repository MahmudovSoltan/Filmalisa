// İstifadəçi autentifikasiyasını yoxlayan funksiya
function checkUserAuthentication() {
    const isAuthenticated = localStorage.getItem("login_token");
  
    if (!isAuthenticated) {
      window.location.href = "./register.html";
    }
  }
  
  // Hər səhifədə yoxlamaq üçün
  document.addEventListener("DOMContentLoaded", () => {
    checkUserAuthentication();
  });
  