import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tractors from './pages/Tractors';
import Inquiry from './pages/Inquiry';
import AdminDashboard from './pages/AdminDashboard';
// Import Navbar if you have one
// import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* <Navbar /> */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tractors" element={<Tractors />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
