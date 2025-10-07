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

const modal = document.getElementById("projectModal")
const modalOverlay = modal.querySelector(".modal__overlay")
const modalClose = modal.querySelector(".modal__close")
const projectCards = document.querySelectorAll(".project-card")
const projectContent = document.getElementById("projectContent")

const projectData = {
  pixar: {
    title: "Os Incríveis - Pixar",
    content: `
      <h2>Os Incríveis - Site de Estudo</h2>
      <p>Este foi meu segundo site, onde aprendi muito sobre desenvolvimento web.</p>
      <p>Criei um sistema de login diferente usando arquivo TXT, pois ainda não tinha conhecimento de back-end.</p>
      <p style="margin-bottom: 1rem;"><strong>Um preview interativo do site:</strong></p>

      <div style="
        border-radius: 0.5rem; 
        overflow: hidden; 
        position: relative; 
        width: 100%; 
        height: 600px; 
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.6), 
                    0 10px 10px -5px rgba(0, 0, 0, 0.4), 
                    0 0 25px rgba(150, 192, 255, 0.4), 
                    0 0 50px rgba(116, 153, 255, 0.15);
      ">
         <img src="../images/theincredibles_light.png" alt="preview dos Incríveis">
      </div>
    `,
  },
  scrollup: {
    title: "ScrollUP - Leitura de Mangás",
    content: `
      <h2>ScrollUP - Plataforma de Leitura</h2>
      <p>Site desenvolvido para estudo de leitura de mangás e webtoons.</p>
      <p>Foco principal em aprender Flexbox, variáveis, organização de código e criar interfaces agradáveis.</p>
      <p style="margin-bottom: 1rem;"><strong>Um preview interativo da Landing Page:</strong></p>
  
      <div style="
        border-radius: 0.5rem; 
        overflow: hidden; 
        position: relative; 
        width: 100%; 
        height: 600px; 
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.6), 
                    0 10px 10px -5px rgba(0, 0, 0, 0.4), 
                    0 0 25px rgba(150, 192, 255, 0.4), 
                    0 0 50px rgba(116, 153, 255, 0.15);
      ">
        <iframe 
          src="site/scrollup/index.html"
          style="
            border:none;
            transform: scale(0.6);
            transform-origin: top left;
            width: 167%;
            height: 167%;
          "
          allowfullscreen
        ></iframe>
      </div>
    `,
  },
  weddingeasy: {
    title: "Planner de Sonhos - Sistema de Casamentos",
    content: `
      <h2>Planner de Sonhos - Finalista DSPI 2025</h2>
      <p>Sistema completo de gerenciamento de casamentos com design moderno e interativo.</p>
      <p>Responsável pelo design no Figma, desenvolvimento HTML/CSS e implementação PHP.</p>
      <p>Projeto finalista no DSPI 2025 - Desafio SENAI de Projetos Integradores.</p>
      <p style="margin-bottom: 1rem;"><strong>Um preview da Landing Page:</strong></p>

      <div style="
        border-radius: 0.5rem; 
        overflow: hidden; 
        position: relative; 
        width: 100%; 
        height: 600px; 
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.6), 
                    0 10px 10px -5px rgba(0, 0, 0, 0.4), 
                    0 0 25px rgba(150, 192, 255, 0.4), 
                    0 0 50px rgba(116, 153, 255, 0.15);
      ">
        <iframe 
          src="site/plannerdesonhos/index.html"
          style="
            border:none;
            transform: scale(0.6);
            transform-origin: top left;
            width: 167%;
            height: 167%;
          "
          allowfullscreen
        ></iframe>
      </div>
    `,
  },
}

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

function closeModal() {
  modal.classList.remove("active")
  document.body.style.overflow = ""
}

modalClose.addEventListener("click", closeModal)
modalOverlay.addEventListener("click", closeModal)

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal()
  }
})

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

document.querySelectorAll(".project-card, .resume__section").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(20px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

console.log("[v0] Portfolio loaded successfully!")
