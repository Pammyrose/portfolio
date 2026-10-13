# Project portfolio

A responsive developer portfolio with an ivory and violet theme, a prominent portrait, real project screenshots, detailed case studies, an about section, and GitHub profile links. Includes a matching dark theme, search, language filters, and section navigation. Plain HTML, CSS, and JavaScript; no installation or build step needed.

## Customize

- Edit `projects.js` to set your name, username, initials, bio, location, and toolkit.
- Replace `assets/profile.png` to change your profile photo. The page displays it in the introduction's portrait frame.
- Project screenshots use `assets/etams.png`, `assets/carpis.png`, `assets/pms.png`, `assets/queuing.png`, `assets/Time monitoring.png`, and `assets/it_inventory.png`. Illustrations remain as a fallback when an image is unavailable. Screenshots are shown without cropping, and can be opened at full size from the case study.
- Edit project details in `projects.js`. CARPIS and PMS descriptions and technologies come from their GitHub READMEs; ETAMS, Queuing System, and Time Monitoring details come from their repository source files.
- Set `isPrivate: true` for private organizational projects to show “🔒 Private — Organizational Project” instead of a source link. For public projects, set `sourceUrl` and `demoUrl` to actual project links; leave either empty to hide that button.
- Use `featured: true` to list a project first. The project-specific decorative previews are `inventory`, `personnel`, `performance`, `queue`, and `attendance`.
- Edit each project's `subtitle`, `purpose`, and `features` to customize its case study.
- Edit `workflow` with ordered `{ title, description }` steps to customize the case study's “How it works” section. Workflows describe user actions based on the documented features; IT Inventory's overview is limited to the supplied screenshot.
- Set `highlights` to the short feature summaries displayed on each project card. Full feature lists appear in the case-study dialog and are included in search.
- Edit the colors at the top of `styles.css` and introductory text in `index.html` as needed. Fallback illustration styles are in `assets/project-illustrations.css`.
- Update the page's meta description in `index.html` for your portfolio.

All six projects are marked as private organizational projects. Project cards and detail dialogs display the private notice without source-code links. GT_IT Inventory details reflect the supplied dashboard screenshot; its technology stack is PHP, Bootstrap, Tailwind CSS, and JavaScript. No live demo URLs are configured. The decorative previews are illustrative. This site is independent of GitHub and does not sync repositories automatically.

## Preview

Open `index.html` in your browser. All assets use relative paths, so the page also works inside a GitHub Pages repository subdirectory.

## Host on GitHub Pages

1. Create a GitHub repository and upload `index.html`, `styles.css`, `projects.js`, `script.js`, `.nojekyll`, and the `assets` folder to its root.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch containing these files (usually `main`) and **/ (root)**, then save.
5. Open the published URL shown in the Pages settings once deployment finishes.

You can use a repository named `YOUR-USERNAME.github.io` for a user site, or any other repository name for a project site.
