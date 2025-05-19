# Upwork Multi-Agent Frontend

A futuristic React interface for the Upwork Multi-Agent System, built with Next.js 14, TypeScript, and TailwindCSS.

## Features

- **Modern UI Framework**: Built with Next.js 14 and React Server Components
- **Type-Safe**: Fully typed with TypeScript
- **Neomorphic Design System**: Custom-built UI components using TailwindCSS and shadcn/ui
- **3D Visualizations**: Agent visualizations with Three.js/React Three Fiber
- **Fluid Animations**: Micro-interactions and fluid UI with Framer Motion
- **Real-time Updates**: WebSocket integration via PartyKit
- **Accessible Design**: WCAG 2.1 compliant with adaptive contrast
- **Performance Optimized**: Edge caching and WebGPU acceleration for data visualization

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

The application will be available at http://localhost:3001.

## Project Structure

```
frontend/
├── app/                # Next.js App Router
│   ├── dashboard/      # Dashboard pages
│   └── api/            # API routes
├── components/         # React components
│   ├── ui/             # UI components
│   └── visualizations/ # Three.js visualizations
├── lib/                # Utility functions
└── public/             # Static assets
```

## Environment Variables

Create a `.env.local` file based on `.env.example`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_ENABLE_3D_AVATARS=true
NEXT_PUBLIC_ENABLE_WEBGPU=false
```

## Integration with Backend

This frontend connects to the FastAPI backend at `http://localhost:8000`. Make sure the backend server is running when developing the frontend.

## Deployment

```bash
# Build for production
npm run build

# Start the production server
npm start
```

## Styling

The application uses TailwindCSS with a custom configuration. The main theme variables are defined in:

- `app/globals.css`: Theme colors and global styles
- `tailwind.config.js`: Custom extensions to TailwindCSS 