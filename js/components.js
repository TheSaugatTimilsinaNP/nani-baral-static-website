/* ============================================
   NANI BARAL — Components Loader
   Injects shared navbar & footer into all pages
   ============================================ */
(function () {
  'use strict';

  const navbarHTML = `
<nav class="navbar" id="navbar" aria-label="Main navigation">
  <div class="container">
    <a href="/index.html" class="nav-logo" aria-label="Nani Baral — home">NANI.</a>
    <ul class="nav-links" id="navLinks" role="menubar">
      <li role="none"><a href="/index.html" role="menuitem" data-page="home">Home</a></li>
      <li role="none"><a href="/pages/about.html" role="menuitem" data-page="about">About</a></li>
      <li role="none"><a href="/pages/portfolio.html" role="menuitem" data-page="portfolio">Portfolio</a></li>
      <li role="none"><a href="/pages/socials.html" role="menuitem" data-page="socials">Socials</a></li>
    </ul>
    <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
  `;

  const footerHTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <!-- Brand -->
      <div class="footer-brand">
        <a href="/index.html" class="footer-logo">NANI.</a>
        <p>Graphic Designer &amp; Tech Enthusiast crafting bold visuals and digital experiences from Pokhara, Nepal.</p>
        <div class="footer-socials">
          <a href="https://www.instagram.com/nanibaraldesigns" class="footer-social-link" aria-label="Instagram" target="_blank" rel="noopener">Ig</a>
          <a href="https://www.linkedin.com/in/nanibaral/" class="footer-social-link" aria-label="LinkedIn" target="_blank" rel="noopener">Li</a>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="footer-column">
        <h4>Pages</h4>
        <ul>
          <li><a href="/index.html">Home</a></li>
          <li><a href="/pages/about.html">About</a></li>
          <li><a href="/pages/portfolio.html">Portfolio</a></li>
          <li><a href="/pages/socials.html">Socials</a></li>
        </ul>
      </div>

      <!-- Connect -->
      <div class="footer-column">
        <h4>Connect</h4>
        <ul>
          <li><a href="https://www.instagram.com/nanibaraldesigns" target="_blank" rel="noopener">Instagram</a></li>
          <li><a href="https://www.linkedin.com/in/nanibaral/" target="_blank" rel="noopener">LinkedIn</a></li>
          <li>Pokhara, Gandaki Province, Nepal</li>
        </ul>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="footer-bottom">
      <p>Copyright &copy; <span id="current-year">2026</span> Reserved by Nani Baral.</p>
      <p>Developed with ❤️ by <a href="https://saugattimilsina.com.np" target="_blank" rel="noopener">Saugat Timilsina</a></p>
    </div>
  </div>
</footer>
  `;

  /**
   * Determine path prefix based on page depth.
   */
  function getBasePath() {
    const path = window.location.pathname;
    // Simple check to see if we are in the /pages/ directory
    if (path.indexOf('/pages/') !== -1 || path.indexOf('\\pages\\') !== -1) return '..';
    return '.';
  }

  /**
   * Inject component HTML.
   */
  function loadComponent(placeholderId, html) {
    const el = document.getElementById(placeholderId);
    if (!el) return;

    const base = getBasePath();
    // Rewrite root-relative paths for subdirectory pages
    let processedHtml = html.replace(/href="\//g, `href="${base}/`);
    processedHtml = processedHtml.replace(/src="\//g, `src="${base}/`);

    el.innerHTML = processedHtml;

    // If we just loaded the footer, ensure the year is current
    if (placeholderId === 'footer-placeholder') {
      const yearEl = el.querySelector('#current-year');
      if (yearEl) yearEl.textContent = new Date().getFullYear();
    }
  }

  /**
   * Highlight current page in navbar.
   */
  function setActivePage() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav-links a[data-page]').forEach(link => {
      const page = link.dataset.page;
      const isActive =
        (page === 'home' && (path.endsWith('/') || path.endsWith('index.html'))) ||
        (page !== 'home' && path.includes(page));
      link.classList.toggle('active', isActive);
    });
  }

  /**
   * Hamburger menu toggle.
   */
  function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /**
   * Navbar scroll effect.
   */
  function initNavScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    function onScroll() {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /**
   * Boot.
   */
  function init() {
    loadComponent('navbar-placeholder', navbarHTML);
    loadComponent('footer-placeholder', footerHTML);
    setActivePage();
    initHamburger();
    initNavScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
