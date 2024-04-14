import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useUser } from "../context/UserContext";
import { mainPath } from "../../../static/Paths";

export const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '', password: '',
    });
    const navigate = useNavigate();


    const { userSession } = useUser();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData, [name]: value
        }));
    };

    const loginRequest = async (e) => {
        e.preventDefault();
        await userSession.login(formData.email, formData.password);
        navigate(mainPath);
    };

    return (<div className='flex justify-center items-center h-full w-full'>
        <form className="flex flex-col border-2 border-indigo-600 bg-sky-50 rounded-md p-4 w-96 items-center">
            <h1 className="text-center text-2xl text-violet-950 mb-2">Sign in</h1>
            <input className="mt-2 w-full border-none bg-indigo-100 p-2 rounded" type="email" name="email" placeholder='E-mail' value={formData.email} onChange={handleChange} required/>
            <input className="mt-2 w-full border-none bg-indigo-100 p-2 rounded" type="password" name="password" placeholder='password' value={formData.password} onChange={handleChange} required/>
            <button className="mt-4 text-center text-white px-6 py-2 border-none rounded-md bg-violet-600 hover:bg-violet-500" type="submit" onClick={loginRequest}>Submit</button>
        </form>
    </div>
    );
};

export default observer(SignIn);