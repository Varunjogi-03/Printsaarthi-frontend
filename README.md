# PrintSarthi Frontend

A modern React application for PrintSarthi - a print order management system.

## Features

- **User Authentication**: Complete login/signup system for customers and shopkeepers
- **Account Management**: User profile and account settings
- **Responsive Design**: Modern UI with Tailwind CSS and DaisyUI
- **Real-time Updates**: Socket.IO integration for live updates

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or cloud instance)
- Backend server running on port 5000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Authentication System

### User Types

- **Customer**: Regular users who can place print orders
- **Shopkeeper**: Business owners who can receive and fulfill orders

### Features

- **Sign Up**: Create new customer or shopkeeper accounts
- **Login**: Authenticate with email and password
- **Account Page**: View profile information and manage account
- **Logout**: Secure logout with token removal

### API Endpoints

The frontend communicates with the backend API at `http://localhost:5000/api`:

- `POST /api/auth/register/user` - Customer registration
- `POST /api/auth/register/shopkeeper` - Shopkeeper registration
- `POST /api/auth/login/user` - Customer login
- `POST /api/auth/login/shopkeeper` - Shopkeeper login
- `POST /api/auth/verify-token` - Token verification

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── NavBar.jsx      # Navigation with auth state
│   ├── Hero.jsx        # Landing page hero section
│   ├── Features.jsx    # Features showcase
│   ├── HowItWorks.jsx  # How it works section
│   ├── CallToAction.jsx # CTA section
│   └── SiteFooter.jsx  # Footer component
├── pages/              # Page components
│   ├── Login.jsx       # Login page
│   ├── Signup.jsx      # Signup page
│   └── Account.jsx     # User account page
├── context/            # React context providers
│   └── AuthContext.jsx # Authentication state management
├── App.jsx             # Main app component
└── main.jsx            # App entry point
```

## Usage

### For Customers

1. **Sign Up**: Visit `/signup` and select "Customer"
2. **Login**: Use your email and password at `/login`
3. **Account**: View your profile at `/account`

### For Shopkeepers

1. **Sign Up**: Visit `/signup` and select "Shopkeeper"
2. **Login**: Use your email and password at `/login`
3. **Account**: View your profile and approval status at `/account`

## Development

### Adding New Features

1. Create new components in `src/components/`
2. Add new pages in `src/pages/`
3. Update routing in `src/main.jsx`
4. Add API calls in `src/context/AuthContext.jsx` if needed

### Styling

The project uses:
- **Tailwind CSS** for utility-first styling
- **DaisyUI** for pre-built components
- **Custom CSS** in `src/index.css`

## Troubleshooting

### Common Issues

1. **Backend Connection Error**: Ensure the backend server is running on port 5000
2. **MongoDB Connection**: Make sure MongoDB is running and accessible
3. **CORS Issues**: Check that the backend CORS configuration matches the frontend URL

### Environment Variables

Create a `.env` file in the backend directory with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/printsarthi
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:5173
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
