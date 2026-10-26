# Pamela Rose's portfolio

Static portfolio hosted from this repository. Open `index.html` through a local web server to preview it.

## Automatic GitHub projects

On each page load, `github-projects.js` checks the public repositories owned by the username in `projects.js`. New repositories appear automatically once GitHub recognizes a README on their default branch. Imported entries use the repository name, description, primary language, topics, homepage, and source link. They are labeled as personal projects, with a Public badge.

`portfolio`, `rts`, and `template-medical` are excluded. Edit `github.excludedRepos` in `projects.js` to change the exclusions.

The six existing organizational case studies remain curated in `projects.js`, including projects without READMEs. `github.curatedRepos` prevents their GitHub repositories from appearing a second time. New automatic entries do not inherit the organizational label.

No token, build step, or scheduled job is needed. The page uses GitHub's public REST API. If GitHub is offline or its public API rate limit is reached, the curated collection remains available and the page shows a short notice. Reload to retry. See [GitHub's README endpoint documentation](https://docs.github.com/en/rest/repos/contents#get-a-repository-readme).

Run the importer checks with `node --test tests/github-projects.test.cjs`.
