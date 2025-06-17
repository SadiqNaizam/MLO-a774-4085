import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import LoginForm from '../components/Login/LoginForm';

// Define the type for login form values, matching the structure inferred from LoginForm.tsx's Zod schema.
// This is included here because LoginFormValues is not explicitly exported by LoginForm.tsx.
interface LoginCredentials {
  username: string;
  password: string;
}

const IndexPage: React.FC = () => {
  const handleLoginSuccess = (data: LoginCredentials) => {
    // In a production application, this handler would typically navigate the user
    // to a dashboard or another protected area, or update global application state.
    // For this example, we'll log to the console and show a simple alert.
    console.log('Login successful. Credentials:', data);
    // Note: In a real scenario, be cautious about logging/alerting sensitive data like passwords.
    // The data object here contains what was submitted, as per LoginForm's implementation.
    alert(`Login Successful! Welcome, ${data.username}.`);

    // Example navigation if react-router-dom were in use:
    // import { useNavigate } from 'react-router-dom';
    // const navigate = useNavigate();
    // navigate('/dashboard');
  };

  return (
    <MainAppLayout>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </MainAppLayout>
  );
};

export default IndexPage;
