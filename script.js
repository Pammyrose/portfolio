"use strict";

const profile = window.portfolio;
const $ = (id) => document.getElementById(id);
const setText = (id, value) => { $(id).textContent = value; };
setText("header-username", profile.username);
setText("profile-name", profile.name);
setText("profile-username", profile.username);
setText("profile-bio", profile.bio);
setText("initials", profile.initials);
const profilePhoto = $("profile-photo");
profilePhoto.alt = `${profile.name} profile photo`;
profilePhoto.addEventListener("error", () => { profilePhoto.hidden = true; });
if (profilePhoto.complete && !profilePhoto.naturalWidth) profilePhoto.hidden = true;
setText("footer-name", profile.name);
setText("year", new Date().getFullYear());
setText("project-count", profile.projects.length);
setText("hero-project-total", profile.projects.length);
setText("hero-name", profile.name);
for (const id of ["hero-github", "profile-github"]) {
  $(id).href = `https://github.com/${encodeURIComponent(profile.username)}`;
}
$("email-address").value = profile.email;
$("contact-email").addEventListener("click", () => {
  setText("email-copy-status", "");
  $("email-dialog").showModal();
});
$("close-email-dialog").addEventListener("click", () => $("email-dialog").close());
$("email-dialog").addEventListener("click", (event) => {
  if (event.target !== $("email-dialog")) return;
  const bounds = $("email-dialog").getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) $("email-dialog").close();
});
$("copy-email").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(profile.email);
    setText("email-copy-status", "Email copied!");
  } catch {
    const address = $("email-address");
    address.focus();
    address.select();
    address.setSelectionRange(0, address.value.length);
    let copied = false;
    try { copied = document.execCommand("copy"); } catch { /* Keep the email selected for manual copying. */ }
    setText("email-copy-status", copied ? "Email copied!" : "Select and copy the email above, or press Ctrl+C (⌘C on Mac).");
  }
});
document.title = `${profile.name} · Projects`;

function tag(label) {
  const element = document.createElement("span");
  element.textContent = label;
  return element;
}
profile.toolkit.forEach((label) => $("toolkit").append(tag(label)));
const languages = [...new Set(profile.projects.map((project) => project.language))].sort();
languages.forEach((language) => {
  const option = document.createElement("option");
  option.value = language;
  option.textContent = language;
  $("language-filter").append(option);
});
$("sample-note").hidden = !profile.projects.some((project) => project.example);

// These decorative CSS previews can be reused, or replaced with your own images.
const artworks = {
  queue: '<div class="mock-sidebar"><span class="mock-logo">Q.</span><i class="selected"></i><i></i><i></i></div><div class="mock-content"><div class="mock-heading">Order queue<span>Now serving</span></div><div class="mock-queue"><div><small>Released</small><b>— — —</b><b>— — —</b><b>— — —</b></div><div><small>Claimed</small><b>— — —</b><b>— — —</b></div></div><div class="mock-queue-footer">Order status at a glance</div></div>',
  attendance: '<div class="mock-sidebar"><span class="mock-logo">T.</span><i class="selected"></i><i></i><i></i></div><div class="mock-content"><div class="mock-heading">Daily time monitoring<span>Attendance</span></div><div class="mock-filters"><span>Employee</span><span>Date range</span><b>Filter</b></div><div class="mock-table"><div><span>Employee</span><span>Time</span><span>Status</span></div><div><i></i><i></i><b>Logged</b></div><div><i></i><i></i><b>Logged</b></div><div><i></i><i></i><b>Logged</b></div><div><i></i><i></i><b>Logged</b></div></div></div>',
  inventory: '<div class="mock-sidebar"><span class="mock-logo">E.</span><i class="selected"></i><i></i><i></i><i></i></div><div class="mock-content"><div class="mock-heading">Asset register<span>Inventory</span></div><div class="mock-stats"><i><small>Records</small><span class="mock-stat-line"></span></i><i><small>Assignments</small><span class="mock-stat-line"></span></i><i><small>Asset tags</small><span class="mock-stat-line"></span></i></div><div class="mock-table"><div><span>Asset</span><span>Assignment</span><span>Status</span></div><div><i></i><i></i><b>Tracked</b></div><div><i></i><i></i><b>Tracked</b></div><div><i></i><i></i><b>Tracked</b></div></div></div>',
  personnel: '<div class="mock-sidebar"><span class="mock-logo">C.</span><i class="selected"></i><i></i><i></i><i></i></div><div class="mock-content"><div class="mock-heading">Personnel overview<span>Directory</span></div><div class="mock-people"><div><span class="person-circle"></span><i></i><small>Employee profile</small></div><div><span class="person-circle"></span><i></i><small>Employee profile</small></div><div><span class="person-circle"></span><i></i><small>Employee profile</small></div></div><div class="mock-table"><div><span>Positions</span><span>Office</span><span>Staffing</span></div><div><i></i><i></i><b>Assigned</b></div><div><i></i><i></i><b>Assigned</b></div></div></div>',
  performance: '<div class="mock-sidebar"><span class="mock-logo">P.</span><i class="selected"></i><i></i><i></i><i></i></div><div class="mock-content"><div class="mock-heading">Performance overview<span>Reporting</span></div><div class="mock-legend"><span>Targets</span><span>Accomplishments</span></div><div class="mock-chart"><div><i></i><b></b></div><div><i></i><b></b></div><div><i></i><b></b></div><div><i></i><b></b></div><div><i></i><b></b></div><div><i></i><b></b></div></div><div class="mock-chart-label">Work &amp; Financial Plan</div></div>',
  orbit: '<div class="mini-chart"><i></i><i></i><i></i><i></i><i></i><i></i></div>',
  folio: '<strong>Less, but better.</strong><small>A CREATIVE PORTFOLIO</small>',
  tasks: '<div class="mini-tasks"><i></i><i></i><i></i></div>',
  weather: '<div class="weather-sun"></div><div class="weather-temp">24°<small>A little sunshine.</small></div>',
  notes: '<div class="mini-writing">Notes & ideas<i></i><i></i><i></i></div>',
  terminal: '<div class="mini-terminal"><span>$ python hello.py</span>→ Make room for better things.<br>▊</div>'
};

