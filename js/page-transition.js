// page-transitions.js

const createTransitionOverlay = () => {
  // Verificar se o overlay já existe
  let overlay = document.getElementById("page-transition-overlay");
  if (overlay) return overlay;

  // Criar overlay
  overlay = document.createElement("div");
  overlay.id = "page-transition-overlay";

  // Adicionar spinner de carregamento
  overlay.innerHTML = `
    <div class="transition-loader">
      <div class="transition-spinner"></div>
      <div class="transition-text">Carregando</div>
    </div>
  `;

  // Adicionar estilos
  const style = document.createElement("style");
  style.textContent = `
    #page-transition-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #2a4365, #1a365d, #2a4365);
      z-index: 9999;
      opacity: 0;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
      clip-path: circle(0% at 50% 50%);
      animation: gradientShift 6s ease infinite;
      background-size: 200% 200%;
    }

    #page-transition-overlay.active {
      animation: morphIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      opacity: 1;
      pointer-events: all;
    }

    #page-transition-overlay.exiting {
      animation: morphOut 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    .transition-loader {
      text-align: center;
      color: white;
      opacity: 0;
      transform: translateY(20px);
      animation: fadeInUp 0.5s ease 0.3s forwards;
    }

    .transition-spinner {
      width: 40px;
      height: 40px;
      margin: 0 auto 10px;
      border: 3px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s ease-in-out infinite;
    }

    .transition-text {
      font-family: Arial, sans-serif;
      letter-spacing: 2px;
      font-size: 0.9em;
    }

    @keyframes morphIn {
      from { clip-path: circle(0% at 50% 50%); }
      to { clip-path: circle(150% at 50% 50%); }
    }

    @keyframes morphOut {
      from { clip-path: circle(150% at 50% 50%); }
      to { clip-path: circle(0% at 50% 50%); }
    }

    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @keyframes fadeInUp {
      to { opacity: 1; transform: translateY(0); }
    }

    body.transitioning {
      overflow: hidden;
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(overlay);
  return overlay;
};

const initializePageTransitions = () => {
  const overlay = createTransitionOverlay();

  // Verificar se deve ativar a animação de entrada
  if (sessionStorage.getItem("pageTransition")) {
    overlay.classList.add("active");
    document.body.classList.add("transitioning");
    sessionStorage.removeItem("pageTransition");
  }

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");

    if (
      link &&
      link.href &&
      !link.target &&
      link.href.startsWith(window.location.origin)
    ) {
      e.preventDefault();

      // Marcar transição e navegar
      sessionStorage.setItem("pageTransition", "true");
      document.body.classList.add("transitioning");
      overlay.classList.add("active");

      // Usar evento de animação para navegação
      overlay.addEventListener(
        "animationend",
        () => {
          window.location.href = link.href;
        },
        { once: true },
      );
    }
  });

  // Animação de saída ao carregar nova página
  window.addEventListener("load", () => {
    if (overlay.classList.contains("active")) {
      overlay.classList.add("exiting");

      overlay.addEventListener(
        "animationend",
        () => {
          overlay.classList.remove("active", "exiting");
          document.body.classList.remove("transitioning");
        },
        { once: true },
      );
    }
  });

  // Resetar ao voltar na navegação
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) {
      overlay.classList.remove("active", "exiting");
      document.body.classList.remove("transitioning");
    }
  });
};

document.addEventListener("DOMContentLoaded", initializePageTransitions);
