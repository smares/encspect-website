# Modern Web Guidance (project skill)

Google Chrome's [Modern Web Guidance](https://github.com/GoogleChrome/modern-web-guidance) skill, from the npm package `modern-web-guidance` 1.0.2 (skill version `2026_11_16-268fb9ea`, in `skill-version.txt`). Apache License 2.0 (`LICENSE`).

- Only `SKILL.md` is committed: it runs the guidance through `npx modern-web-guidance@latest`, which fetches the guides and the scanner when used, so the package's 17 MB of tools are not kept here.
- Telemetry is off for every session in this repository (`DISABLE_TELEMETRY` in `.claude/settings.json`).
- To update: `npm pack modern-web-guidance@latest`, copy `skills/modern-web-guidance/SKILL.md` and `skill-version.txt` over these, and note the version above.
