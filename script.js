// ===== SISTEMA DE ANIMAÇÕES AVANÇADAS =====

class AnimationController {
  constructor() {
    this.observers = new Map()
    this.particles = []
    this.init()
  }

  init() {
    this.setupIntersectionObserver()
    this.setupParticleSystem()
    this.setupTypewriterEffect()
    this.setupAdvancedHovers()
    this.setupLogoFallback()
  }

  // Fallback para logo caso não carregue
  setupLogoFallback() {
    const logoImg = document.querySelector(".nav-logo img")
    const logoText = document.querySelector(".nav-logo h1")

    if (logoImg && logoText) {
      logoImg.addEventListener("error", () => {
        logoImg.style.display = "none"
        logoText.style.display = "block"
      })

      logoImg.addEventListener("load", () => {
        logoImg.style.display = "block"
        logoText.style.display = "none"
      })
    }

    // Mesmo para o rodapé
    const footerLogoImg = document.querySelector(".footer-logo img")
    if (footerLogoImg) {
      footerLogoImg.addEventListener("error", () => {
        footerLogoImg.style.display = "none"
      })
    }
  }

  // Observer para animações baseadas em scroll
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.triggerAnimation(entry.target)
        }
      })
    }, observerOptions)

    // Elementos para animar
    const animatedElements = document.querySelectorAll(`
      .hero-content,
      .section-title,
      .section-description,
      .differential-item,
      .problem-item,
      .section-img,
      .contact-form,
      .video-container
    `)

    animatedElements.forEach((el) => {
      el.classList.add("animate-on-scroll")
      observer.observe(el)
    })

    this.observers.set("main", observer)
  }

  // Trigger para diferentes tipos de animação
  triggerAnimation(element) {
    element.classList.add("animated")

    // Animações específicas baseadas na classe do elemento
    if (element.classList.contains("hero-content")) {
      element.classList.add("fade-in-up")
    } else if (element.classList.contains("section-title")) {
      element.classList.add("zoom-in")
    } else if (element.classList.contains("differential-item")) {
      element.classList.add("bounce-in")
    } else if (element.classList.contains("problem-item")) {
      element.classList.add("fade-in-left")
    } else if (element.classList.contains("section-img")) {
      element.classList.add("rotate-in")
    } else if (element.classList.contains("contact-form")) {
      element.classList.add("fade-in-up")
    } else if (element.classList.contains("video-container")) {
      element.classList.add("zoom-in")
    } else {
      element.classList.add("fade-in-up")
    }

    // Animação sequencial para listas
    if (element.parentElement?.classList.contains("problem-list")) {
      const siblings = Array.from(element.parentElement.children)
      const index = siblings.indexOf(element)
      element.style.animationDelay = `${index * 0.1}s`
    }
  }

  // Sistema de partículas flutuantes
  setupParticleSystem() {
    const heroSection = document.querySelector(".hero")
    if (!heroSection) return

    // Criar container de partículas
    const particlesContainer = document.createElement("div")
    particlesContainer.className = "particles"
    heroSection.appendChild(particlesContainer)

    // Criar partículas
    for (let i = 0; i < 20; i++) {
      this.createParticle(particlesContainer)
    }

    // Recriar partículas periodicamente
    setInterval(() => {
      if (this.particles.length < 20) {
        this.createParticle(particlesContainer)
      }
    }, 2000)
  }

  createParticle(container) {
    const particle = document.createElement("div")
    particle.className = "particle"

    // Propriedades aleatórias
    const size = Math.random() * 6 + 2
    const left = Math.random() * 100
    const duration = Math.random() * 10 + 10
    const delay = Math.random() * 5

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `

    container.appendChild(particle)
    this.particles.push(particle)

    // Remove partícula após animação
    setTimeout(
      () => {
        if (particle.parentNode) {
          particle.remove()
          const index = this.particles.indexOf(particle)
          if (index > -1) {
            this.particles.splice(index, 1)
          }
        }
      },
      (duration + delay) * 1000,
    )
  }

  // Efeito typewriter para o título hero
  setupTypewriterEffect() {
    const heroTitle = document.querySelector(".hero-title")
    if (!heroTitle) return

    const text = heroTitle.textContent
    heroTitle.textContent = ""
    heroTitle.style.borderRight = "3px solid var(--accent-color)"

    let i = 0
    const typeSpeed = 100

    function typeWriter() {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, typeSpeed)
      } else {
        // Remove cursor após completar
        setTimeout(() => {
          heroTitle.style.borderRight = "none"
        }, 1000)
      }
    }

    // Inicia typewriter após um delay
    setTimeout(typeWriter, 1000)
  }

  // Hovers avançados com JavaScript
  setupAdvancedHovers() {
    // Hover simples e eficaz para botões
    const buttons = document.querySelectorAll(".btn")

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        button.style.transform = "translateY(-2px)"
      })

      button.addEventListener("mouseleave", () => {
        button.style.transform = ""
      })
    })

    // Efeito parallax nas imagens (corrigido)
    let ticking = false

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const images = document.querySelectorAll(".section-img, .hero-img")
          const scrolled = window.pageYOffset

          images.forEach((img) => {
            const rect = img.getBoundingClientRect()
            const speed = 0.1

            if (rect.top < window.innerHeight && rect.bottom > 0) {
              const yPos = -(scrolled * speed)
              img.style.transform = `translateY(${yPos}px)`
            }
          })

          ticking = false
        })
        ticking = true
      }
    })
  }
}

// ===== FUNCIONALIDADES PRINCIPAIS APRIMORADAS =====

class StraussApp {
  constructor() {
    this.animationController = new AnimationController()
    this.init()
  }

  init() {
    this.setupNavigation()
    this.setupScrollEffects()
    this.setupLoadingStates()
  }

  setupNavigation() {
    const navToggle = document.querySelector(".nav-toggle")
    const navMenu = document.querySelector(".nav-menu")
    const navLinks = document.querySelectorAll(".nav-link")

    // Toggle menu com animação aprimorada
    navToggle?.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      navToggle.classList.toggle("active")

      // Animação staggered dos links do menu
      if (navMenu.classList.contains("active")) {
        navLinks.forEach((link, index) => {
          link.style.animation = `fadeInRight 0.3s ease forwards ${index * 0.1}s`
        })
      }
    })

    // Smooth scroll aprimorado
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const target = document.querySelector(link.getAttribute("href"))

        if (target) {
          const headerHeight = document.querySelector(".header").offsetHeight
          const targetPosition = target.offsetTop - headerHeight

          // Smooth scroll customizado
          this.smoothScrollTo(targetPosition, 800)

          // Fecha menu mobile
          if (navMenu.classList.contains("active")) {
            navMenu.classList.remove("active")
            navToggle.classList.remove("active")
          }
        }
      })
    })
  }

  // Smooth scroll customizado com easing
  smoothScrollTo(target, duration) {
    const start = window.pageYOffset
    const distance = target - start
    let startTime = null

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const run = this.easeInOutQuad(timeElapsed, start, distance, duration)
      window.scrollTo(0, run)
      if (timeElapsed < duration) requestAnimationFrame(animation.bind(this))
    }

    requestAnimationFrame(animation.bind(this))
  }

  // Função de easing
  easeInOutQuad(t, b, c, d) {
    t /= d / 2
    if (t < 1) return (c / 2) * t * t + b
    t--
    return (-c / 2) * (t * (t - 2) - 1) + b
  }

  setupScrollEffects() {
    let lastScrollTop = 0
    const header = document.querySelector(".header")

    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop

      // Header hide/show
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.style.transform = "translateY(-100%)"
      } else {
        header.style.transform = "translateY(0)"
      }

      lastScrollTop = scrollTop
    })

    // Scroll progress indicator
    const progressBar = document.createElement("div")
    progressBar.className = "scroll-progress"
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, var(--accent-color), #d49a02);
      z-index: 9999;
      transition: width 0.1s ease;
    `
    document.body.appendChild(progressBar)

    window.addEventListener("scroll", () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      progressBar.style.width = `${scrollPercent}%`
    })
  }

  setupLoadingStates() {
    // Loading screen
    const loadingScreen = document.createElement("div")
    loadingScreen.className = "loading-screen"
    loadingScreen.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--primary-color);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      transition: opacity 0.5s ease;
    `

    loadingScreen.innerHTML = `
      <div style="text-align: center; color: white;">
        <div class="loading-spinner" style="width: 50px; height: 50px; margin: 0 auto 20px;"></div>
        <h2>Carregando Strauss...</h2>
        <p style="color: var(--accent-color); margin-top: 10px;">LIFTING PLATFORMS</p>
      </div>
    `

    document.body.appendChild(loadingScreen)

    // Remove loading após carregamento
    window.addEventListener("load", () => {
      setTimeout(() => {
        loadingScreen.style.opacity = "0"
        setTimeout(() => {
          loadingScreen.remove()
        }, 500)
      }, 1000)
    })
  }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", () => {
  new StraussApp()
  console.log("🚀 Strauss Lifting Platforms - Landing Page carregada!")
})

// ===== UTILITÁRIOS ADICIONAIS =====

// Debounce para otimização de performance
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle para eventos de scroll
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Aplicar throttle nos eventos de scroll
window.addEventListener(
  "scroll",
  throttle(() => {
    // Eventos de scroll otimizados
  }, 16),
)