function previewMarkup(project) {
  const artwork = Object.hasOwn(artworks, project.artwork) ? project.artwork : "inventory";
  return `<div class="project-art art-${artwork}" aria-hidden="true"><div class="art-grid"></div><div class="art-window"><div class="mock-browser"><span>● ● ●</span><span>workspace / overview</span><span>↗</span></div><div class="mock-app">${artworks[artwork]}</div></div><span class="art-caption">INTERFACE ILLUSTRATION</span></div>`;
}

function createPreview(project, detail = false) {
  const preview = document.createElement("div");
  const fallback = () => {
    preview.className = "";
    preview.innerHTML = previewMarkup(project);
  };
  if (!project.screenshot) {
    fallback();
    return preview;
  }
  preview.className = "screenshot-preview";
  const image = document.createElement("img");
  image.alt = project.screenshotAlt || `${project.name} application screenshot`;
  image.loading = detail ? "eager" : "lazy";
  image.decoding = "async";
  image.addEventListener("error", fallback, { once: true });
  image.src = project.screenshot;
  if (detail) {
    const link = document.createElement("a");
    link.href = project.screenshot;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `Open ${project.name} screenshot at full size`);
    link.append(image);
    preview.append(link);
  } else {
    preview.append(image);
  }
  const caption = document.createElement("span");
  caption.className = "screenshot-caption";
  caption.textContent = detail ? "DASHBOARD SCREENSHOT · CLICK TO VIEW FULL SIZE" : "DASHBOARD SCREENSHOT";
  preview.append(caption);
  return preview;
}

function safeUrl(value) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}

function openProject(project) {
  setText("dialog-title", project.name);
  setText("dialog-description", project.description);
  setText("dialog-category", project.category);
  setText("dialog-purpose", project.purpose || project.description);
  const workflow = project.workflow || [];
  $("dialog-workflow-section").hidden = workflow.length === 0;
  $("dialog-workflow").replaceChildren(...workflow.map((step) => {
    const item = document.createElement("li");
    const title = document.createElement("h4");
    title.textContent = step.title;
    const description = document.createElement("p");
    description.textContent = step.description;
    item.append(title, description);
    return item;
  }));
  $("dialog-art").replaceChildren(createPreview(project, true));
  $("dialog-features").replaceChildren(...(project.features || []).map((feature) => {
    const item = document.createElement("li");
    item.textContent = feature;
    return item;
  }));
  $("dialog-tags").replaceChildren(...project.tags.map(tag));
  $("dialog-links").replaceChildren();
  [["Live demo", project.demoUrl], ["Source code", project.isPrivate ? null : project.sourceUrl]].forEach(([label, value]) => {
    const url = safeUrl(value);
    if (!url) return;
    const link = document.createElement("a");
    link.textContent = `${label} ↗`;
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "profile-button";
    $("dialog-links").append(link);
  });
  if (project.isPrivate) {
    const notice = document.createElement("span");
    notice.className = "source-link";
    notice.textContent = "🔒 Private — Organizational Project";
    $("dialog-links").append(notice);
  }
  setText("dialog-example", project.example ? "This is an example project. Add your own details and links in projects.js." : "");
  $("project-dialog").setAttribute("aria-labelledby", "dialog-title");
  $("project-dialog").showModal();
}

