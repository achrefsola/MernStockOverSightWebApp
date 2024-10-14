import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../styles/LogForm.css';
import { useManager } from './ManagerContext';
import Loader from '../components/Loader';

export default function LoginForm() {
    const { ManagerData, loading } = useManager();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        if (ManagerData) {
            navigate('/dashboard');
        }
    }, [ManagerData, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/manager/login', formData);

            const managerId = res.data.manager.id;

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('managerid', managerId);
            
            

            navigate('/dashboard');
            

            setFormData({ email: '', password: '' });
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Invalid Email or password');
        }
    };

    if (loading) {
        return <Loader/>
    }

    if (ManagerData) {
        return null;
    }

    return (
        <div className='bodyb'>
            <div className='container mt-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card text-white'>
                            <div className='card-body'>
                                <h2 className='card-title text-center'>Log In</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className='mb-3'>
                                        <label htmlFor='email' className='form-label'>
                                            Email
                                        </label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            id='email'
                                            placeholder='Enter your email'
                                            name='email'
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor='password' className='form-label'>
                                            Password
                                        </label>
                                        <input
                                            type='password'
                                            className='form-control'
                                            id='password'
                                            placeholder='Enter your password'
                                            name='password'
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <button type='submit' className='btn btn-primary-login'>
                                        Take Me In
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
