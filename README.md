# Spotify Search Application

![Spotify Search App Logo](/placeholder.svg?height=200&width=200)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Dependencies](#dependencies)
- [Known Issues and Limitations](#known-issues-and-limitations)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Spotify Search Application is a web-based interface that allows users to search for tracks and artists using the Spotify API. It provides a sleek, user-friendly interface to display search results, view detailed information about tracks and artists, and offers features like pagination and a responsive design.

**Note**: This project is currently in beta and is intended for educational and non-commercial use only.

## Features

✅ Search for tracks and artists on Spotify
✅ Display search results in a visually appealing grid layout
✅ View detailed information about selected tracks or artists
✅ Pagination for search results
✅ Responsive design for various screen sizes
✅ Authentication with Spotify API
✅ Sidebar navigation (placeholder for future features)
✅ Top bar with user information (placeholder)

❌ User authentication and personalized playlists (planned for future)
❌ Music playback functionality (planned for future)
❌ Create and manage playlists (planned for future)

## Screenshots

![Search Interface](/placeholder.svg?height=300&width=500)
*Search interface with results grid*

![Artist Details](/placeholder.svg?height=300&width=500)
*Detailed view of an artist*

![Track Details](/placeholder.svg?height=300&width=500)
*Detailed view of a track*

## Tech Stack

- [React.js](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Next.js](https://nextjs.org/) - The React Framework for Production
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) - Spotify's RESTful web API

## Project Structure

\`\`\`
/
├── components/
│   ├── Advertisement.tsx
│   ├── LoginScreen.tsx
│   ├── Pagination.tsx
│   ├── SearchForm.tsx
│   ├── SearchResults.tsx
│   ├── SelectedItemDetails.tsx
│   ├── Sidebar.tsx
│   └── TopBar.tsx
├── hooks/
│   └── useSpotifyToken.ts
├── services/
│   └── spotifyApi.ts
├── types/
│   └── index.ts
├── utils/
│   └── normalizeResults.ts
├── pages/
│   └── index.tsx
├── styles/
│   └── globals.css
├── public/
│   └── (static assets)
├── App.tsx
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
\`\`\`

## Setup Instructions

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/your-username/spotify-search-app.git
   cd spotify-search-app
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables:**
   Create a \`.env.local\` file in the root directory and add your Spotify API credentials:
   \`\`\`
   SPOTIFY_CLIENT_ID=your_client_id
   SPOTIFY_CLIENT_SECRET=your_client_secret
   NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/callback/spotify
   \`\`\`

4. **Run the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open \`http://localhost:3000\` in your browser to see the application.

## Usage

1. When you first open the app, you'll be prompted to log in with your Spotify account.
2. Once logged in, use the search bar at the top to search for tracks or artists.
3. Toggle between track and artist search using the dropdown next to the search bar.
4. Click on a search result to view more details about the track or artist.
5. Use the pagination controls at the bottom to navigate through search results.

## API Documentation

This project uses the Spotify Web API. For detailed information about the API endpoints and responses, please refer to the [official Spotify Web API documentation](https://developer.spotify.com/documentation/web-api/).

Key endpoints used in this project:
- Search API: \`https://api.spotify.com/v1/search\`
- Tracks API: \`https://api.spotify.com/v1/tracks/{id}\`
- Artists API: \`https://api.spotify.com/v1/artists/{id}\`

## Dependencies

- react: ^17.0.2
- react-dom: ^17.0.2
- next: ^12.0.0
- typescript: ^4.5.2
- tailwindcss: ^2.2.19
- @types/react: ^17.0.34
- @types/node: ^16.11.6
- eslint: ^8.2.0
- eslint-config-next: ^12.0.3
- postcss: ^8.3.11
- autoprefixer: ^10.4.0

For a full list of dependencies, please refer to the \`package.json\` file.

## Known Issues and Limitations

- The application currently does not support music playback due to limitations with the Spotify API in browser environments.
- User authentication is simulated and does not persist across sessions.
- The sidebar and top bar are currently placeholders and do not have full functionality.
- The application has a rate limit imposed by the Spotify API. Excessive requests may result in temporary blocking.

## Future Improvements

- Implement full user authentication and session management
- Add more detailed artist and album pages
- Implement music playback functionality (requires Spotify Premium)
- Improve error handling and add loading states
- Add unit and integration tests
- Implement caching to reduce API calls
- Add support for creating and managing playlists
- Enhance the UI with animations and transitions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

Please ensure your code adheres to the existing style and all tests pass before submitting a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

Built with ❤️ by Juan Camilo Campillo
