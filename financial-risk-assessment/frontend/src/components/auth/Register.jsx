import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const { name, email, password, passwordConfirm } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) {
            setError('');
        }
    };

    // useEffect(() => {
    //     if (!error) return;

    //     const timer = setTimeout(() => {
    //         setError('');
    //     }, 3);
    //     // Cleanup if the component unmounts or error changes
    //     return () => clearTimeout(timer);
    // }, [error]);

    const validateForm = () => {
        if (!name.trim()) {
            setError('Please enter your full name');
            return false;
        }

        if (!email.trim()) {
            setError('Please enter your email address');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return false;
        }

        if (!password) {
            setError('Please enter a password');
            return false;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }

        if (password !== passwordConfirm) {
            setError('Passwords do not match');
            return false;
        }

        return true;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            const result = await register({
                name: name.trim(),
                email: email.trim().toLowerCase(),
                password
            });

            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.error);
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <div className="auth-image-section">
                    <div className="financial-icon">💼</div>
                    <div className="auth-image-content">
                        <h3>Smart Financial Insights</h3>
                        <p>Join thousands of professionals who trust our advanced risk assessment platform to make informed financial decisions with confidence.</p>
                    </div>
                </div>

                <div className="auth-form-container">
                    <h2>Create Your Account</h2>

                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={onSubmit} noValidate>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={onChange}
                                placeholder="Enter your full name"
                                required
                                autoComplete="name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                placeholder="Enter your email address"
                                required
                                autoComplete="email"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                placeholder="Create a secure password"
                                minLength="6"
                                required
                                autoComplete="new-password"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="passwordConfirm">Confirm Password</label>
                            <input
                                type="password"
                                id="passwordConfirm"
                                name="passwordConfirm"
                                value={passwordConfirm}
                                onChange={onChange}
                                placeholder="Confirm your password"
                                minLength="6"
                                required
                                autoComplete="new-password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        Already have an account? <Link to="/login">Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;