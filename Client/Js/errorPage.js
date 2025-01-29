const routes = {
    "/Client/Pages/home.html": "<h1>Home Page</h1>",
    "/Client/Pages/account.html": "<h1>Account Page</h1>",
    "/Client/Pages/detailed.html": "<h1>Detailed Page</h1>",
    "/Client/Pages/favorites.html": "<h1>Favorites Page</h1>",
    "/Client/Pages/login.html": "<h1>Login Page</h1>",
    "/Client/Pages/register.html": "<h1>Register Page</h1>",
    "/Client/Pages/search.html": "<h1>Search Page</h1>",
    "/Client/Pages/404.html": "<h1>404 Page</h1>",
};
  const appDiv = document.getElementById("app");
  const currentPath = window.location.pathname;
  if (routes[currentPath]) {
    appDiv.innerHTML = routes[currentPath];
  } else {
    appDiv.innerHTML = "<h1>404 - Page Not Found</h1>";
  }