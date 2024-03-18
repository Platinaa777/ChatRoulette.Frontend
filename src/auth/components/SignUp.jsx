import React, { useState } from 'react';
import '../styles/signup.css'

export const SignUp = () => {
    const [formData, setFormData] = useState({
        userName: '',
        nickName: '',
        age: '',
        email: '',
        password: '',
        preferences: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handlePreferencesChange = (e) => {
        const { options } = e.target;
        const preferences = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                preferences.push(options[i].value);
            }
        }
        setFormData(prevData => ({
            ...prevData,
            preferences
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="userName">Username:</label>
                <input type="text" name="userName" id="userName" value={formData.userName} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="nickName">Nickname:</label>
                <input type="text" name="nickName" id="nickName" value={formData.nickName} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="age">Age:</label>
                <input type="number" name="age" id="age" value={formData.age} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="preferences">Preferences:</label>
                <select multiple name="preferences" id="preferences" value={formData.preferences} onChange={handlePreferencesChange} required>
                    <option value="preference1">Sport</option>
                    <option value="preference2">Computer Science</option>
                    <option value="preference3">Biology</option>
                </select>
            </div>
            {
                formData.age &&
                formData.email &&
                formData.nickName &&
                formData.password &&
                formData.userName 
                ?
                <button type="submit" className="submit-button">Send</button>
                :
                ""
            }
        </form>
    );
};