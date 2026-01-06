import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login({ email, password });
            navigate('/');
        } catch (err) {
            setError(err.message || 'Failed to login. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">

            
            <div className="login-box">
                <h2 className="login-title">Sign in</h2>

                {error && (
                    <div style={{ 
                        background: '#fee', 
                        color: '#c33', 
                        padding: '10px', 
                        borderRadius: '5px', 
                        marginBottom: '15px' 
                    }}>
                        {error}
                    </div>
                )}

                <button className="google-signin" disabled>
                    Sign in with Google
                </button>

                <p className="or-separator">or</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email <span className="required">*</span></label>
                        <input 
                            type="email" 
                            id="email" 
                            className="input-field" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password <span className="required">*</span></label>
                        <input 
                            type="password" 
                            id="password" 
                            className="input-field" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>

                    <div className="options">
                        <div className="remember-me">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <a href="#forgot" className="forgot-password">Forgot Password?</a>
                    </div>

                    <button type="submit" className="signin-btn" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                <p className="signup-link">
                    Don't have an account? <Link to="/register">Create one</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;

