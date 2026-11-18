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

fetch(`https://api.github.com/users/${GITHUB_USER}`)
  .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
  .then((user) => setAll('[data-stat="repos"]', user.public_repos))
  .catch(() => {});
