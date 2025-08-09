# Static Hosting Deployment Guide

This project can be deployed as a static website on any static hosting platform. The build process generates a `dist` folder containing all the necessary files.

## How to Deploy

1. **Build the project:**
   ```bash
   npm install
   npm run build
   ```

2. **Deploy the `dist` folder** to any static hosting service:
   - GitHub Pages
   - Netlify
   - Vercel (already configured with `vercel.json`)
   - AWS S3 + CloudFront
   - Firebase Hosting
   - Any other static hosting service

## Key Features for Static Hosting

- **Hash-based routing**: All routes use `#` URLs (e.g., `#/customize`, `#/about`) which work perfectly on static file servers
- **Pre-rendered HTML**: The initial page load includes server-side rendered content for better SEO and loading performance
- **No server configuration required**: Works on any basic static file server without special routing rules

## Example URLs

- Main page: `https://your-domain.com/`
- Customize page: `https://your-domain.com/#/customize`
- About page: `https://your-domain.com/#/about`
- Safety info: `https://your-domain.com/#/first-time-safety`

## Technical Details

The project uses:
- **Webpack** for bundling and building
- **React Router with Hash Routing** for client-side navigation
- **Server-side rendering** for the initial page load (pre-rendering during build)
- **Copy Webpack Plugin** to include all static assets from the `web` folder

This approach ensures the app works reliably on any static hosting platform without requiring server-side configuration or special routing rules.