function createCard(project) {
  const card = document.createElement("article");
  card.className = "project-card";
  // Customizable project text is assigned with textContent.
  card.innerHTML = `<div class="card-preview"></div><div class="card-body"><div class="card-top"><span class="project-number"></span><span class="category"></span><span class="featured-badge">Public</span></div><h3><button class="project-name" type="button"></button><span class="project-title-arrow" aria-hidden="true">↗</span></h3><p class="project-subtitle"></p><p class="project-description"></p><div class="card-features"><h4>Features</h4><ul></ul></div><div class="project-tags"></div><div class="card-actions"><button class="case-study-button" type="button">View case study <span aria-hidden="true">↗</span></button></div><div class="card-meta"><span class="language"><span class="language-dot"></span><span class="language-name"></span></span><span>GitHub repository</span></div></div>`;
  card.querySelector(".card-preview").append(createPreview(project));
  const button = card.querySelector(".project-name");
  button.textContent = project.name;
  button.addEventListener("click", () => openProject(project));
  card.querySelector(".case-study-button").addEventListener("click", () => openProject(project));
  card.querySelector(".project-number").textContent = String(profile.projects.indexOf(project) + 1).padStart(2, "0");
  card.querySelector(".project-subtitle").textContent = project.subtitle || project.category;
  card.querySelector(".project-description").textContent = project.description;
  const highlights = project.highlights || (project.features || []).slice(0, 3);
  card.querySelector(".card-features").hidden = highlights.length === 0;
  highlights.forEach((feature) => {
    const item = document.createElement("li");
    item.textContent = feature;
    card.querySelector(".card-features ul").append(item);
  });
  project.tags.forEach((label) => card.querySelector(".project-tags").append(tag(label)));
  card.querySelector(".language-dot").dataset.language = project.language;
  card.querySelector(".language-name").textContent = project.language;
  card.querySelector(".category").textContent = project.category;
  const sourceUrl = project.isPrivate ? null : safeUrl(project.sourceUrl);
  card.querySelector(".card-meta > span:last-child").textContent = project.isPrivate ? "Organizational project" : "GitHub repository";
  card.querySelector(".featured-badge").hidden = !sourceUrl;
  if (project.isPrivate) {
    const notice = document.createElement("span");
    notice.className = "source-link";
    notice.textContent = "🔒 Private — Organizational Project";
    card.querySelector(".card-actions").append(notice);
  } else if (sourceUrl) {
    const link = document.createElement("a");
    link.className = "source-link";
    link.href = sourceUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Source code ↗";
    link.setAttribute("aria-label", `View ${project.name} source code on GitHub`);
    card.querySelector(".card-actions").append(link);
  }
  return card;
}

function renderProjects() {
  const query = $("project-search").value.trim().toLowerCase();
  const language = $("language-filter").value;
  const visible = profile.projects.filter((project) => {
    const searchable = [project.name, project.description, project.language, project.category, ...project.tags, ...(project.features || []), ...(project.highlights || [])].join(" ").toLowerCase();
    return searchable.includes(query) && (language === "all" || project.language === language);
  });
  visible.sort($("project-sort").value === "name"
    ? (a, b) => a.name.localeCompare(b.name)
    : (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  $("project-grid").replaceChildren(...visible.map(createCard));
  setText("results-count", `${visible.length} ${visible.length === 1 ? "project" : "projects"}`);
  $("empty-state").hidden = visible.length !== 0;
}
$("project-search").addEventListener("input", renderProjects);
$("language-filter").addEventListener("change", renderProjects);
$("project-sort").addEventListener("change", renderProjects);
$("reset-filters").addEventListener("click", () => {
  $("project-search").value = "";
  $("language-filter").value = "all";
  renderProjects();
  $("project-search").focus();
});
$("close-dialog").addEventListener("click", () => $("project-dialog").close());
$("project-dialog").addEventListener("click", (event) => {
  if (event.target !== $("project-dialog")) return;
  const bounds = $("project-dialog").getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) $("project-dialog").close();
});

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  $("theme-toggle").setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
  $("theme-toggle").title = `Switch to ${theme === "dark" ? "light" : "dark"} theme`;
}
let savedTheme;
try { savedTheme = localStorage.getItem("portfolio-theme-v2"); } catch { /* Storage may be unavailable when viewing local files. */ }
applyTheme(["light", "dark"].includes(savedTheme) ? savedTheme : "light");
$("theme-toggle").addEventListener("click", () => {
  const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(theme);
  try { localStorage.setItem("portfolio-theme-v2", theme); } catch { /* Theme still works without storage. */ }
});

// Keep navigation useful while moving between longer portfolio sections.
const sectionLinks = [...document.querySelectorAll('.header-nav a')];
const navigationSections = ["projects", "about", "contact"].map($);
let navigationFramePending = false;
function updateNavigation() {
  const current = navigationSections.filter((section) => section.getBoundingClientRect().top <= 160).at(-1);
  sectionLinks.forEach((link) => {
    const active = current && link.hash === `#${current.id}`;
    link.classList.toggle("is-active", Boolean(active));
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  navigationFramePending = false;
}
window.addEventListener("scroll", () => {
  if (navigationFramePending) return;
  navigationFramePending = true;
  requestAnimationFrame(updateNavigation);
}, { passive: true });
updateNavigation();
renderProjects();
