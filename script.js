// Counts come from the page itself; the repo count comes from GitHub and falls back to the page text if the request fails.
const GITHUB_USER = "Sadullaev217";

const setAll = (selector, value) =>
  document.querySelectorAll(selector).forEach((el) => { el.textContent = value; });

const projects = document.querySelectorAll("#projects .step:not(.next)").length;
const languages = new Set(
  [...document.querySelectorAll("#projects .lang")].map((el) => el.textContent.split("·")[0].trim())
).size;
const studying = document.querySelectorAll("#studying .areas li").length;

setAll('[data-stat="projects"]', projects);
setAll('[data-stat="languages"]', languages);
setAll('[data-count="projects"]', projects);
setAll('[data-count="studying"]', studying);

// Theme: dark by default, choice is remembered in localStorage (an inline script in <head> applies it before paint).
document.querySelector(".theme-toggle")?.addEventListener("click", () => {
  const root = document.documentElement;
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});

fetch(`https://api.github.com/users/${GITHUB_USER}`)
  .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
  .then((user) => setAll('[data-stat="repos"]', user.public_repos))
  .catch(() => {});
