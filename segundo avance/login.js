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
    const userId = data.user?.id || data.user?._id || data.user;

    if (!token) {
      alert("El servidor no devolvió token.");
      return;
    }

    localStorage.setItem("authToken", token);
    if (userId) localStorage.setItem("userId", userId);

    window.location.href = "home.html";

  } catch (err) {
    console.error("Error fetch login:", err);
    alert("Error en el servidor o en la red. Revisa la consola para más detalles.");
  }
});
