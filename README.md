# QuickStay - Discover & Relax 

[![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=flat-square)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white&style=flat-square)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/-Express-black?logo=express&style=flat-square)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/-MongoDB-4db33d?logo=mongodb&logoColor=white&style=flat-square)](https://mongodb.com/)
[![JWT](https://img.shields.io/badge/-JWT-000000?logo=jsonwebtokens&logoColor=white&style=flat-square)](https://jwt.io/)
[![Passport.js](https://img.shields.io/badge/-Passport.js-blueviolet?logo=passport&style=flat-square)](http://passportjs.org/)

> **QuickStay is a modern vacation rental platform where users can search, book, and manage their stays with ease. Hosts can list properties, manage availability, and track bookings through an intuitive dashboard.**

Think of it like your own Airbnb clone designed from scratch with love and full-stack power 🚀

##  Features

### For Guests
- ✅ **Smart Search**: Search stays by date, price range, and amenities
- ✅ **Secure Booking**: Book properties with confidence using secure payment processing
- ✅ **User Profiles**: Manage your bookings and personal information
- ✅ **Reviews & Ratings**: Read and write reviews for properties
- ✅ **Mobile-Ready**: Fully responsive design for all devices

### For Hosts
- ✅ **Property Management**: List and manage multiple properties
- ✅ **Host Dashboard**: Comprehensive dashboard for tracking bookings and revenue
- ✅ **Calendar Management**: Manage availability and pricing
- ✅ **Booking Analytics**: Track your property performance

### Technical Features
- ✅ **RESTful API**: Clean, secure API endpoints
- ✅ **JWT Authentication**: Secure user authentication and authorization
- ✅ **Role-based Access**: Different access levels for guests and hosts
- ✅ **Cloud Integration**: Cloud-hosted database and image storage
- ✅ **Real-time Updates**: Dynamic booking status and availability updates

## 🏗️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React.js, CSS3, HTML5, JavaScript (ES6+) |
| **Backend** | Node.js, Express.js, RESTful APIs |
| **Database** | MongoDB, Mongoose ODM |
| **Authentication** | JWT, Passport.js |
| **Cloud Services** | MongoDB Atlas, Cloudinary (Images) |
| **Development** | npm, Git, VS Code |



## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yaduvanshi07/QuickStay-Discover-Relax.git
   cd QuickStay-Discover-Relax
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create environment file
   cp .env.example .env
   
   # Edit .env with your configuration
   # Add your MongoDB URI, JWT_SECRET, etc.
   
   # Start the backend server
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   
   # Start the frontend development server
   npm start
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## ⚙️ Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (optional - for notifications)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

## 📁 Project Structure

```
QuickStay-Discover-Relax/
├── frontend/                   # React.js frontend
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API calls and utilities
│   │   ├── context/          # React Context for state management
│   │   └── styles/           # CSS and styling files
│   ├── package.json
│   └── README.md
├── backend/                   # Node.js/Express backend
│   ├── controllers/          # Route handlers
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── utils/               # Utility functions
│   ├── config/              # Configuration files
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── docs/                     # Documentation
├── .gitignore
└── README.md
```

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Create new property (hosts only)
- `PUT /api/properties/:id` - Update property (hosts only)
- `DELETE /api/properties/:id` - Delete property (hosts only)

### Bookings
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking status
- `DELETE /api/bookings/:id` - Cancel booking

### Reviews
- `GET /api/reviews/property/:id` - Get reviews for property
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📦 Deployment

### Backend Deployment (Heroku)
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Git or GitHub integration

### Frontend Deployment (Netlify/Vercel)
1. Build the frontend: `npm run build`
2. Deploy the `build` folder to your preferred hosting service

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas account
2. Set up a cluster
3. Update your `MONGODB_URI` in environment variables

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature request? Please open an issue on [GitHub Issues](https://github.com/yaduvanshi07/QuickStay-Discover-Relax/issues).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Yaduvanshi07**
- GitHub: [@yaduvanshi07](https://github.com/yaduvanshi07)
- LinkedIn: [Connect with me](https://linkedin.com/in/yaduvanshi07)

## 🙏 Acknowledgments

- Inspired by Airbnb and other vacation rental platforms
- Built with modern web technologies and best practices
- Thanks to the open-source community for amazing tools and libraries

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/yaduvanshi07/QuickStay-Discover-Relax)
![GitHub contributors](https://img.shields.io/github/contributors/yaduvanshi07/QuickStay-Discover-Relax)
![GitHub stars](https://img.shields.io/github/stars/yaduvanshi07/QuickStay-Discover-Relax?style=social)
![GitHub forks](https://img.shields.io/github/forks/yaduvanshi07/QuickStay-Discover-Relax?style=social)

---

<div align="center">
  <p>Made with ❤️ by the QuickStay team</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
