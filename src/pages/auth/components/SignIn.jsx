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

    const [error, setError] = useState(null);


    const { userSession } = useUser();

    const handleChange = (e) => {
        setError(null);
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData, [name]: value
        }));
    };

    const loginRequest = async (e) => {
        e.preventDefault();
        let response = await userSession.login(formData.email, formData.password);
        console.log(response);
        if (response === "OK") {
            navigate(mainPath);
            return;
        }
        switch (response.error.message) {
            case "Unactivated user":
                setError("No user with such username")
                break;
            case "Wrong password":
                setError("Wrong password")
                break;
            case "Validation error was thrown":
                switch (response.errors[0].message) {
                    case "'Email' is not a valid email address.":
                        setError(formData.email==="" ? "Email must not be empty" : "Invalid email address");
                        break;
                    case "'Password' must not be empty.":
                        setError("Password must not be empty");
                        break;
                }
                break;
        }
    };

    return (<div className='flex justify-center items-center h-full w-full'>
        <form className="flex flex-col border-2 border-indigo-600 bg-sky-50 rounded-md p-4 w-96 items-center">
            <h1 className="text-center text-2xl text-violet-950 mb-2">Sign in</h1>
            <input className="mt-2 w-full border-none bg-indigo-100 p-2 rounded" type="email" name="email" placeholder='E-mail' value={formData.email} onChange={handleChange} required />
            <input className="mt-2 w-full border-none bg-indigo-100 p-2 rounded" type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} required />
            <p className='text-sm text-red-500'>{error}</p>
            <button className="mt-4 text-center text-white px-6 py-2 border-none rounded-md bg-violet-600 hover:bg-violet-500" type="submit" onClick={loginRequest}>Submit</button>
        </form>
    </div>
    );
};

export default observer(SignIn);