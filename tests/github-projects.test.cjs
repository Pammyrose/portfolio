const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");

function setup() {
  const context = { window: {}, AbortController, setTimeout, clearTimeout };
  vm.createContext(context);
  for (const file of ["projects.js", "github-projects.js"]) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, "..", file), "utf8"), context);
  }
  return { profile: context.window.portfolio, load: context.window.githubProjects.load };
}

const repo = (name, extra = {}) => ({
  name, private: false, owner: { login: "Pammyrose" }, language: "Rust", ...extra
});
const response = (body, status = 200) => ({ ok: status === 200, status, json: async () => body });

test("imports public README repositories, excludes configured names, preserves legacy work", async () => {
  const { profile, load } = setup();
  const before = JSON.stringify(profile.projects);
  const requests = [];
  const projects = await load(profile, async (url) => {
    requests.push(url);
    if (url.includes("/users/")) return response([
      repo("PORTFOLIO"), repo("RTS"), repo("template_medical"),
      ...profile.github.curatedRepos.map((name) => repo(name)),
      repo("secret", { private: true }), repo("elsewhere", { owner: { login: "someone-else" } }),
      repo("no-readme"), repo("new-project", { description: "Useful app", topics: ["web", "Rust"], homepage: "https://example.com" }),
      repo("another-project", { language: null })
    ]);
    if (url.endsWith("/no-readme/readme")) return response({}, 404);
    return response({ type: "file", name: "README.md" });
  });
  assert.equal(projects.length, 2);
  assert.equal(projects[0].name, "new project");
  assert.equal(projects[0].description, "Useful app");
  assert.deepEqual(Array.from(projects[0].tags), ["Rust", "web"]);
  assert.equal(projects[0].sourceUrl, "https://github.com/Pammyrose/new-project");
  assert.equal(projects[0].demoUrl, "https://example.com");
  assert.equal(projects[0].isPrivate, false);
  assert.equal(projects[0].category, "Personal project");
  assert.equal(projects[1].language, "Other");
  assert.ok(projects[1].description);
  assert.equal(requests.length, 4); // Repository listing plus eligible README checks only.
  assert.equal(JSON.stringify(profile.projects), before);
  assert.equal(profile.projects.length, 6);
});

test("loads repositories beyond the first 100", async () => {
  const { profile, load } = setup();
  let pages = 0;
  const projects = await load(profile, async (url) => {
    if (url.includes("/users/")) {
      pages++;
      return response(pages === 1 ? Array.from({ length: 100 }, () => repo("portfolio")) : [repo("page-two")]);
    }
    return response({ type: "file" });
  });
  assert.equal(pages, 2);
  assert.equal(projects.length, 1);
  assert.equal(projects[0].name, "page two");
});

test("surfaces API and network failures without changing curated projects", async () => {
  for (const failure of ["listing", "readme", "network"]) {
    const { profile, load } = setup();
    const before = JSON.stringify(profile.projects);
    await assert.rejects(load(profile, async (url) => {
      if (failure === "network") throw new Error("Offline");
      if (url.includes("/users/")) return failure === "listing" ? response({}, 403) : response([repo("new")]);
      return response({}, 429);
    }));
    assert.equal(JSON.stringify(profile.projects), before);
  }
});

test("all currently known repositories are excluded or represented by a case study", async () => {
  const { profile, load } = setup();
  const projects = await load(profile, async (url) => {
    assert.ok(url.includes("/users/"), "existing repositories should not need README checks");
    return response([...profile.github.excludedRepos, ...profile.github.curatedRepos].map((name) => repo(name)));
  });
  assert.equal(projects.length, 0);
});
