import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useUser } from "../context/UserContext";
import { paths } from "../../../static/Paths";

export const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '', password: '',
    });
    const navigate = useNavigate();
    const [wasFocused, setWasFocused] = useState({ email: false, password: false });

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
        if (response.isSuccess) {
            navigate(paths.mainPath);
            return;
        }
        if (response.data.error.code === "ValidationError") {
            switch (response.data.errors[0].code) {
                case "Email":
                    setError(formData.email === "" ? "Email must not be empty" : "Invalid email address");
                    break;
                case "Password":
                    setError("Password must not be empty");
                    break;
            }
            return;
        }
        switch (response.data.error.message) {
            case "Unactivated user":
                setError("No such user");
                return;
            case "Wrong password":
                setError("Wrong password");
                return;
        }
    };

    return (<div className='flex justify-center items-center h-full w-full'>
        <form className="flex flex-col border-2 border-indigo-600 bg-sky-50 rounded-md p-4 w-96 items-center">
            <h1 className="text-center text-2xl text-violet-950 mb-2">Sign in</h1>
            <input
                className={`mt-2 w-full bg-indigo-100 p-2 rounded focus:outline-none ${wasFocused.email ? "[&:not(:focus)]:invalid:border [&:not(:focus)]:invalid:border-red-500 [&:not(:focus)]:invalid:text-red-600" : ""}`}
                type="email" name="email" placeholder='E-mail'
                onFocus={() => setWasFocused(prevState => ({
                    ...prevState, email: true
                }))}
                value={formData.email} onChange={handleChange} required />
            <input
                className={`mt-2 w-full bg-indigo-100 p-2 rounded focus:outline-none ${wasFocused.password ? "[&:not(:focus)]:invalid:border [&:not(:focus)]:invalid:border-red-500 [&:not(:focus)]:invalid:text-red-600" : ""}`}
                type="password" name="password" placeholder='Password'
                onFocus={() => setWasFocused(prevState => ({
                    ...prevState, password: true
                }))}
                value={formData.password} onChange={handleChange} required />
            <p className='text-sm text-red-500'>{error}</p>
            <button className="mt-4 text-center text-white px-6 py-2 rounded-md bg-violet-600 hover:bg-violet-500" type="submit" onClick={loginRequest}>Submit</button>
        </form>
    </div>
    );
};

export default observer(SignIn);