const API_BASE = "https://portfolio-api-three-black.vercel.app/api/v1";

const form = document.querySelector("#registerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;
  const itsonId = document.querySelector("#itsonId").value.trim();


  if (!name || name.length < 6) {
    alert("El nombre debe tener al menos 6 caracteres.");
    return;
  }
  if (!email) {
    alert("Ingresa un correo válido.");
    return;
  }
  if (!password || password.length < 6) {
    alert("La contraseña debe tener al menos 6 caracteres.");
    return;
  }
  if (!itsonId || itsonId.length !== 6 || isNaN(itsonId)) {
    alert("El ITSON ID debe tener exactamente 6 números.");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, itsonId }),
    });

    const data = await res.json();
    console.log("Registro - respuesta del servidor:", res.status, data);

    if (!res.ok) {
      
      const msg = data?.message || (typeof data === "string" ? data : "Error al registrarse");
      alert(msg);
      return;
    }

    alert("Cuenta creada correctamente. Ahora inicia sesión.");
    window.location.href = "login.html";

  } catch (err) {
    console.error("Error fetch register:", err);
    alert("Error en el servidor o en la red. Revisa la consola para más detalles.");
  }
});
