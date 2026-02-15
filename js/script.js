// 🔥 ANKIT KUMAR PORTFOLIO - OPTIMIZED JS
document.addEventListener("DOMContentLoaded", () => {
  console.log("🎨 Ankit Kumar Portfolio - LIVE! 🚀");

  // ----------------------------
  // 1. MOBILE HAMBURGER MENU
  // ----------------------------
  const hamburger = document.getElementById("navHamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  const toggleMobileMenu = () => {
    hamburger?.classList.toggle("active");
    mobileMenu?.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  };

  hamburger?.addEventListener("click", toggleMobileMenu);

  // Close menu on outside click
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar") && mobileMenu?.classList.contains("active")) {
      toggleMobileMenu();
    }
  });

  // Close menu on link click
  document.querySelectorAll(".mobileMenuLinks a").forEach((link) =>
    link.addEventListener("click", toggleMobileMenu)
  );

  // ----------------------------
  // 2. SCROLL PROGRESS BAR
  // ----------------------------
  const progressBar = document.getElementById("scrollProgressBar");
  window.addEventListener("scroll", () => {
    if (progressBar) {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      progressBar.style.width = `${(scrollTop / docHeight) * 100}%`;
    }
  });

  // ----------------------------
  // 3. TYPEWRITER EFFECT
  // ----------------------------
  const typingText = document.getElementById("typingText");
  if (typingText) {
    const phrases = ["Frontend Developer","B.Tech CSE Student","React Developer","UI/UX Developer","JavaScript Developer"];
    let phraseIndex = 0, i = 0, deleting = false;

    const typeWriter = () => {
      const current = phrases[phraseIndex];
      typingText.textContent = current.slice(0, i);
      if (!deleting) {
        if (i < current.length) i++;
        else { deleting = true; setTimeout(typeWriter, 2000); return; }
      } else {
        if (i > 0) i--;
        else { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; }
      }
      setTimeout(typeWriter, deleting ? 60 : 120);
    };
    typeWriter();
  }

  // ----------------------------
  // 4. SMOOTH SCROLL
  // ----------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor =>
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
      if (mobileMenu?.classList.contains("active")) toggleMobileMenu();
    })
  );

  // ----------------------------
  // 5. PROGRESS BARS ANIMATION
  // ----------------------------
  const progressObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll(".progressBar").forEach(bar => {
        const width = bar.dataset.width || bar.style.width;
        bar.style.width = "0%";
        requestAnimationFrame(() => {
          bar.style.transition = "width 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
          bar.style.width = width;
        });
      });
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.7, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll(".progressContainer").forEach(container => progressObserver.observe(container));

  // ----------------------------
  // 6 & 7. PROJECT CARD + SKILL PILLS HOVER/STAGGER
  // ----------------------------
  const animateElements = (selector, enterCb) => {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          enterCb(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    document.querySelectorAll(selector).forEach(el => observer.observe(el));
  };

  // Project card hover
  document.querySelectorAll(".projectCard").forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px) scale(1.02)";
      card.style.transition = "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    });
    card.addEventListener("mouseleave", () => card.style.transform = "translateY(0) scale(1)");
    card.querySelectorAll(".linkButton").forEach(link => {
      link.addEventListener("mouseenter", () => link.style.transform = "scale(1.15)");
      link.addEventListener("mouseleave", () => link.style.transform = "scale(1)");
    });
  });

  // Skill pills animation
  animateElements(".skillCategory", category => {
    category.querySelectorAll(".skillPill").forEach((pill, i) => {
      setTimeout(() => {
        pill.style.transform = "translateY(0) scale(1)";
        pill.style.opacity = "1";
        pill.style.transition = "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      }, i * 120);
    });
  });

  // ----------------------------
  // 8. CONTACT FORM
  // ----------------------------
  const contactForm = document.querySelector(".contactForm");
  contactForm?.addEventListener("submit", e => {
    e.preventDefault();
    const submitBtn = document.querySelector(".submitButton");
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    setTimeout(() => {
      contactForm.reset();
      alert("✅ Thanks! Message sent successfully!\nI'll get back to you within 24 hours. 🚀");
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2500);
  });

  // ----------------------------
  // 9. RESUME DOWNLOAD
  // ----------------------------
  document.querySelector(".ctaButton")?.addEventListener("click", async (e) => {
  e.preventDefault();

  const button = e.currentTarget;
  const originalText = button.innerHTML;

  // Show spinner & disable button
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';
  button.disabled = true;

  // Small delay to simulate processing
  await new Promise(res => setTimeout(res, 1000));

  // Create invisible link and trigger download
  const link = document.createElement("a");
  link.href = "AnkitKumar_Resume.pdf"; // Path to your PDF
  link.download = "AnkitKumar_Resume.pdf"; // File name
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Reset button after download
  button.innerHTML = originalText;
  button.disabled = false;

  // Show success message
  alert("✅ Resume download started! Thank you for checking out my portfolio 🚀");
});

  // ----------------------------
  // 10. FOOTER STATUS LIGHT
  // ----------------------------
  const statusLight = document.querySelector(".statusLight");
  if (statusLight) {
    let bright = true;
    setInterval(() => {
      statusLight.style.opacity = bright ? "0.3" : "1";
      bright = !bright;
    }, 1200);
  }

  // ----------------------------
  // 11. HEARTBEAT ICON
  // ----------------------------
  const heartbeatIcon = document.querySelector(".heartbeat");
  heartbeatIcon?.addEventListener("mouseenter", () => heartbeatIcon.style.animationPlayState = "running");
  heartbeatIcon?.addEventListener("mouseleave", () => heartbeatIcon.style.animationPlayState = "paused");

  // ----------------------------
  // 12. SCROLL REVEAL
  // ----------------------------
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll("section").forEach(sec => {
    sec.style.opacity = "0";
    sec.style.transform = "translateY(30px)";
    sec.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    revealObserver.observe(sec);
  });

  console.log("✅ ALL FEATURES LOADED SUCCESSFULLY!");
});
