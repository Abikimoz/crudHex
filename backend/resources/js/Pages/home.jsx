import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import 'bootstrap/dist/css/bootstrap.min.css'; // Импортируем Bootstrap стили

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
        <div className="container mt-5">
            <h1 className="mb-4">Users CRUD</h1>
            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Enter user name" 
                />
            </div>
            <div className="mb-3">
                <input 
                    type="email" 
                    className="form-control" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter email" 
                />
            </div>
            <div className="mb-3">
                <input 
                    type="password" 
                    className="form-control" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Enter password" 
                />
            </div>
            <button className="btn btn-primary mb-3" onClick={editing ? updateUser : createUser}>
                {editing ? 'Update User' : 'Create User'}
            </button>
            <ul className="list-group">
                {users.map(user => (
                    <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {user.name} - {user.email}
                        <div>
                            <button className="btn btn-warning btn-sm" onClick={() => editUser(user)}>Edit</button>
                            <button className="btn btn-danger btn-sm ms-2" onClick={() => deleteUser(user.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
