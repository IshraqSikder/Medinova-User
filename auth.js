const getValue = (id) => {
  const value = document.getElementById(id).value;
  return value;
};

const handleRegistration = (event) => {
  event.preventDefault();
  const username = getValue("username");
  const first_name = getValue("first_name");
  const last_name = getValue("last_name");
  const email = getValue("email");
  const password = getValue("password");
  const confirm_password = getValue("confirm_password");
  const imageInput = document.getElementById("image");
  const image = imageInput.files[0];
  const profession = getValue("profession");

  if (password === confirm_password) {
    const form_data = new FormData();
    form_data.append("username", username);
    form_data.append("first_name", first_name);
    form_data.append("last_name", last_name);
    form_data.append("email", email);
    form_data.append("password", password);
    form_data.append("confirm_password", confirm_password);
    form_data.append("image", image);
    form_data.append("profession", profession);
  
    document.getElementById("error").innerText = "";
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {

      fetch("https://medinova-0zgf.onrender.com/patient/register/", {
        method: "POST",
        body: form_data,
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.error && data.error === 'Email Already exists') {
        document.getElementById("error").innerText = 'email already exists';
        alert("Email already exists");    
        } 
        if (data && data === 'Check your email for confirmation') {
          document.getElementById("error").innerText = "Check your email for confirmation";
          alert("Check your email for confirmation");
          window.location.href = "login.html";
        } else {
          console.log(data);
        }
      })
    } else {
      document.getElementById("error").innerText =
        "Password must contain 8 characters, at least a uppercase letter, a lowercase letter and a number";
      alert("Password must contain 8 characters, at least a uppercase letter, a lowercase letter and a number");
    }
  } else {
    document.getElementById("error").innerText =
      "Password and Confirm password isn't matched";
    alert("Password and Confirm password isn't matched");
  }
};

const handleLogin = (event) => {
  event.preventDefault();
  const username = getValue("l-username");
  const password = getValue("l-password");
  console.log(username, password);
  if ((username, password)) {
    fetch("https://medinova-0zgf.onrender.com/patient/login/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.token && data.user_id) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user_id);
        window.location.href = "index.html";
      }
      if (data.error && data.error === 'Invalid Credential') {
        document.getElementById("error").innerText = 'Invalid username or password';
      } else {
        console.log(data);
      }
    });
  }
};

var user_id = localStorage.getItem("user_id");
if (user_id) {
  document.getElementById("registerBtn").style.display = "none";
  document.getElementById("loginBtn").style.display = "none";
} else {
  document.getElementById("logoutBtn").style.display = "none";
  document.getElementById("profileBtn").style.display = "none";
}

const handlelogOut = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    fetch("https://medinova-0zgf.onrender.com/patient/logout/", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("patient_id");
      window.location.href = "index.html";
    });
};