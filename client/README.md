# Subscription Manager

A modern subscription management application built with React and Vite for tracking and managing recurring payments efficiently.

## Features

- Manage multiple subscriptions with custom categories
- Track billing cycles and renewal dates with notifications
- Monitor spending and analytics with visual dashboards
- Clean, responsive UI optimized for desktop and mobile
- Export subscription data to CSV
- Budget alerts and spending forecasts

## Tech Stack

- **React 18+** - UI framework with hooks
- **Vite** - Build tool with HMR for fast development
- **ESLint** - Code quality and consistency
- **CSS Modules** - Scoped styling

## Getting Started

### Prerequisites
- Node.js 16+ (18+ recommended)
- npm 8+ or yarn 3+
- Git

### Installation

```bash
git clone <repository-url>
cd subscription_manager
npm install
```

### Development

```bash
npm run dev
```
Runs the app in development mode at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── hooks/          # Custom React hooks
├── context/        # Context API setup
├── styles/         # Global styles
└── App.jsx         # Main app component
```

## Available Plugins

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) - Uses Oxc parser
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) - Uses SWC compiler

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

Issues and enhancement requests are welcome.

## License

MIT - See LICENSE file for details
