# Srujan Events - Event Management Website

A comprehensive, modern event management website built with React.js and Node.js, featuring a beautiful responsive design, admin panel, and complete event management functionality.

## 🌟 Features

### Frontend Features
- **Modern Responsive Design** - Works perfectly on all devices
- **Horizontal Scrolling Carousel** - Stunning hero section with event images
- **Interactive Gallery** - Filterable gallery with modal view
- **Contact Form** - Comprehensive form with email/SMS integration
- **Testimonials Carousel** - Client reviews with smooth animations
- **Blog Section** - Event-related posts and updates
- **Google Maps Integration** - Office location display
- **Smooth Animations** - Framer Motion powered animations
- **3D Visual Effects** - Subtle 3D transforms and hover effects

### Backend Features
- **RESTful API** - Complete API for all functionality
- **Admin Authentication** - Secure JWT-based admin login
- **Contact Management** - Handle and track client inquiries
- **Gallery Management** - Upload and manage event images
- **Blog Management** - Create and publish blog posts
- **Email Notifications** - Automated email responses
- **File Upload** - Secure image upload functionality

### Services Offered
- Corporate Events
- Pre-Weddings
- Destination Weddings
- Ring Ceremonies
- Baby Showers
- Birthdays
- Sports Events
- Cultural Events

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd srujan-events
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration:
   - Email credentials for contact form
   - JWT secret for admin authentication
   - Other API keys as needed

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Start the backend server** (in a separate terminal)
   ```bash
   npm run server
   ```

The website will be available at `http://localhost:5173`
The API server will run on `http://localhost:5000`

## 🔧 Configuration

### Email Setup
To enable contact form email notifications:

1. Use Gmail with App Password:
   - Enable 2-factor authentication
   - Generate an App Password
   - Use your Gmail and App Password in `.env`

2. Or configure with your preferred email service in `server/index.js`

### Admin Panel Access
- **URL**: `/admin`
- **Username**: `admin`
- **Password**: `srujan2024`

## 📁 Project Structure

```
srujan-events/
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Gallery.jsx
│   │   ├── Testimonials.jsx
│   │   ├── Blog.jsx
│   │   └── Contact.jsx
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   └── AdminPanel.jsx
│   ├── App.jsx             # Main app component
│   ├── App.css             # Global styles
│   └── main.jsx            # App entry point
├── server/
│   └── index.js            # Express server
├── public/                 # Static assets
├── uploads/               # Uploaded images (created automatically)
├── package.json
├── .env.example
└── README.md
```

## 🎨 Design System

### Colors
- **Primary Blue**: #1e40af
- **Secondary Blue**: #3b82f6
- **Accent Orange**: #f97316
- **Gold**: #fbbf24
- **Success**: #10b981
- **Warning**: #f59e0b
- **Error**: #ef4444

### Typography
- **Font Family**: Inter, system fonts
- **Headings**: 700 weight, 120% line height
- **Body**: 400 weight, 150% line height

### Spacing
- **Base Unit**: 8px
- **Consistent 8px grid system**

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- File upload validation
- Input sanitization
- CORS protection
- Rate limiting ready

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## 🚀 Deployment

### Frontend Deployment
The frontend can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

Build command: `npm run build`

### Backend Deployment
The backend can be deployed to:
- Heroku
- Railway
- DigitalOcean
- AWS
- Any Node.js hosting service

## 🔧 API Endpoints

### Public Endpoints
- `GET /api/health` - Health check
- `POST /api/contact` - Submit contact form
- `GET /api/gallery` - Get gallery images
- `GET /api/blog` - Get published blog posts
- `GET /api/testimonials` - Get approved testimonials

### Admin Endpoints (Require Authentication)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/contacts` - Get all contacts
- `PUT /api/admin/contacts/:id` - Update contact status
- `POST /api/admin/gallery` - Upload gallery image
- `POST /api/admin/blog` - Create blog post
- `POST /api/admin/testimonials` - Add testimonial
- `GET /api/admin/stats` - Get dashboard statistics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support or questions:
- Email: info@srujanevents.com
- Phone: +91 9876543210

## 🙏 Acknowledgments

- **Pexels** for high-quality stock images
- **Lucide React** for beautiful icons
- **Framer Motion** for smooth animations
- **React Router** for navigation
- **Express.js** for backend framework

---

**Srujan Events** - Creating Extraordinary Moments Since 2010 ✨