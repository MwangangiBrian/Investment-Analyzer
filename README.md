# Investment Analyzer

A modern full-stack application for analyzing investments, tracking portfolios, and visualizing financial data.


## Features

- User authentication and authorization
- Investment portfolio tracking
- Financial data visualization with interactive charts
- Real-time market data analysis
- Responsive and modern UI design
- Database-backed persistence
- RESTful API architecture

## Tech Stack

### Backend
- Node.js with Express
- TypeScript
- Prisma ORM with PostgreSQL
- JWT Authentication
- Express Validator

### Frontend
- React with TypeScript
- Vite build tool
- Material UI & Radix UI components
- ApexCharts for data visualization
- React Query for state management
- Framer Motion for animations
- Tailwind CSS for styling


## Prerequisites

- Node.js (v16 or higher)
- pnpm package manager
- PostgreSQL database
- Modern web browser

## Project Structure

```
Investment-Analyzer/
├── apps/
│   ├── backend/
│   │   ├── src/
│   │   ├── prisma/
│   │   └── package.json
│   └── frontend/
│       ├── src/
│       ├── public/
│       └── package.json
└── README.md
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MwangangiBrian/Investment-Analyzer.git
   cd Investment-Analyzer
   ```

2. Install dependencies for both backend and frontend:
   ```bash
   # Install backend dependencies
   cd apps/backend
   pnpm install

   # Install frontend dependencies
   cd ../frontend
   pnpm install
   ```

3. Set up environment variables:
   * Create `.env` file in the backend directory
   * Create `.env` file in the frontend directory
   * Add necessary environment variables (database connection, API keys, etc.)

4. Set up the database:
   ```bash
   cd ../backend
   pnpm migrate
   ```

## Development

1. Start the backend server:
   ```bash
   cd apps/backend
   pnpm dev
   ```

2. Start the frontend development server:
   ```bash
   cd apps/frontend
   pnpm dev
   ```

The application will be available at `http://localhost:5173`

## Building for Production

1. Build the frontend:
   ```bash
   cd apps/frontend
   pnpm build
   ```

2. Build the backend:
   ```bash
   cd apps/backend
   pnpm build
   ```

## Testing

Run tests for the backend:
```bash
cd apps/backend
pnpm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

Brian Mwangi - @MwangangiBrian

Project Link: https://github.com/MwangangiBrian/Investment-Analyzer
