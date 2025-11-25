import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { firebaseApp } from "./firebase-init.js";

const auth = getAuth(firebaseApp);
const authStatus = document.getElementById("auth-status");
const goAuthBtn = document.getElementById("go-auth-btn");
const logoutBtn = document.getElementById("logout-btn");

function redirectToAuth() {
  window.location.href = "auth.html";
}

function updateStatus(text, color = "") {
  if (!authStatus) return;
  authStatus.textContent = text;
  authStatus.style.color = color;
}

goAuthBtn?.addEventListener("click", redirectToAuth);

logoutBtn?.addEventListener("click", async () => {
  try {
    await signOut(auth);
  } catch (error) {
    updateStatus(`Erro ao sair: ${error.message}`, "red");
  }
});

onAuthStateChanged(auth, (user) => {
  if (!user) {
    updateStatus("Não autenticado", "#d9534f");
    logoutBtn.style.display = "none";
    goAuthBtn.style.display = "block";
    setTimeout(redirectToAuth, 200);
    return;
  }

  updateStatus(`Autenticado como: ${user.displayName || user.email}`);
  goAuthBtn.style.display = "none";
  logoutBtn.style.display = "block";
});
