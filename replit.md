# Scouty The Brave - KAPLAY Sidescroller Game

## Overview

Scouty The Brave is a 2D sidescroller game built with KAPLAY (successor to Kaboom.js), featuring a brave character navigating through obstacles while managing fear levels. The game includes parallax scrolling backgrounds, increasing difficulty, and a comprehensive fear management system.

## System Architecture

### Frontend Architecture
- **Game Engine**: KAPLAY 3.1.0 (loaded via CDN)
- **UI Framework**: React + TypeScript with Tailwind CSS
- **State Management**: Zustand for game state and audio management
- **Build Tool**: Vite with custom configuration for game assets
- **Module System**: ES6 modules with vanilla JavaScript for game logic

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: In-memory storage with extensible interface
- **API Structure**: RESTful endpoints under `/api` prefix

### Hybrid Architecture Decision
The application uses a unique hybrid approach where:
- The game runs purely with KAPLAY and vanilla JavaScript modules
- React/TypeScript serves as a backup interface and development framework
- Game logic is completely decoupled from React components

## Key Components

### Game Engine (KAPLAY)
- **Entry Point**: `client/src/game/main.js`
- **Configuration**: `client/src/game/config.js` with all game constants
- **Player System**: `client/src/game/player.js` handles character controls and physics
- **Obstacle System**: `client/src/game/obstacles.js` manages spawning and collision
- **UI System**: `client/src/game/ui.js` handles HUD and game interface
- **Scene Management**: `client/src/game/scenes.js` for game states

### Game Features
- Canvas size: 800×600 pixels
- Parallax scrolling backgrounds
- Fear management system (0-100%)
- Progressive difficulty scaling
- Physics-based movement with gravity
- Multiple control schemes (WASD, arrows, space)

### State Management
- **Game State**: `useGame` store manages game phases (ready/playing/ended)
- **Audio State**: `useAudio` store handles sound effects and music
- **Local Storage**: Persistent settings and preferences

### Database Schema
```typescript
// User management system
users: {
  id: serial (primary key)
  username: text (unique)
  password: text
}
```

## Data Flow

### Game Loop
1. KAPLAY initializes with physics and rendering systems
2. Asset loading for sprites and sounds
3. Scene management handles game states
4. Real-time game state updates through KAPLAY's update loop
5. UI synchronization with game state

### User Interaction
1. Browser loads HTML with canvas element
2. KAPLAY takes control of canvas rendering
3. Input handling through KAPLAY's event system
4. State changes propagate through game systems
5. Visual feedback through canvas updates

### Server Communication
- Express serves static assets and handles API routes
- Database operations through Drizzle ORM
- Session management for user persistence
- Development mode includes Vite middleware for HMR

## External Dependencies

### Game Engine
- **KAPLAY 3.1.0**: Core game engine loaded via CDN
- **Canvas API**: Native browser rendering
- **Web Audio API**: Sound effects and music

### UI Framework
- **React 18**: Component-based UI (backup interface)
- **Radix UI**: Comprehensive component library
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon library

### Backend Services
- **Neon Database**: PostgreSQL hosting (configured but not actively used)
- **Express.js**: Web server framework
- **Drizzle Kit**: Database migrations and management

### Development Tools
- **Vite**: Build tool with GLSL shader support
- **TypeScript**: Type safety for non-game code
- **ESBuild**: Production builds
- **PostCSS**: CSS processing

## Deployment Strategy

### Build Process
1. **Development**: `npm run dev` - Runs TSX server with Vite middleware
2. **Production Build**: 
   - Vite builds client assets to `dist/public`
   - ESBuild bundles server code to `dist/index.js`
3. **Production Start**: Node.js serves bundled application

### Replit Configuration
- **Runtime**: Node.js 20 with bash and web modules
- **Development**: Auto-reload on file changes
- **Deployment**: Autoscale target with port 5000→80 mapping
- **Asset Handling**: Support for GLTF, GLB, and audio files

### File Structure
```
├── client/                 # Frontend game and UI
│   ├── src/game/          # KAPLAY game modules
│   ├── src/components/    # React UI components
│   └── public/            # Static game assets
├── server/                # Express backend
├── shared/                # Shared types and schemas
└── dist/                  # Production build output
```

## Changelog
- June 26, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.