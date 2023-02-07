import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home/Home';
import Layout from './components/layout/Layout';
import BlogDetails from './pages/BlogDetails/BlogDetails';

function App() {
  return (
    <Router>
      <ToastContainer style={{ fontSize: '16px' }} />
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:id' element={<BlogDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
