"use strict";

// Public, read-only GitHub requests. Never put an access token in browser code.
window.githubProjects = (() => {
  const normalize = (name) => name.toLowerCase().replace(/[^a-z0-9]/g, "");

  function projectCategory(tags) {
    const stack = tags.join(" ").toLowerCase();
    if (/\b(dart|flutter)\b/.test(stack)) return "Mobile App";
    return "Web-based System";
  }

  async function findProjectImage(owner, repo, branch, request) {
    if (!branch) return "";
    const response = await request(`/repos/${owner}/${encodeURIComponent(repo)}/git/trees/${encodeURIComponent(branch)}?recursive=1`);
    if (response.status === 404) return "";
    if (!response.ok) throw new Error(`GitHub repository tree request failed (${response.status})`);
    const tree = await response.json();
    if (!Array.isArray(tree.tree)) return "";
    const image = tree.tree.find((item) => {
      if (item.type !== "blob" || !/\.(png|jpe?g)$/i.test(item.path)) return false;
      const directory = item.path.split("/").slice(0, -1);
      return directory.some((part) => /^(images?|screenshots?)$/i.test(part));
    });
    return image ? `https://raw.githubusercontent.com/${owner}/${encodeURIComponent(repo)}/${encodeURIComponent(branch)}/${image.path.split("/").map(encodeURIComponent).join("/")}` : "";
  }

  async function load(profile, fetcher = fetch) {
    const owner = encodeURIComponent(profile.username);
    const excluded = new Set([
      ...(profile.github?.excludedRepos || []),
      ...(profile.github?.curatedRepos || []),
      ...profile.projects.map((project) => project.name)
    ].map(normalize));
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    const request = (path) => fetcher(`https://api.github.com${path}`, {
      headers: { Accept: "application/vnd.github+json" },
      signal: controller.signal
    });
    try {
      const repos = [];
      for (let page = 1; ; page++) {
        const response = await request(`/users/${owner}/repos?type=owner&sort=created&per_page=100&page=${page}`);
        if (!response.ok) throw new Error(`GitHub repository request failed (${response.status})`);
        const batch = await response.json();
        if (!Array.isArray(batch)) throw new Error("Unexpected GitHub repository response");
        repos.push(...batch);
        if (batch.length < 100) break;
      }
      const candidates = repos.filter((repo) =>
        repo.private === false && repo.owner?.login.toLowerCase() === profile.username.toLowerCase() &&
        !excluded.has(normalize(repo.name))
      );
      const projects = new Array(candidates.length);
      let next = 0;
      // Limit simultaneous README checks for accounts with many repositories.
      await Promise.all(Array.from({ length: Math.min(4, candidates.length) }, async () => {
        while (next < candidates.length) {
          const index = next++;
          const repo = candidates[index];
          const response = await request(`/repos/${owner}/${encodeURIComponent(repo.name)}/readme`);
          if (response.status === 404) continue;
          if (!response.ok) throw new Error(`GitHub README request failed (${response.status})`);
          const readme = await response.json();
          if (readme.type !== "file") continue;
          const language = repo.language || "Other";
          const topics = Array.isArray(repo.topics) ? repo.topics : [];
          const tags = [...new Set([language, ...topics])];
          const isSpendTracker = normalize(repo.name) === "spendtracker";
          const projectImage = await findProjectImage(owner, repo.name, repo.default_branch, request);
          projects[index] = {
            name: repo.name.replace(/[-_]+/g, " "),
            description: repo.description || `Explore ${repo.name} on GitHub for documentation and project details.`,
            subtitle: "Public GitHub project",
            category: projectCategory(tags),
            language,
            tags,
            ...(projectImage || isSpendTracker ? {
              screenshot: projectImage || "./assets/spendtracker.jpg",
              screenshotAlt: isSpendTracker
                ? "SpendTracker mobile app screens showing its welcome page and spending dashboard."
                : `${repo.name.replace(/[-_]+/g, " ")} project screenshot.`
            } : {}),
            artwork: "terminal",
            features: ["Project documentation available in the GitHub README."],
            featured: false,
            example: false,
            isPrivate: false,
            sourceUrl: `https://github.com/${owner}/${encodeURIComponent(repo.name)}`,
            demoUrl: repo.homepage || ""
          };
        }
      }));
      return projects.filter(Boolean);
    } finally {
      clearTimeout(timeout);
      controller.abort();
    }
  }

  return { load };
})();
