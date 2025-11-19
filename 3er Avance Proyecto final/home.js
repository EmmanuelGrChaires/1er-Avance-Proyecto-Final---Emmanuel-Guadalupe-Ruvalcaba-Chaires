const API_BASE = "https://portfolio-api-three-black.vercel.app/api/v1";
let token = localStorage.getItem("authToken");


const userName = localStorage.getItem("userName");
const userItsonId = localStorage.getItem("userItsonId");

const userInfoDiv = document.querySelector("#userInfo");
if (userInfoDiv) {
    userInfoDiv.textContent = `${userName} — ${userItsonId}`;
}


document.querySelector("#logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userItsonId");
    localStorage.removeItem("userEmail");

    window.location.href = "login.html";
});


const contenedor = document.querySelector("#contenedorProyectos");

async function loadProjects() {
    const res = await fetch(`${API_BASE}/projects`, {
        headers: { "auth-token": token }
    });

    const data = await res.json();
    contenedor.innerHTML = "";

    data.forEach(p => {
        const div = document.createElement("div");
        div.classList.add("project");

        div.innerHTML = `
            <div>
                <h3>${p.title}</h3>
                <p>${p.description}</p>
                <p><strong>Tecnologías:</strong> ${p.technologies?.join(", ")}</p>

                <a href="${p.repository}" target="_blank">Repositorio</a>
                <br><br>

                <button onclick="prepareUpdate('${p._id}', '${p.title}', '${p.description}', '${p.technologies}', '${p.repository}')">
                    Actualizar
                </button>

                <button onclick="deleteProject('${p._id}')">
                    Eliminar
                </button>
            </div>
        `;

        contenedor.append(div);
    });
}



document.querySelector("#btnGuardar").addEventListener("click", async () => {
    const project = {
        title: titulo.value,
        description: descripcion.value,
        technologies: tecnologias.value.split(",").map(t => t.trim()),
        repository: repositorio.value
    };

    const res = await fetch(`${API_BASE}/projects`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token
        },
        body: JSON.stringify(project)
    });

    if (res.ok) {
        titulo.value = "";
        descripcion.value = "";
        tecnologias.value = "";
        repositorio.value = "";
        loadProjects();
    } else {
        alert("Error al crear proyecto");
    }
});



let updateId = null;

function prepareUpdate(id, title, description, technologies, repository) {
    updateId = id;

    titulo.value = title;
    descripcion.value = description;
    tecnologias.value = technologies.replace(/,/g, ", ");
    repositorio.value = repository;

    document.querySelector("#btnGuardar").style.display = "none";
    document.querySelector("#btnActualizar").style.display = "block";
}

document.querySelector("#btnActualizar").addEventListener("click", async () => {
    if (!updateId) return alert("No hay proyecto seleccionado");

    const project = {
        title: titulo.value,
        description: descripcion.value,
        technologies: tecnologias.value.split(",").map(t => t.trim()),
        repository: repositorio.value
    };

    const res = await fetch(`${API_BASE}/projects/${updateId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token
        },
        body: JSON.stringify(project)
    });

    if (res.ok) {
        updateId = null;

        titulo.value = "";
        descripcion.value = "";
        tecnologias.value = "";
        repositorio.value = "";

        document.querySelector("#btnGuardar").style.display = "block";
        document.querySelector("#btnActualizar").style.display = "none";

        loadProjects();
    } else {
        alert("Error al actualizar");
    }
});

async function deleteProject(id) {
    await fetch(`${API_BASE}/projects/${id}`, {
        method: "DELETE",
        headers: { "auth-token": token }
    });

    loadProjects();
}

loadProjects();
