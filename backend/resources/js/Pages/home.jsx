import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Home = ({ users }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [editing, setEditing] = useState(null);

    const createUser = () => {
        Inertia.post('/api/users', { name, email, password });
        resetForm();
    };

    const editUser = (user) => {
        setName(user.name);
        setEmail(user.email);
        setEditing(user.id);
    };

    const updateUser = () => {
        Inertia.put(`/api/users/${editing}`, { name, email, password });
        resetForm();
    };

    const deleteUser = (id) => {
        Inertia.delete(`/api/users/${id}`);
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setEditing(null);
    };

    return (
        <div>
            <h1>Users CRUD</h1>
            <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter user name" 
            />
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter email" 
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter password" 
            />
            <button onClick={editing ? updateUser : createUser}>
                {editing ? 'Update User' : 'Create User'}
            </button>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                        <button onClick={() => editUser(user)}>Edit</button>
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
