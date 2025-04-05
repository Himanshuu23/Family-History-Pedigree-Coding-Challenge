import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../index.css';

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = async () => {
    if (user) {
      await logout();
    } else {
      navigate('/login');
    }
  };

  return (
    <div id="hero" className="hero-container">
      <div className="hero-background"></div>
      <div className="hero-content">
        <h1>
          Welcome to <span className="highlight">Family History</span> Pedigree Builder
        </h1>
        <p className="hero-description">
          Stream live or watch your favorite creator. <br />
          Queue in your favorite videos and let the fun begin!
        </p>
        <div className="hero-buttons">
          <Link to="/questionnaire" className="hero-button primary">
            Get Started &gt;
          </Link>
          <button className="hero-button secondary" onClick={handleAuthAction}>
            {user ? 'Logout >' : 'Login >'}
          </button>
        </div>
      </div>
      <div className="hero-image-section">
        <img src="/hero.jpeg" alt="Hero Visual" className="hero-image" />
      </div>
    </div>
  );
};

export default Home;
