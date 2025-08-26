import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import './index.css';
import Landing from './pages/Landing';
import Quizzes from './pages/Quizzes';
import QuizDashboard from './Components/quiz/QuizDashboard';
import QuizTaking from './Components/quiz/QuizTaking';
import QuizHistoryPage from './pages/QuizHistoryPage';
import Dashboard from './pages/Dashboard';
import Assistant from './pages/Assistant';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './Components/auth/ProtectedRoute';
import DashboardLanding from './pages/DashboardLanding';
import EcoChallenges from './pages/EcoChallenges';
import { useAuth } from './context/AuthContext';

const App = () => {
	const { user } = useAuth();
	return (
		<>
			<Routes>
				<Route path="/" element={user ? <DashboardLanding /> : <Landing />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route
					element={
						<ProtectedRoute>
							<MainLayout />
						</ProtectedRoute>
					}
				>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/quizzes" element={<Quizzes />} />
					<Route path="/quiz/:quizId" element={<QuizTaking />} />
					<Route path="/quiz-history" element={<QuizHistoryPage />} />
					<Route path="/assistant" element={<Assistant />} />
					<Route path="/eco-challenges" element={<EcoChallenges />} />
				</Route>
			</Routes>
		</>
	);
};

export default App;
