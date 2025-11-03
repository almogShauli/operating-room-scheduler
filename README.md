# Operating Room Scheduler
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
  "doctorType": "heart_surgeon" or "brain_surgeon"
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
