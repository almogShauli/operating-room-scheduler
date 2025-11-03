# Operating Room Scheduler

A TypeScript-based web service for scheduling operating room surgeries with load balancing and queue management.

## Features

- **Room Scheduling**: Automatically schedules surgeries in available OR rooms
- **Load Balancing**: Uses Round-Robin algorithm to distribute workload across rooms
- **Queue Management**: In-memory FIFO queue for requests when all rooms are full
- **Doctor Types**: Supports Heart Surgeons and Brain Surgeons with different duration requirements
- **Equipment Matching**: Automatically matches doctors with compatible rooms based on equipment needs

## Quick Start

1. **Install dependencies:**
```bash
yarn install
# or
npm install
```

2. **Start the server:**
```bash
yarn dev
# or
npm run dev
```

That's it! The server will start on `http://localhost:3000` with default settings.

## Environment Variables (Optional)

You can optionally configure the server using environment variables:

```bash
PORT=3000          # Server port (default: 3000)
HOST=0.0.0.0      # Server host (default: 0.0.0.0)
LOG_LEVEL=info    # Logging level (default: info)
```

**Note**: No `.env` file is required - the application works with default values!

## API Usage

### Request Surgery

```bash
POST /api/surgery/request
Content-Type: application/json

{
  "doctorType": "heart_surgeon"  # or "brain_surgeon"
}
```

**Success Response** (Room available):
```json
{
  "orId": 1,
  "scheduledTime": "2024-11-03T14:00:00.000Z"
}
```

**Queue Response** (All rooms full):
```json
{
  "queuePosition": 2
}
```

### Health Check

```bash
GET /health
```

## Architecture

- **TypeScript**: Full type safety
- **Fastify**: High-performance web framework
- **In-Memory Storage**: Fast, no database required
- **Modular Design**: Clean separation of concerns

## Project Structure

```
src/
├── types/          # TypeScript types and interfaces
├── services/       # Business logic
│   ├── scheduler.ts      # Main scheduling logic
│   ├── orRooms.ts        # Room management
│   ├── queue.ts          # Queue management
│   └── ...
├── routes/         # API endpoints
├── config/         # Configuration
└── index.ts        # Entry point
```
