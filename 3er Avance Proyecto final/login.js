const API_BASE = "https://portfolio-api-three-black.vercel.app/api/v1";

const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;

  if (!email || !password) {
    alert("Completa email y contraseña.");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("Login - respuesta del servidor:", res.status, data);

    if (!res.ok) {
      alert(data?.message || "Error al iniciar sesión");
      return;
    }

    const token = data.token;
    const user = data.userPublicData; 

    if (!token || !user) {
      alert("El servidor no devolvió token o datos del usuario.");
      return;
    }

    
    localStorage.setItem("authToken", token);
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userItsonId", user.itsonId);
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("userId", user._id);

    window.location.href = "home.html";

  } catch (err) {
    console.error("Error fetch login:", err);
    alert("Error en el servidor o en la red.");
  }
});
