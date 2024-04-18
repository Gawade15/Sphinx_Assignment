import React, { useState } from 'react';
import './Login.css'; // Make sure to include the styles.css file in your project

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLogged, setIsLogged] = useState(false);

    const handleLogin = () => {
        // Perform admin login logic here
        if (username === 'admin' && password === 'admin123') {
            // Redirect to admin dashboard or perform other admin-specific actions
           
            isLogged &&  setIsLogged(true);
            isLogged &&  localStorage.setItem("user", username);
            window.location.href = './home';

        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
            {error && <p>{error}</p>}
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;