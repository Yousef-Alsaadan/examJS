const userAPI = "https://66e7e6a8b17821a9d9da6f51.mockapi.io/usersAccount";
const weatherAPI =
  "https://api.openweathermap.org/data/2.5/weather?q=London&appid=7e8e80afe2284b3903c2f5abebd4bb51";
const adhanAPI =
  "https://raw.githubusercontent.com/islamic-network/openapi/master/aladhan-api/combined.yaml";

let nameFirst = document.getElementById("name");
let userName = document.getElementById("userName");
let email = document.getElementById("email");
let pass = document.getElementById("pass");

let user = document.getElementById("user");
let passLog = document.getElementById("passLog");

var validRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function signup() {
  event.preventDefault();
  if (
    nameFirst.value == "" ||
    userName.value == "" ||
    email.value == "" ||
    pass.value == ""
  ) {
    signupErr("type something");
  } else {
    if (nameFirst.value.length > 3) {
      if (
        userName.value.length > 3 &&
        Boolean(userName.value.match(/[A-Z]/)) == true
      ) {
        if (email.value.match(validRegex)) {
          if (pass.value.length > 4) {
            fetch(userAPI, {
              method: "POST",
              body: JSON.stringify({
                name: nameFirst.value,
                userName: userName.value,
                email: email.value,
                pass: pass.value,
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            })
              .then((response) => response.json())
              .then((json) => (window.location.href = "./index.html"));
          } else {
            signupErr("password must be a more than 4 caracteres");
          }
        } else {
          signupErr("invalid email address");
        }
      } else {
        signupErr(
          "username must have at least one capital caracteres and more than three letters"
        );
      }
    } else {
      signupErr("your name must have than 3 letters");
    }
  }
}

function login() {
  event.preventDefault();
  fetch(userAPI)
    .then((response) => response.json())
    .then((json) =>
      json.map((data) => {
        if (user.value.match(data.userName)) {
          if (data.pass === passLog.value) {
            localStorage.setItem(
              "user",
              JSON.stringify({
                user: data.name,
              })
            );
            window.location.href = "./home.html";
          } else {
            logErr("wrong user name or passwords");
          }
        } else {
          logErr("wrong user name or passwords");
        }
      })
    );
}

function signupErr(msg) {
  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
  const wrapper = document.createElement("p");
  wrapper.textContent = msg;
  wrapper.style.color = "red";

  alertPlaceholder.append(wrapper);

  setTimeout(() => {
    wrapper.remove();
  }, 3000);
}

function logErr(msg) {
  const alertPlaceholder = document.getElementById("liveAlertPlaceholder2");
  const wrapper = document.createElement("p");
  wrapper.textContent = msg;
  wrapper.style.color = "red";

  alertPlaceholder.append(wrapper);

  setTimeout(() => {
    wrapper.remove();
  }, 3000);
}

function prayer() {
  fetch(adhanAPI)
    .then((response) => response.json())
    .then((json) => json.map((data) => {}));
}

function weather() {
  fetch(weatherAPI)
    .then((response) => response.json())
    .then((json) => json.map((data) => {}));
}


function logout(){
    localStorage.clear();
    window.location.href = './index.html';
}