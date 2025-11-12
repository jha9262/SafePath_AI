# 🛡️ SafePath AI

**Find the safest route, not just the fastest one.**

SafePath AI is a smart navigation app that prioritizes your safety over speed. Instead of just showing you the quickest way to get somewhere, it analyzes danger zones, crime data, and road conditions to suggest the safest possible route.

## 🌟 What makes it special?

- **AI-powered safety analysis** - Real-time danger zone detection
- **Community-driven reports** - Users can report potholes, accidents, and unsafe areas
- **Smart route calculation** - Balances safety with efficiency
- **Beautiful, modern interface** - Clean design that's easy to use
- **Real-time updates** - Get the latest safety information

## 🚀 Quick Start

### What you'll need
- Java 17 or newer
- Node.js 16 or newer
- PostgreSQL database
- A code editor (VS Code recommended)

### Setting up the backend

1. **Clone this project**
   ```bash
   git clone <your-repo-url>
   cd SafePath_AI
   ```

2. **Set up your database**
   - Install PostgreSQL
   - Create a new database called `safepath_ai`
   - Copy `src/main/resources/application.yml.example` to `application.yml`
   - Update the database username and password in the new file

3. **Run the backend**
   ```bash
   mvn spring-boot:run
   ```
   The API will start at `http://localhost:8080`

### Setting up the frontend

1. **Navigate to frontend folder**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment (optional)**
   - Copy `.env.example` to `.env`
   - Add your Google Maps API key if you have one

4. **Start the app**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser

## 🎯 How to use it

1. **Sign up** - Create your account
2. **Plan a route** - Enter where you're going
3. **Get safe directions** - See the safest path highlighted
4. **Report dangers** - Help others by reporting unsafe areas
5. **Stay safe** - Follow the recommended route

## 🛠️ What's inside?

### Backend (Spring Boot)
- **User management** - Registration, login, profiles
- **Route calculation** - Smart algorithms for safe paths
- **Danger zone tracking** - Store and analyze reported hazards
- **API endpoints** - Clean REST API for the frontend

### Frontend (React)
- **Interactive maps** - Click and explore
- **Route planning** - Easy-to-use interface
- **Responsive design** - Works on phone, tablet, and desktop
- **Real-time updates** - See changes instantly

## 📱 Features

✅ **User Authentication** - Secure login system  
✅ **Interactive Maps** - Click to select locations  
✅ **Route Planning** - Enter start and end points  
✅ **Danger Reporting** - Mark unsafe areas  
✅ **Safety Scoring** - Routes rated by safety level  
✅ **Mobile Friendly** - Works great on phones  
✅ **Real-time Data** - Always up-to-date information  

## 🔧 For developers

### Project structure
```
SafePath_AI/
├── src/main/java/          # Backend code (Spring Boot)
├── frontend/src/           # Frontend code (React)
├── database_schema.sql     # Database setup
└── README.md              # You are here!
```

### API endpoints
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Sign in
- `POST /api/danger-zones/report` - Report a danger
- `GET /api/danger-zones/radius` - Get nearby dangers
- `POST /api/routes/safe-route` - Calculate safe route

### Tech stack
- **Backend:** Java 17, Spring Boot, PostgreSQL, JWT
- **Frontend:** React 18, Tailwind CSS, Framer Motion
- **Maps:** Google Maps API (optional)

## 🤝 Contributing

Want to help make SafePath AI better? Here's how:

1. **Fork the project**
2. **Create a feature branch** (`git checkout -b amazing-feature`)
3. **Make your changes**
4. **Test everything works**
5. **Commit your changes** (`git commit -m 'Add amazing feature'`)
6. **Push to your branch** (`git push origin amazing-feature`)
7. **Open a Pull Request**

## 📝 License

This project is open source and available under the MIT License.

## 🆘 Need help?

- **Issues?** Open a GitHub issue
- **Questions?** Check the code comments
- **Ideas?** We'd love to hear them!

## 🎉 What's next?

- [ ] Real Google Maps integration
- [ ] Machine learning for better safety predictions
- [ ] Mobile app versions
- [ ] Integration with city traffic data
- [ ] Voice navigation
- [ ] Offline mode

---

**Built with ❤️ for safer journeys**

*Remember: Your safety is worth more than saving a few minutes!*