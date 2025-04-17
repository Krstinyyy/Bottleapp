let users = {}; // Stores users in format {username: {password, points, bottles}}
let currentUser = null;

function signUp() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (users[user]) {
    alert("User already exists.");
    return;
  }
  if (user && pass) {
    users[user] = { password: pass, points: 0, bottles: 0 };
    alert("Account created. You can now log in.");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  }
}

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (users[user] && users[user].password === pass) {
    currentUser = user;
    document.getElementById("authContainer").classList.add("hidden");
    document.getElementById("appContainer").classList.remove("hidden");
    document.getElementById("userDisplay").textContent = user;
    updatePointsDisplay();
  } else {
    alert("Invalid credentials.");
  }
}

function logout() {
  currentUser = null;
  document.getElementById("authContainer").classList.remove("hidden");
  document.getElementById("appContainer").classList.add("hidden");
}

function depositBottle() {
  if (!currentUser) return;
  // Increment bottle count and check if user gets points
  users[currentUser].bottles++;
  
  // If 2 bottles are collected, give 1 point
  if (users[currentUser].bottles >= 2) {
    users[currentUser].points++;
    users[currentUser].bottles -= 2; // Reset bottle count after reward
  }
  
  updatePointsDisplay();
}

function redeemItem(cost, itemName) {
  if (!currentUser) return;
  if (users[currentUser].points >= cost) {
    users[currentUser].points -= cost;
    alert(`You redeemed: ${itemName}`);
  } else {
    alert("Not enough points.");
  }
  updatePointsDisplay();
}

function updatePointsDisplay() {
  document.getElementById("points").textContent = users[currentUser].points;
}
