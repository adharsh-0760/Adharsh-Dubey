// ==========================================
// INTERACTIVE RESUME - DYNAMIC SCRIPTS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // Check if resumeData exists
  if (!window.resumeData) {
    console.error("Resume data not found! Please check js/resume-data.js");
    return;
  }
  
  const data = window.resumeData;

  // Cache DOM elements
  const elName = document.getElementById("name");
  const elTagline = document.getElementById("tagline");
  const elSpecialization = document.getElementById("specialization");
  const elEmail = document.getElementById("email");
  const elEmailText = document.getElementById("email-text");
  const elLocation = document.getElementById("location");
  const elLinkedin = document.getElementById("linkedin");
  const elGithub = document.getElementById("github");
  const elProfileAvatar = document.getElementById("profile-avatar");
  
  const elObjective = document.getElementById("objective");
  const educationContainer = document.getElementById("education-container");
  const experienceContainer = document.getElementById("experience-container");
  const certificationContainer = document.getElementById("certification-container");
  const skillsContainer = document.getElementById("skills-container");
  const projectsContainer = document.getElementById("projects-container");
  const elExtracurricular = document.getElementById("extracurricular");

  // ==========================================
  // 1. DATA RENDERING ENGINE
  // ==========================================
  
  function renderResume() {
    // A. Profile Header Details
    elName.textContent = data.profile.name;
    elTagline.textContent = data.profile.title;
    elSpecialization.textContent = data.profile.specialization;
    
    // Contact list
    elEmail.href = `mailto:${data.profile.email}`;
    elEmailText.textContent = data.profile.email;
    
    if (data.profile.location) {
      elLocation.textContent = data.profile.location;
    } else {
      elLocation.parentElement.style.display = "none";
    }
    
    if (data.profile.linkedin) {
      elLinkedin.href = data.profile.linkedin;
    } else {
      elLinkedin.style.display = "none";
    }
    
    if (data.profile.github) {
      elGithub.href = data.profile.github;
    } else {
      elGithub.style.display = "none";
    }
    
    if (data.profile.avatar && elProfileAvatar) {
      elProfileAvatar.src = data.profile.avatar;
    }
    
    // Career Objective
    elObjective.textContent = data.profile.objective;
    
    // Current Year in footer
    const currentYearEl = document.getElementById("current-year");
    if (currentYearEl) {
      currentYearEl.textContent = new Date().getFullYear();
    }

    // B. Render Education
    educationContainer.innerHTML = "";
    data.education.forEach((edu, idx) => {
      const block = document.createElement("div");
      block.className = "content-block";
      block.setAttribute("data-edu-index", idx);
      block.innerHTML = `
        <div class="block-header">
          <div>
            <span class="block-title">${edu.degree}</span>
            <div class="block-subtitle">${edu.school}</div>
          </div>
          <span class="block-period">${edu.period}</span>
        </div>
        <p class="block-desc">${edu.details}</p>
      `;
      educationContainer.appendChild(block);
    });

    // C. Render Experience
    experienceContainer.innerHTML = "";
    data.experience.forEach((job, idx) => {
      const block = document.createElement("div");
      block.className = "content-block";
      block.setAttribute("data-exp-index", idx);
      block.innerHTML = `
        <div class="block-header">
          <div>
            <span class="block-title">${job.role}</span>
            <div class="block-subtitle">${job.company} &bull; ${job.location}</div>
          </div>
          <span class="block-period">${job.period}</span>
        </div>
        <p class="block-desc">${job.description}</p>
      `;
      experienceContainer.appendChild(block);
    });

    // Render Projects
    if (projectsContainer && data.projects) {
      projectsContainer.innerHTML = "";
      data.projects.forEach(proj => {
        const block = document.createElement("div");
        block.className = "content-block project-block";
        block.setAttribute("data-proj-id", proj.id);
        block.innerHTML = `
          <div class="block-header">
            <div>
              <span class="block-title">${proj.title}</span>
              <div class="block-subtitle">${proj.technologies}</div>
            </div>
            <span class="block-period">${proj.period}</span>
          </div>
          <p class="block-desc">${proj.description}</p>
        `;
        projectsContainer.appendChild(block);
      });
    }

    // D. Render Trainings / Certifications
    certificationContainer.innerHTML = "";
    if (data.certifications && Array.isArray(data.certifications)) {
      data.certifications.forEach(cert => {
        const block = document.createElement("div");
        block.className = "cert-block";
        block.setAttribute("data-cert", cert.id);
        
        let verifyBtnHtml = "";
        if (cert.verifyUrl && cert.verifyUrl !== "#") {
          verifyBtnHtml = `
            <a href="${cert.verifyUrl}" target="_blank" class="cert-btn">
              Verify Credential <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          `;
        }
        
        block.innerHTML = `
          <div class="cert-info">
            <h3>${cert.title}</h3>
            <p>${cert.issuer} &bull; ${cert.period}</p>
          </div>
          ${verifyBtnHtml}
        `;
        certificationContainer.appendChild(block);
      });
    }

    // E. Render Skills Chips (Grouped)
    skillsContainer.innerHTML = "";
    const categories = {
      programming: "Programming Languages",
      ml: "Machine Learning",
      tools: "Developer Tools",
      methodologies: "Emerging Paradigms"
    };

    Object.entries(categories).forEach(([key, title]) => {
      const skillList = data.skills[key];
      if (skillList && skillList.length > 0) {
        const groupDiv = document.createElement("div");
        groupDiv.className = "skills-group";
        
        const groupTitle = document.createElement("h4");
        groupTitle.className = "skills-group-title";
        groupTitle.textContent = title;
        groupDiv.appendChild(groupTitle);
        
        const chipsContainer = document.createElement("div");
        chipsContainer.className = "skills-chips-list";
        
        skillList.forEach(skill => {
          const chip = document.createElement("span");
          chip.className = `skill-chip chip-${key}`;
          chip.textContent = skill;
          chip.setAttribute("data-skill", skill.toLowerCase().replace(/\s+/g, "-").replace(/\+/g, "p"));
          chipsContainer.appendChild(chip);
        });
        
        groupDiv.appendChild(chipsContainer);
        skillsContainer.appendChild(groupDiv);
      }
    });

    // F. Render Extracurricular
    elExtracurricular.textContent = data.extracurricular;
  }

  // Trigger Rendering
  renderResume();

  // ==========================================
  // 2. DYNAMIC NEURAL NETWORK CANVAS BACKGROUND
  // ==========================================
  const canvas = document.getElementById("neural-canvas");
  const ctx = canvas.getContext("2d");
  
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  
  const particles = [];
  const particleCount = 65; // Balanced for aesthetics and CPU efficiency
  const connectionDistance = 110;
  
  let mouse = { x: null, y: null, radius: 150 };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseout", () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener("click", (e) => {
    // Generate a temporary explosion force pushing particles away from click location
    const clickX = e.clientX;
    const clickY = e.clientY;
    const forceRadius = 250;
    
    particles.forEach(p => {
      const dx = p.x - clickX;
      const dy = p.y - clickY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < forceRadius) {
        const force = (forceRadius - dist) / forceRadius;
        // Apply acceleration vector away from click coordinates
        p.vx += (dx / dist) * force * 5;
        p.vy += (dy / dist) * force * 5;
      }
    });
  });

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Particle constructor
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.size = Math.random() * 2.5 + 1.5;
      
      // Neon colors matching the premium theme
      const colors = [
        { r: 99,  g: 102, b: 241 }, // Indigo
        { r: 168, g: 85,  b: 247 }, // Purple
        { r: 236, g: 72,  b: 153 }, // Pink
        { r: 6,   g: 182, b: 212 }, // Cyan
        { r: 139, g: 92,  b: 246 }  // Violet
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off walls
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Friction for click explosion force: slow down excess speed back to base limits
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      const baseLimit = 0.5;
      if (speed > baseLimit) {
        this.vx *= 0.92;
        this.vy *= 0.92;
      }

      // Mouse interactive push/pull
      if (mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x += (dx / dist) * force * 1.5;
          this.y += (dy / dist) * force * 1.5;
        }
      }
    }

    draw() {
      const isLightTheme = document.body.classList.contains("light-theme");
      const opacity = isLightTheme ? 0.45 : 0.75;
      ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Populate particles array
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Connection line engine with colorful linear gradients
  function drawConnections() {
    const isLightTheme = document.body.classList.contains("light-theme");

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          const opacity = (1 - dist / connectionDistance) * 0.26;
          
          // Generate linear gradient between particle i and j
          const grad = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
          const lineOpacityMult = isLightTheme ? 0.75 : 1.0;
          grad.addColorStop(0, `rgba(${particles[i].color.r}, ${particles[i].color.g}, ${particles[i].color.b}, ${opacity * lineOpacityMult})`);
          grad.addColorStop(1, `rgba(${particles[j].color.r}, ${particles[j].color.g}, ${particles[j].color.b}, ${opacity * lineOpacityMult})`);
          
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.0;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }

      // Connect to mouse cursor with vibrant color lines
      if (mouse.x !== null && mouse.y !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const opacity = (1 - dist / mouse.radius) * 0.32;
          ctx.strokeStyle = `rgba(${particles[i].color.r}, ${particles[i].color.g}, ${particles[i].color.b}, ${opacity})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }
  }

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    drawConnections();
    requestAnimationFrame(animate);
  }

  // Start animation loop
  animate();

  // ==========================================
  // 3. INTERACTIVE SKILL MAP HIGHLIGHTER
  // ==========================================
  const skillChips = document.querySelectorAll(".skill-chip");

  const skillMappings = {
    "python": [
      { selector: '[data-exp-index="0"]' }, // CodSoft ML Internship
      { selector: '[data-proj-id="credit-card-fraud"]' },
      { selector: '[data-proj-id="customer-churn"]' },
      { selector: '[data-proj-id="spam-sms"]' },
      { selector: '[data-cert="ibm-ml"]' },  // IBM Certification
      { selector: '[data-cert="codsoft-ml"]' } // CodSoft Internship Certification
    ],
    "machine-learning": [
      { selector: '[data-exp-index="0"]' }, // CodSoft ML Internship
      { selector: '[data-proj-id="credit-card-fraud"]' },
      { selector: '[data-proj-id="customer-churn"]' },
      { selector: '[data-proj-id="spam-sms"]' },
      { selector: '[data-cert="ibm-ml"]' },  // IBM Certification
      { selector: '[data-cert="codsoft-ml"]' }, // CodSoft Internship Certification
      { selector: '.right-card' }             // Career Objective
    ],
    "scikit-learn": [
      { selector: '[data-exp-index="0"]' },
      { selector: '[data-proj-id="credit-card-fraud"]' },
      { selector: '[data-cert="ibm-ml"]' }
    ],
    "pandas": [
      { selector: '[data-exp-index="0"]' },
      { selector: '[data-proj-id="credit-card-fraud"]' },
      { selector: '[data-proj-id="customer-churn"]' }
    ],
    "numpy": [
      { selector: '[data-exp-index="0"]' },
      { selector: '[data-proj-id="credit-card-fraud"]' }
    ],
    "deep-learning": [
      { selector: '[data-cert="ibm-ml"]' }
    ],
    "git": [
      { selector: '[data-exp-index="0"]' },
      { selector: '[data-proj-id="credit-card-fraud"]' },
      { selector: '[data-proj-id="customer-churn"]' },
      { selector: '[data-proj-id="spam-sms"]' }
    ],
    "github": [
      { selector: '[data-exp-index="0"]' },
      { selector: '[data-proj-id="credit-card-fraud"]' },
      { selector: '[data-proj-id="customer-churn"]' },
      { selector: '[data-proj-id="spam-sms"]' }
    ],
    "prompt-engineering": [
      { selector: '.right-card' } // Career Objective
    ],
    "vibe-coding": [
      { selector: '.right-card' } // Career Objective
    ]
  };

  skillChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const skillKey = chip.getAttribute("data-skill");
      const isActive = chip.classList.contains("active");

      // Clear all active highlights and chip selections
      skillChips.forEach(c => c.classList.remove("active"));
      document.querySelectorAll(".content-block, .cert-block, .right-card").forEach(el => {
        el.classList.remove("highlight-glow");
      });

      // If it wasn't active, activate it and highlight matching blocks
      if (!isActive) {
        chip.classList.add("active");
        
        const targets = skillMappings[skillKey];
        if (targets) {
          targets.forEach(target => {
            const el = document.querySelector(target.selector);
            if (el) {
              el.classList.add("highlight-glow");
              // Smooth scroll to the first highlighted element
              if (target === targets[0]) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }
          });
        }
      }
    });
  });

  // ==========================================
  // 4. DARK/LIGHT THEME SWITCHER
  // ==========================================
  const themeToggle = document.getElementById("theme-toggle");
  
  const savedTheme = localStorage.getItem("resume-theme");
  if (savedTheme === "light") {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
  
  themeToggle.addEventListener("click", () => {
    if (document.body.classList.contains("dark-theme")) {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
      themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
      localStorage.setItem("resume-theme", "light");
    } else {
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
      themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
      localStorage.setItem("resume-theme", "dark");
    }
  });

  // ==========================================
  // 5. PRINT TO PDF FUNCTION
  // ==========================================
  const printPdfBtn = document.getElementById("print-pdf");
  if (printPdfBtn) {
    printPdfBtn.addEventListener("click", () => {
      window.print();
    });
  }

  // ==========================================
  // 6. INTERACTIVE AMBIENT GLOW SPHERES
  // ==========================================
  const sphere1 = document.querySelector(".sphere-1");
  const sphere2 = document.querySelector(".sphere-2");
  
  if (sphere1 && sphere2) {
    window.addEventListener("mousemove", (e) => {
      // Calculate offset based on mouse location
      const x = (e.clientX - window.innerWidth / 2) * 0.05;
      const y = (e.clientY - window.innerHeight / 2) * 0.05;
      
      // Smoothly transform positioning using translate
      sphere1.style.transform = `translate(${x}px, ${y}px)`;
      sphere2.style.transform = `translate(${-x}px, ${-y}px)`;
    });
  }
});
