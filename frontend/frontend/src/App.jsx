import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [username, setUsername] = useState('');
    const [mobileno, setMobileno] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    const register = async () => {
        try {
            await axios.post('https://deepresto-1.onrender.com/', { username, mobileno, email, password });
            setMessage('User registered successfully');
            setIsRegistered(true);
        } catch (error) {
            setMessage(error.response?.data || 'Error registering user');
        }
    };

    const login = async () => {
        try {
            const response = await axios.post('https://deepresto-1.onrender.com/login', { email: loginEmail, password: loginPassword });
            setMessage(`Logged in with token: ${response.data.token}`);
        } catch (error) {
            setMessage(error.response?.data || 'Error logging in');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                {!isRegistered ? (
                    <div>
                        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Register</h1>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Mobile No"
                                value={mobileno}
                                onChange={(e) => setMobileno(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={register}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                Register
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h1>
                        <div className="space-y-4">
                            <input
                                type="email"
                                placeholder="Email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={login}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                )}
                {message && (
                    <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
                )}
            </div>
        </div>
    );
};

export default App;

