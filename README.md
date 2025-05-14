# React Blog Application

A modern, responsive blog application built with React that allows users to create, read, update, and delete blog posts. All posts are stored locally in the browser's localStorage.

## Features

- 📝 Create new blog posts with title, author, and content
- 📖 View all posts with search functionality
- 🔄 Edit existing posts
- 🗑️ Delete posts with confirmation
- 📱 Responsive design for all devices
- 💾 Persistent storage using localStorage
- 🔍 Search posts by title or author
- 📄 Detailed view for individual posts

## Technology Stack

- React 19.0.0
- React Router DOM 7.6.0
- Vite 6.3.1
- Font Awesome 4.7.0
- Modern CSS with responsive design

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── BlogDetail.jsx   # Individual post view
│   ├── BlogForm.jsx     # Form for create/edit
│   ├── BlogList.jsx     # List of all posts
│   ├── Modal.jsx        # Confirmation dialogs
│   └── Navbar.jsx       # Navigation component
├── pages/              # Route pages
│   ├── BlogHome.jsx    # Home page
│   ├── CreatePost.jsx  # Create post page
│   └── EditPost.jsx    # Edit post page
├── styles/             # CSS modules
└── App.jsx            # Main application
```

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```
4. Open your browser and navigate to the local server address shown in the terminal

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Features in Detail

### Blog Posts
- Create posts with title, author, and content
- View all posts in a responsive grid
- Click "Read More" to view full post
- Edit or delete posts from the list view

### Search Functionality
- Real-time search through posts
- Search by title or author
- Instantly filters results as you type

### Responsive Design
- Mobile-first approach
- Adapts to different screen sizes
- Optimized navigation for mobile devices

### Data Persistence
- All posts stored in localStorage
- Data persists across page refreshes
- No backend required

## License

This project is licensed under the MIT License.