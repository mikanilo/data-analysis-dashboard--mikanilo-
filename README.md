
# Plug-N-Learn: Data Insight Engine

A comprehensive data analysis and visualization platform built with React, TypeScript, and modern web technologies. This project is designed as a 10-week educational journey for beginner to intermediate students.

## 🎯 Project Overview

Plug-N-Learn allows users to upload CSV datasets and instantly discover insights through interactive charts, automated analysis, and AI-powered conversations about their data.

## 🛠 Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Charts**: Recharts
- **Data Handling**: Custom utilities for CSV parsing and analysis
- **AI Integration**: Placeholder for OpenAI/Anthropic API integration (Week 7-8)

## 📚 Two Learning Paths

### Core Path (Beginner to Intermediate)
Basic web development concepts with essential features

### Advanced Path (Intermediate to Advanced)
Everything in Core Path + advanced topics like API validation, security, testing, and deployment

## 🗓 Weekly Breakdown

### Week 1: Project Foundation
**Core Path:**
- [ ] Set up development environment (Node.js, npm/yarn)
- [ ] Clone and run the project locally
- [ ] Understand project structure and file organization
- [ ] Basic React concepts review
- [ ] **TODO**: Complete setup in `src/main.tsx`

**Advanced Path (Additional):**
- [ ] Configure custom domain and deployment pipeline
- [ ] Set up comprehensive app scaffolding
- [ ] Understand build tools and bundling process

### Week 2: API Development
**Core Path:**
- [ ] Understand data flow in the application
- [ ] Work with CSV parsing utilities
- [ ] Basic HTTP concepts and data fetching
- [ ] **TODO**: Enhance data parsing in `src/utils/dataAnalysis.ts`

**Advanced Path (Additional):**
- [ ] Implement API routes with proper schema validation
- [ ] Add request/response validation using Zod
- [ ] Error handling and status codes

### Week 3: Layout and Navigation
**Core Path:**
- [ ] Component composition and props
- [ ] React Router setup and navigation
- [ ] Responsive design with Tailwind CSS
- [ ] **TODO**: Enhance navigation in `src/components/Dashboard.tsx`

**Advanced Path (Additional):**
- [ ] Implement secured routes with authentication
- [ ] Advanced error handling and user feedback
- [ ] Route guards and protected pages

### Week 4: Data Display
**Core Path:**
- [ ] Dynamic data rendering with React
- [ ] Table components and data tables
- [ ] Conditional rendering based on data
- [ ] **TODO**: Enhance data display in `src/components/DataTable.tsx`

**Advanced Path (Additional):**
- [ ] Advanced data transformation and processing
- [ ] Real-time data updates and streaming
- [ ] Performance optimization for large datasets

### Week 5: User Interaction
**Core Path:**
- [ ] Form handling and user input
- [ ] File upload functionality
- [ ] State management with useState and useEffect
- [ ] **TODO**: Enhance user interactions in `src/components/DataUpload.tsx`

**Advanced Path (Additional):**
- [ ] Implement async processing with Web Workers
- [ ] Advanced state management patterns
- [ ] Optimistic updates and loading states

### Week 6: Data Visualization
**Core Path:**
- [ ] Chart integration with Recharts
- [ ] Different chart types (bar, line, pie)
- [ ] Dynamic chart generation based on data
- [ ] **TODO**: Add more chart types in `src/components/ChartSection.tsx`

**Advanced Path (Additional):**
- [ ] Advanced chart customization and interactions
- [ ] Data export and sharing features
- [ ] Custom visualization components

### Week 7: AI Integration & Insights
**Core Path:**
- [ ] Basic AI concepts and API integration
- [ ] Chat interface for data questions
- [ ] Automated insight generation
- [ ] **TODO**: Implement AI responses in `src/components/ChatInterface.tsx`

**Advanced Path (Additional):**
- [ ] Connect to third-party AI services (OpenAI, Anthropic)
- [ ] Advanced prompt engineering
- [ ] Context-aware AI responses

