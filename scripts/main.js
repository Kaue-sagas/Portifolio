// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Project Modal
const modal = document.getElementById("projectModal")
const modalOverlay = modal.querySelector(".modal__overlay")
const modalClose = modal.querySelector(".modal__close")
const projectCards = document.querySelectorAll(".project-card")
const projectContent = document.getElementById("projectContent")

// Project data (você pode adicionar o conteúdo dos seus projetos aqui)
const projectData = {
  pixar: {
    title: "Os Incríveis - Pixar",
    content: `
      <h2>Os Incríveis - Site de Estudo</h2>
      <p>Este foi meu segundo site, onde aprendi muito sobre desenvolvimento web.</p>
      <p>Criei um sistema de login inovador usando arquivo TXT, pois ainda não tinha conhecimento de back-end.</p>
      <p><strong>Adicione aqui o iframe ou imagens do seu projeto!</strong></p>
      <div style="background: #f1f5f9; padding: 2rem; border-radius: 0.5rem; margin-top: 1rem;">
        <p style="text-align: center; color: #64748b;">
          Espaço reservado para o conteúdo do projeto Pixar<br>
          Você pode adicionar iframes, imagens ou vídeos aqui
        </p>
      </div>
    `,
  },
  scrollup: {
    title: "ScrollUP - Leitura de Mangás",
    content: `
      <h2>ScrollUP - Plataforma de Leitura</h2>
      <p>Site desenvolvido para estudo de leitura de mangás e webtoons.</p>
      <p>Foco principal em aprender Flexbox, organização de código e criar interfaces agradáveis.</p>
      <p><strong>Adicione aqui o iframe ou imagens do seu projeto!</strong></p>
      <div style="background: #f1f5f9; padding: 2rem; border-radius: 0.5rem; margin-top: 1rem;">
        <p style="text-align: center; color: #64748b;">
          Espaço reservado para o conteúdo do projeto ScrollUP<br>
          Você pode adicionar iframes, imagens ou vídeos aqui
        </p>
      </div>
    `,
  },
  weddingeasy: {
    title: "WeddingEasy - Sistema de Casamentos",
    content: `
      <h2>WeddingEasy - Finalista DSPI 2025</h2>
      <p>Sistema completo de gerenciamento de casamentos com design moderno e interativo.</p>
      <p>Responsável pelo design no Figma, desenvolvimento HTML/CSS e implementação PHP.</p>
      <p>Projeto finalista no DSPI 2025 - Desafio SENAI de Projetos Integradores.</p>
      <p><strong>Adicione aqui o iframe ou imagens do seu projeto!</strong></p>
      <div style="background: #f1f5f9; padding: 2rem; border-radius: 0.5rem; margin-top: 1rem;">
        <p style="text-align: center; color: #64748b;">
          Espaço reservado para o conteúdo do projeto WeddingEasy<br>
          Você pode adicionar iframes, imagens ou vídeos aqui
        </p>
      </div>
    `,
  },
}

// Open modal when clicking on project card
projectCards.forEach((card) => {
  card.addEventListener("click", function () {
    const projectId = this.getAttribute("data-project")
    const project = projectData[projectId]

    if (project) {
      projectContent.innerHTML = project.content
      modal.classList.add("active")
      document.body.style.overflow = "hidden"
    }
  })
})

// Close modal
function closeModal() {
  modal.classList.remove("active")
  document.body.style.overflow = ""
}

modalClose.addEventListener("click", closeModal)
modalOverlay.addEventListener("click", closeModal)

// Close modal with ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal()
  }
})

// Tooltip functionality
const tooltip = document.getElementById("tooltip")
const resumeItems = document.querySelectorAll(".resume__item[data-tooltip]")

resumeItems.forEach((item) => {
  item.addEventListener("mouseenter", function (e) {
    const tooltipText = this.getAttribute("data-tooltip")
    tooltip.textContent = tooltipText
    tooltip.classList.add("active")
    updateTooltipPosition(e)
  })

  item.addEventListener("mousemove", updateTooltipPosition)

  item.addEventListener("mouseleave", () => {
    tooltip.classList.remove("active")
  })
})

function updateTooltipPosition(e) {
  const tooltipWidth = tooltip.offsetWidth
  const tooltipHeight = tooltip.offsetHeight

  let left = e.pageX - tooltipWidth / 2
  let top = e.pageY - tooltipHeight - 15

  // Prevent tooltip from going off screen
  if (left < 10) left = 10
  if (left + tooltipWidth > window.innerWidth - 10) {
    left = window.innerWidth - tooltipWidth - 10
  }
  if (top < 10) {
    top = e.pageY + 15
  }

  tooltip.style.left = left + "px"
  tooltip.style.top = top + "px"
}

// Header scroll effect
let lastScroll = 0
const header = document.querySelector(".header")

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    header.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
  } else {
    header.style.boxShadow = "none"
  }

  lastScroll = currentScroll
})

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe project cards and resume sections
document.querySelectorAll(".project-card, .resume__section").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(20px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

console.log("[v0] Portfolio loaded successfully!")
