import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/register.css';

function Register() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            await register(formData);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Failed to register. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <nav className="nav-bar">
                <Link to="/" className="nav-link">← Back Home</Link>
            </nav>
            
            <div className="register-box">
                <h2 className="register-title">Create Account</h2>

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

                <form onSubmit={handleSubmit}>
                    <div className="reg-group">
                        <label htmlFor="fullName">Full Name <span className="required">*</span></label>
                        <input 
                            type="text" 
                            id="fullName" 
                            name="fullName"
                            className="input-field" 
                            value={formData.fullName}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <div className="reg-group">
                        <label htmlFor="email">Email <span className="required">*</span></label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email"
                            className="input-field" 
                            value={formData.email}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <div className="reg-group">
                        <label htmlFor="password">Password <span className="required">*</span></label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password"
                            className="input-field" 
                            value={formData.password}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <div className="reg-group">
                        <label htmlFor="confirmPassword">Confirm Password <span className="required">*</span></label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            name="confirmPassword"
                            className="input-field" 
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <div>
                        <button type="submit" className="register-btn" disabled={loading}>
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </div>
                </form>

                <p className="login-link">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;

