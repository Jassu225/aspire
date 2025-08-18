# Aspire - Banking App

A Vue.js 3 + Quasar banking application with card management features and mock backend.

**Live Demo:** [https://aspire-play.web.app/cards](https://aspire-play.web.app/cards)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build as SPA for production
npm run build

# Serve prod build via localhost (build required)
npm run serve
```

## Project Structure

```
<aspire>
├── public/icons/              # Icons to be served from back-end
└── src/
    ├── assets/icons           # Icons imported within code directly
    ├── pages/cards/           # Card management pages
    ├── components/            # Reusable UI components
    ├── stores/                # Pinia state management
    ├── services/              # API and business logic
    │   ├── api/               # API endpoints and HTTP calls
    │   ├── mock-backend/      # Business logic and card generation
    │   └── mockery/           # Intercepts api calls to return mock responses
    │   └── mock-db/           # Mock db using IndexedDB
    │       └── migrations/    # Migrations for IndexedDB
    ├── types/                 # TypeScript definitions
    │   ├── api/               # API request/response types
    │   ├── db/                # Database model types
    │   └── ui/                # UI model and component types
    └── utils/                 # Helper functions
```

## Tech Stack

- **Frontend**: Vue 3 + Quasar Framework
- **State**: Pinia
- **Styling**: Tailwind CSS + SCSS
- **Build**: Vite + TypeScript
- **Database**: IndexedDB (browser)

## Main Features

### Card Management

- Display cards in interactive carousel
- Show/hide card details (number, CVV, expiry)
- Support for VISA, Mastercard, RuPay networks
- Card actions: freeze, replace, add to GPay

### Transaction History

- View recent transactions with merchant details
- Transaction are sorted in reverse chronological order
- Expandable transaction sections

### Mockery System

- **Mockery**: Intercepts API calls for development by monkey patching fetch API
- **IndexedDB**: Local database for cards, transactions, actions
- **Fake Data**: Pre-populated realistic banking data
- **Card Generator**:
  - Creates valid card numbers using Luhn algorithm
  - Uses real bin numbers of Axis bank

### Database

- **DB Class**: Manages IndexedDB operations
- **Collections**: CARDS, TRANSACTIONS, CARD_ACTIONS
- **Auto-seeding**: Populates database with sample data on first run
- **CRUD Operations**: Add, retrieve, and query data (index-based)
- **Migration Operations**: Migration classes for modifying schema and data in client browsers.

The app runs entirely in the browser and no external backend is required.

> NOTE: In case you encounter any problems, please clear the site data and try again.
