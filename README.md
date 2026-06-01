# MusicManagementHub - Frontend Client

A modern React-based frontend for the MusicManagementHub application, built with
TypeScript, Vite, and Deno. This client provides a user-friendly interface for
browsing, managing, and organizing music genres with hierarchical relationships.

## Overview

MusicManagementHub Frontend is a single-page application that allows users to:

- **Browse Genres**: View all available music genres with alphabetical
  navigation
- **Explore Genre Hierarchies**: Discover parent-child relationships between
  genres
- **Manage Content**: Admin users can create, edit, and delete genres
- **User Authentication**: Secure login and session management
- **Responsive Design**: Optimized for desktop and mobile devices

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 8
- **Runtime**: Deno with Node modules
- **Routing**: React Router DOM 7
- **Styling**: CSS Modules with camelCase convention
- **UI Components**: Lucide React icons
- **Code Quality**: ESLint with React and TypeScript plugins
- **Package Manager**: Deno with automatic node_modules directory

## Project Structure

```
musicapp-client/
├── src/
│   ├── features/
│   │   ├── auth/                    # Authentication feature
│   │   │   ├── components/          # Auth-related components (ProtectedRoute, AdminRoute)
│   │   │   ├── pages/               # Login page
│   │   │   ├── types/               # Auth types
│   │   │   └── utils/               # Authentication utilities
│   │   ├── genres/                  # Genres feature
│   │   │   ├── pages/               # GenreList and Genre detail pages
│   │   │   └── types/               # Genre and GenreHierarchy types
│   │   └── shared/                  # Shared components and utilities
│   │       ├── components/          # Navbar component
│   │       ├── pages/               # Home and NotFound pages
│   │       └── utils/               # Session info utilities
│   ├── router/                      # Route definitions
│   ├── services/                    # API client service
│   ├── types/                       # Global API types
│   ├── App.tsx                      # Main app component
│   ├── main.tsx                     # Application entry point
│   └── index.css                    # Global styles
├── public/                          # Static assets
├── deno.json                        # Deno configuration
├── vite.config.ts                   # Vite configuration
├── tsconfig.json                    # TypeScript configuration
└── index.html                       # HTML entry point
```

## Features

### Authentication

- Login page with credentials
- Protected routes for authenticated users
- Admin-only routes with special permissions
- Session management with secure token handling

### Genre Management

- **Genre List**: Browse all genres organized alphabetically with
  quick-navigation letter picker
- **Genre Details**: View comprehensive genre information including:
  - Genre name and description
  - Creator information
  - Hierarchical relationships (parent genres)
  - Child genres
- **Genre Hierarchy**: Display and explore parent-child relationships between
  genres
- **Admin Functions**: Create, edit, and delete genres (admin-only)

### User Experience

- Sticky navigation bar with brand identity
- Responsive design for all screen sizes
- Dark mode support
- Smooth scroll-to-letter navigation
- Intuitive back button navigation
- Loading states and error handling

## Installation

### Prerequisites

- Deno (latest version) - [Install Deno](https://deno.land/)
- Node.js/npm (for package resolution via node_modules)

### Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd musicapp-client
```

2. Install dependencies via Deno:

```bash
deno install
```

3. Configure environment variables: Create a `.env` file in the root directory:

```env
VITE_BASE_URL=http://localhost:5000
VITE_ENV=development
```

## Development

### Available Commands

```bash
# Start development server
deno task dev

# Build for production
deno task build

# Serve production build
deno task serve
```

The development server typically runs at `http://localhost:5173`

### Code Quality

```bash
# Run ESLint
deno run --allow-read --allow-env npm:eslint .
```

### Configuration Files

- **deno.json**: Deno configuration with task definitions and import aliases
- **vite.config.ts**: Vite build configuration with React and Deno plugins
- **tsconfig.json**: TypeScript compiler options
- **eslint.config.js**: ESLint configuration for code quality
- **.env**: Environment variables (create locally, not in git)

## API Integration

The frontend communicates with a backend API at the configured `VITE_BASE_URL`.

### Main API Endpoints

- `GET /genres` - List all genres
- `GET /genres/{id}` - Get genre details
- `POST /genres` - Create a new genre (admin)
- `PATCH /genres/{id}` - Update a genre (admin)
- `DELETE /genres/{id}` - Delete a genre (admin)
- `GET /genre-hierarchies?genreId={id}` - Get genre hierarchies
- `GET /genre-hierarchies?parentGenreId={id}` - Get child genres
- `POST /auth/login` - User login

### API Client

The `src/services/api.client.ts` provides a typed wrapper for all API requests:

```typescript
import { apiRequest } from "./services/api.client";

const data = await apiRequest<RequestType, ResponseType>(path, {
    method: "GET",
    body: requestPayload,
});
```

## Authentication Flow

1. User navigates to login page (`/`)
2. Credentials are submitted to backend
3. Session token is stored locally
4. Protected routes check authentication status
5. Admin routes additionally verify user permissions

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- CSS Modules for scoped styling
- Lazy loading of routes
- Smooth scroll behavior
- Optimized asset delivery with Vite
- Development logging for API responses

## Contributing

When contributing to this project:

1. Follow the existing code structure and naming conventions
2. Use TypeScript for type safety
3. Create CSS modules for component styling
4. Test features across different devices
5. Maintain the feature-based folder structure

## License

[Add license information]

## Related Projects

- **Backend API**:
  [musicapp-server](https://github.com/solrac031504/musicapp-server)
- **Database**: [musicapp-db](https://github.com/solrac031504/musicapp-db)

## Notes

- The app uses Deno for package management with automatic node_modules directory
- All styles use CSS Modules with camelCase convention for consistency
- API base URL and environment are configurable via environment variables
- Dark mode is automatically supported across all components
