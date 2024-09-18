window.onload = function () {
  const userData = JSON.parse(localStorage.getItem("user"));
  let nav_name = document.getElementsByClassName("nav_name")[0];

  let n = document.createElement("p");
  n.textContent = userData.user
  nav_name.appendChild(n);
};
