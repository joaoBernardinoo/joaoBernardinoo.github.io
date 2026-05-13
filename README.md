# João Bernardino Portfolio

Personal portfolio site built with React + Vite and deployed with GitHub Pages.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

Deployment is automated via GitHub Actions using `.github/workflows/deploy.yml`:
- Runs on pushes to `main`
- Builds the app with Vite
- Publishes `dist/` to the `gh-pages` branch
