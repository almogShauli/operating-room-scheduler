# Bounce Assignment

Fastify application with modular structure.

## Structure

```
bounceAssigment/
├── src/
│   ├── app.js          # Main Fastify app setup
│   ├── index.js        # Entry point
│   ├── config/         # Configuration files
│   ├── routes/         # Route handlers
│   └── plugins/        # Fastify plugins
├── package.json
└── README.md
```

## Setup

1. Install dependencies:
```bash
yarn install
# or
npm install
```

2. Copy environment file:
```bash
cp .env.example .env
```

3. Start development server:
```bash
yarn dev
# or
npm run dev
```

## Usage

- API routes are prefixed with `/api`
- Health check available at `/health`

## Adding Routes

Create new route files in `src/routes/` and register them in `src/app.js` or in `src/routes/index.js`.


