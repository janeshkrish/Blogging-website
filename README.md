# BlogApp - Full-Stack Blogging Platform

A modern, feature-rich blogging platform built with Node.js, Express, MongoDB, and React. This application provides a complete blogging experience with user authentication, real-time notifications, social features, and a beautiful, responsive interface.

## 🚀 Features

### User Authentication & Profiles
- **Secure Registration & Login** with JWT-based authentication
- **Password Hashing** using bcrypt for security
- **User Profiles** with customizable bio, profile pictures, and stats
- **Profile Management** with real-time updates

### Post Management
- **Rich Post Creation** with title, content, tags, and featured images
- **Draft & Published States** for flexible content management
- **Post Editing & Deletion** with proper authorization
- **Markdown-like Formatting** support in post content
- **Image Support** with URL-based featured images
- **Search & Filtering** by keywords, tags, and authors
- **Pagination** for optimal performance

### Social Features
- **Follow System** - Follow/unfollow other users
- **Like System** - Like/unlike posts with real-time updates
- **Comment System** - Nested comments and replies
- **Real-time Notifications** via Socket.IO for follows, likes, and comments
- **User Discovery** with suggested users to follow

### Advanced Features
- **Real-time Updates** using Socket.IO
- **Trending Tags** and topic discovery
- **User Statistics** and activity tracking
- **Responsive Design** that works on all devices
- **SEO-friendly URLs** with post slugs
- **Reading Time Estimation** for posts
- **View Tracking** for post analytics

### Admin Features
- **Admin Role** for system management
- **Content Moderation** capabilities
- **Database Seeding** with sample data
- **System Reset** functionality

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **Socket.IO** - Real-time communication
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Express Validator** - Input validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API protection

### Frontend
- **React** - UI library (JavaScript/JSX)
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Socket.IO Client** - Real-time updates
- **CSS3** - Modern styling with animations
- **Responsive Design** - Mobile-first approach

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd blog-app
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Environment Configuration
Create a `.env` file in the `server` directory:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/blogapp
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:3000
```

### 4. Database Setup
```bash
# Start MongoDB (if running locally)
mongod

# Seed the database with sample data
cd server
npm run seed
```

### 5. Start the Application
```bash
# From the root directory, start both server and client
npm run dev

# Or start them separately:
# Terminal 1 - Start server
cd server
npm run dev

# Terminal 2 - Start client
cd client
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🎯 Usage

### Demo Accounts
The seeded database includes these demo accounts:

- **Admin**: admin@blog.com / admin123
- **User 1**: john@example.com / password123
- **User 2**: jane@example.com / password123
- **User 3**: mike@example.com / password123

### Key Features to Try

1. **Register/Login** - Create your account or use demo credentials
2. **Write Posts** - Create posts with rich content and tags
3. **Explore Content** - Browse posts, search by keywords or tags
4. **Social Interaction** - Follow users, like posts, leave comments
5. **Real-time Notifications** - Get instant updates for interactions
6. **Profile Management** - Customize your profile and view statistics

## 🏗 Project Structure

```
blog-app/
├── server/                 # Backend application
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── scripts/           # Database scripts
│   └── app.js            # Server entry point
├── client/                # Frontend application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   └── App.js        # Main app component
│   └── public/           # Static assets
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Posts
- `GET /api/posts` - Get all posts (with pagination/filtering)
- `POST /api/posts` - Create new post
- `GET /api/posts/:slug` - Get single post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like/unlike post

### Users
- `GET /api/users/:username` - Get user profile
- `GET /api/users/:username/posts` - Get user's posts
- `GET /api/users/suggestions/follow` - Get suggested users

### Comments
- `GET /api/comments/post/:postId` - Get post comments
- `POST /api/comments` - Create comment
- `PUT /api/comments/:id` - Update comment
- `DELETE /api/comments/:id` - Delete comment

### Follow System
- `POST /api/follow/:userId` - Follow/unfollow user
- `GET /api/follow/:userId/followers` - Get followers
- `GET /api/follow/:userId/following` - Get following

### Notifications
- `GET /api/notifications` - Get user notifications
- `PATCH /api/notifications/:id/read` - Mark as read
- `PATCH /api/notifications/mark-all-read` - Mark all as read

## 🎨 Design Features

- **Modern UI/UX** with clean, professional design
- **Responsive Layout** that works on all screen sizes
- **Smooth Animations** and micro-interactions
- **Gradient Backgrounds** and modern color schemes
- **Card-based Layout** for better content organization
- **Loading States** and skeleton screens
- **Toast Notifications** for user feedback
- **Hover Effects** and interactive elements

## 🔒 Security Features

- **JWT Authentication** with secure token handling
- **Password Hashing** using bcrypt with salt rounds
- **Input Validation** on both client and server
- **Rate Limiting** to prevent abuse
- **CORS Configuration** for secure cross-origin requests
- **Helmet.js** for security headers
- **XSS Protection** through input sanitization

## 📱 Real-time Features

- **Live Notifications** for user interactions
- **Real-time Like Updates** across all clients
- **Instant Comment Updates** without page refresh
- **Follow Status Updates** in real-time
- **Socket.IO Integration** for seamless real-time experience

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGO_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
CLIENT_URL=your-production-frontend-url
```

### Build for Production
```bash
# Build the client
cd client
npm run build

# The built files will be in client/build/
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **React** team for the amazing frontend library
- **Express.js** for the robust backend framework
- **MongoDB** for the flexible database solution
- **Socket.IO** for real-time communication
- **Pexels** for providing free stock images
- All the open-source contributors who made this project possible

## 📞 Support

If you encounter any issues or have questions:

1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Provide steps to reproduce any bugs
4. Include your environment details (Node.js version, OS, etc.)

---

**Happy Blogging! 📝✨**