### Week 8: Enhanced Features
**Core Path:**
- [ ] Polish UI/UX and accessibility
- [ ] Error handling and user feedback
- [ ] Data export functionality
- [ ] **TODO**: Add export features in `src/components/Dashboard.tsx`

**Advanced Path (Additional):**
- [ ] Comprehensive testing suite (unit, integration)
- [ ] Performance monitoring and analytics
- [ ] Advanced error tracking

### Week 9: Testing & Polish
**Core Path:**
- [ ] Manual testing and bug fixes
- [ ] UI polish and final touches
- [ ] Performance optimization
- [ ] Documentation updates

**Advanced Path (Additional):**
- [ ] Automated testing pipeline
- [ ] Code coverage and quality metrics
- [ ] Advanced performance optimization

### Week 10: Deployment & Demo
**Core Path:**
- [ ] Prepare demo presentation
- [ ] Deploy to hosting platform
- [ ] Create demo video/presentation
- [ ] Submit final project

**Advanced Path (Additional):**
- [ ] Production deployment with CI/CD
- [ ] Monitoring and observability setup
- [ ] Performance benchmarking

## 🤖 AI Integration Details

The project includes a chat interface (`src/components/ChatInterface.tsx`) that currently shows a placeholder response. Students will implement actual AI integration in weeks 7-8:

### For Students:
1. **Week 7**: Set up API integration with OpenAI or Anthropic
2. **Week 8**: Implement context-aware responses using the uploaded data
3. **Advanced**: Add prompt engineering and conversation memory

### Current AI Features:
- ✅ Chat interface UI
- ✅ Message history management
- ⏳ AI API integration (students implement)
- ⏳ Data-aware responses (students implement)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Basic knowledge of React and TypeScript

### Installation
```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd plug-n-learn

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (shadcn/ui)
│   ├── ChatInterface.tsx    # AI chat component
│   ├── ChartSection.tsx     # Data visualization
│   ├── Dashboard.tsx        # Main dashboard
│   └── ...
├── pages/              # Page components
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── hooks/              # Custom React hooks
```

## 🎓 Learning Objectives

By the end of this project, students will understand:
- Modern React development with TypeScript
- Component-based architecture
- Data visualization and analysis
- API integration and async programming
- UI/UX design principles
- Testing and deployment strategies (Advanced path)

## 🔧 Technologies Deep Dive

### Frontend Stack
- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type safety and better developer experience
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality component library

### Data & Visualization
- **Recharts**: Powerful charting library for React
- **Custom CSV Parser**: Handle various data formats
- **Data Analysis Utils**: Statistical calculations and insights

### Future Enhancements (Student Implementation)
- **AI Integration**: OpenAI/Anthropic for intelligent data analysis
- **Backend**: Supabase for authentication and data storage
- **Advanced Charts**: Custom visualizations and interactions

## 📝 Weekly Assignments

Each week includes:
- **Concept Review**: Key topics and terminology
- **Hands-on Coding**: Practical implementation tasks
- **Code Review**: Peer review and feedback
- **Mini-Project**: Weekly deliverable

## 🎯 Final Project Requirements

### Core Path Deliverables:
1. Fully functional data upload and visualization
2. Interactive charts and data tables
3. Basic AI chat interface
4. Deployed application with demo

### Advanced Path Deliverables:
1. Everything from Core Path
2. API validation and security
3. Comprehensive testing suite
4. Production deployment with monitoring

## 🤝 Contributing

Students should:
1. Fork the repository
2. Create feature branches for weekly assignments
3. Submit pull requests for code review
4. Document their learning journey

## 📞 Support

- **Office Hours**: [Schedule TBD]
- **Discussion Forum**: [Link TBD]
- **Code Review**: Weekly sessions

## 📄 License

This project is for educational purposes. See LICENSE file for details.

---

**Happy Coding!** 🚀

Remember: The goal is not just to complete the project, but to understand the underlying concepts and build confidence in modern web development.
