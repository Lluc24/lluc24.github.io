/* ═══════════════════════════════════════════════════════════════
   MAIN.JS — Typing animation, GitHub API fetch, scroll effects
   ═══════════════════════════════════════════════════════════════ */

// ── Typing animation ──
(() => {
  const el = document.getElementById('typed-name');
  const text = 'Lluc Santamaria Riba';
  let i = 0;
  const speed = 70; // ms per char

  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  // Start after a short delay so the terminal feels "live"
  setTimeout(type, 600);
})();

// ── Mobile nav toggle ──
(() => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  toggle?.addEventListener('click', () => {
    links.classList.toggle('open');
    // Animate hamburger → X
    const spans = toggle.querySelectorAll('span');
    toggle.classList.toggle('active');
    if (toggle.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close on link click
  links?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('active');
      toggle.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity = '';
      });
    });
  });
})();

// ── GitHub language colours (subset) ──
const LANG_COLORS = {
  Python: '#3572A5',
  Java: '#b07219',
  Scala: '#c22d40',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Jupyter: '#DA5B0B',
  'Jupyter Notebook': '#DA5B0B',
  Move: '#4a137a',
  CLIPS: '#00A300',
  TeX: '#3D6117',
  Dart: '#00B4AB',
  Shell: '#89e051',
  Dockerfile: '#384d54',
  PDDL: '#0d47a1',
};

// ── Fetch GitHub repos ──
async function loadRepos() {
  const grid = document.getElementById('repos-grid');

  try {
    const res = await fetch(
      'https://api.github.com/users/Lluc24/repos?per_page=100&sort=updated'
    );

    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const repos = await res.json();

    // Filter out forks and the profile README repo, sort by most recently pushed
    const filtered = repos
      .filter(r => !r.fork && r.name !== 'Lluc24')
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

    grid.innerHTML = '';

    filtered.forEach(repo => {
      const langColor = LANG_COLORS[repo.language] || '#8b949e';
      const desc = repo.description
        ? truncate(repo.description, 120)
        : 'No description.';

      const card = document.createElement('article');
      card.className = 'repo-card fade-in';
      card.innerHTML = `
        <h4><a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a></h4>
        <p class="repo-desc">${escapeHtml(desc)}</p>
        <div class="repo-meta">
          ${repo.language ? `<span class="repo-lang"><span class="lang-dot" style="background:${langColor}"></span> ${repo.language}</span>` : ''}
          ${repo.stargazers_count ? `<span class="repo-stars">★ ${repo.stargazers_count}</span>` : ''}
          ${repo.forks_count ? `<span class="repo-forks">⑂ ${repo.forks_count}</span>` : ''}
        </div>
      `;
      grid.appendChild(card);
    });

    // Trigger fade-in
    requestAnimationFrame(() => observeFadeIns());
  } catch (err) {
    grid.innerHTML = `<p style="color:var(--text-dim);font-family:var(--mono);font-size:.85rem;">
      Failed to load repos. <a href="https://github.com/Lluc24?tab=repositories" target="_blank">View on GitHub →</a>
    </p>`;
    console.error('GitHub fetch error:', err);
  }
}

function truncate(str, n) {
  return str.length > n ? str.slice(0, n).trimEnd() + '…' : str;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ── Intersection Observer for fade-in ──
function observeFadeIns() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ── Mark sections for fade-in ──
document.querySelectorAll('.project-card, .stack-group').forEach(el => {
  el.classList.add('fade-in');
});

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  loadRepos();
  observeFadeIns();
});
