# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start the development server with Vite
- `npm run build` - Type check with TypeScript and build for production
- `npm run lint` - Run ESLint on all TypeScript/TSX files
- `npm run preview` - Preview the production build locally

### Testing
No test commands are currently configured. Consider adding tests with a framework like Vitest or Jest.

## Architecture Overview

This is a React + TypeScript application for creating and sharing presentation slides using MDX format. The app allows multiple users to collaborate on LT (Lightning Talk) presentations through a GitHub-based workflow.

### Key Components

1. **Slide Storage**: Slides are stored as MDX files in `/src/slides/` directory
2. **Routing**: Uses React Router with two main routes:
   - `/` - Lists all available slides
   - `/view/:filename` - Displays individual slide presentations

3. **Slide Viewer**: 
   - Parses MDX files and splits them into individual slides based on `<hr />` elements (rendered from `---` in Markdown)
   - Provides keyboard navigation (arrows, space, F for fullscreen)
   - Shows slide counter and navigation controls

4. **Naming Convention**: Slides follow the pattern `YYYY-MM-DD_username_title.mdx`

### Technology Stack
- **Build Tool**: Vite with React + MDX plugins
- **Styling**: Tailwind CSS (using @tailwindcss/vite)
- **Type Checking**: TypeScript with strict configuration
- **Code Quality**: ESLint with React hooks and refresh plugins
- **MDX Processing**: @mdx-js/rollup and @mdx-js/react for MDX support

### Important Notes
- The app uses MDX files (not plain Markdown) in the `/src/slides/` directory
- The README mentions `/public/slides/` for Markdown files, but the actual implementation uses `/src/slides/` with MDX
- Slides are dynamically imported using Vite's `import.meta.glob`
- Each slide presentation is split into pages using horizontal rules (`---` in MDX)