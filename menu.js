const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const dropdowns = document.querySelectorAll(".dropdown");


// ========================================
// CERRAR DESPLEGABLES
// ========================================

function cerrarDesplegables() {
    dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("active");

        const button = dropdown.querySelector(".dropdown-btn");

        button.setAttribute("aria-expanded", "false");
    });
}


// ========================================
// CERRAR MENÚ MÓVIL
// ========================================

function cerrarMenu() {
    navLinks.classList.remove("active");

    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Abrir menú");
    menuBtn.innerHTML = "☰";

    cerrarDesplegables();
}


// ========================================
// ABRIR Y CERRAR MENÚ MÓVIL
// ========================================

menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuBtn.setAttribute("aria-expanded", isOpen);
    menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú"
    );

    menuBtn.innerHTML = isOpen ? "&times;" : "☰";

    if (!isOpen) {
        cerrarDesplegables();
    }
});


// ========================================
// DESPLEGABLES DE MINISTERIOS Y ANEXOS
// ========================================

dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(".dropdown-btn");

    button.addEventListener("click", (event) => {
        event.stopPropagation();

        const isOpen = dropdown.classList.contains("active");

        cerrarDesplegables();

        if (!isOpen) {
            dropdown.classList.add("active");
            button.setAttribute("aria-expanded", "true");
        }
    });
});


// ========================================
// CERRAR AL SELECCIONAR UN ENLACE
// ========================================

navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        cerrarMenu();
    });
});


// ========================================
// CERRAR AL HACER CLIC FUERA
// ========================================

document.addEventListener("click", (event) => {
    dropdowns.forEach((dropdown) => {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove("active");

            dropdown.querySelector(".dropdown-btn")
                .setAttribute("aria-expanded", "false");
        }
    });

    if (
        navLinks.classList.contains("active") &&
        !navLinks.contains(event.target) &&
        !menuBtn.contains(event.target)
    ) {
        cerrarMenu();
    }
});


// ========================================
// CERRAR CON LA TECLA ESC
// ========================================

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        cerrarMenu();
    }
});


// ========================================
// REAJUSTAR AL CAMBIAR EL TAMAÑO
// DE LA VENTANA
// ========================================

window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) {
        cerrarMenu();
    }
});
