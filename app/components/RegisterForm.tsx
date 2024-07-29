'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
  
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
                

        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, name }),
        });
    
        if (res.ok) {
            router.push('/api/auth/signin')
        } else {
            const data = await res.json();
            setError(data.error || 'Registration failed');
        }
    };

    const handleCancel = () => {
        setName('');
        setEmail('');
        setPassword('');
        // TODO
        // Add your cancel logic here, e.g., clearing the form or navigating to another page
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
            <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
                <label htmlFor="name" className='block text-sm font-medium text-gray-700'>Name</label>
                <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
            </div>
            <div>
                <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email</label>
                <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
            </div>
            <div>
                <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Password</label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex space-x-4">
                <button type="submit" className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                    Register
                </button>
                <button
                    type="button"
                    onClick={handleCancel} // Add your cancel handler function here
                    className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    Cancel
                </button>
            </div>
            
            </form>
        </div>
      </div>
    );
  };
  
  export default RegisterForm;
