import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import '../styles/signup.css'
import {observer} from 'mobx-react-lite';
import {useUser} from "../../../context/UserContext";
import {mainPath} from "../../../res/Paths";

export const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '', password: '',
    });
    const navigate = useNavigate();


    const {userSession} = useUser();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevData => ({
            ...prevData, [name]: value
        }));
    };

    const loginRequest = async (e) => {
        e.preventDefault()
        await userSession.login(formData.email, formData.password);
        navigate(mainPath)
    };
            <h1>Login form</h1>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" value={formData.password} onChange={handleChange}
                       required/>
            </div>
            <button type="submit" className="submit-button" onClick={loginRequest}>Send</button>
        </form>

    );
};

export default observer(SignIn);