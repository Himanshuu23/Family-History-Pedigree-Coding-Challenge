import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Family History Pedigree Builder</h1>
      <Link to="/questionnaire">Start Questionnaire</Link>
    </div>
  );
};

export default HomePage;