# Test Case Generator WebApp

A modern TypeScript React frontend with Python FastAPI backend for generating test cases from requirements documents. Built with Capital Group color scheme and modern UI/UX practices.

## Features

- 🎨 **Modern UI**: Clean, professional interface with Capital Group color palette
- 📝 **Requirements Input**: Text area for entering requirements documents
- 🔄 **Test Case Generation**: AI-powered test case generation from requirements
- 📊 **Real-time Output**: Live display of generated test cases
- 🚀 **Fast Performance**: Optimized React frontend with Vite
- 🔧 **Extensible Backend**: FastAPI backend ready for additional functions
- 🌐 **CORS Enabled**: Full cross-origin support for local development

## Project Structure

```
webapp_template_QA_AI/
├── src/                    # React TypeScript frontend
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # React entry point
│   └── index.css          # Global styles with Capital Group colors
├── backend/               # Python FastAPI backend
│   └── main.py           # FastAPI application
├── package.json           # Frontend dependencies
├── requirements.txt       # Backend dependencies
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── README.md             # This file
```

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn

### Frontend Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Create a virtual environment (recommended):

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install Python dependencies:

```bash
pip install -r requirements.txt
```

3. Start the FastAPI server:

```bash
cd backend
python main.py
```

The backend API will be available at `http://localhost:8000`

### API Documentation

Once the backend is running, you can access:

- Interactive API docs: `http://localhost:8000/docs`
- Alternative API docs: `http://localhost:8000/redoc`
- Health check: `http://localhost:8000/health`

## Usage

1. **Start both servers** (frontend and backend)
2. **Open the webapp** at `http://localhost:3000`
3. **Enter requirements** in the left text area
4. **Click "Generate Test Cases"** button
5. **View results** in the right text area

## API Endpoints

### POST `/generate-test-cases`

Generate test cases from requirements document.

**Request Body:**

```json
{
  "requirements": "Your requirements document text here..."
}
```

**Response:**

```json
{
  "test_cases": "Generated test cases text...",
  "message": "Test cases generated successfully"
}
```

## Development

### Frontend Development

- **Build for production**: `npm run build`
- **Preview production build**: `npm run preview`
- **Type checking**: `npx tsc --noEmit`

### Backend Development

- **Run with auto-reload**: `uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000`
- **Run tests**: Add your test files and run with pytest

## Customization

### Adding New Backend Functions

1. Add new endpoints in `backend/main.py`
2. Update the frontend to call new endpoints
3. Add any new dependencies to `requirements.txt`

### Styling Changes

The app uses CSS custom properties for the Capital Group color scheme:

- `--cg-blue`: Primary blue (#003366)
- `--cg-light-blue`: Light blue (#0066cc)
- `--cg-gold`: Accent gold (#d4af37)
- `--cg-white`: White (#ffffff)

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure both frontend and backend are running
2. **Port Conflicts**: Change ports in `vite.config.ts` or `main.py`
3. **Python Dependencies**: Make sure you're in the virtual environment

### Debug Mode

- **Frontend**: Check browser console for errors
- **Backend**: Check terminal output for Python errors
- **Network**: Use browser dev tools to inspect API calls

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:

1. Check the troubleshooting section
2. Review API documentation at `/docs`
3. Create an issue in the repository
