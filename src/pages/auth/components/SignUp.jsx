import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../context/UserContext";
import { mainPath } from "../../../static/Paths";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SignUp = () => {
    const [formData, setFormData] = useState({
        userName: '', email: '', password: '', birthdate: String(new Date())
    });
    const navigate = useNavigate();
    const { userSession } = useUser()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData, [name]: value
        }));
    };

    const registerRequest = async (e) => {
        e.preventDefault()
        let response = await userSession.register(formData);

        console.log(response)
        navigate(mainPath)
    };

    return (
        <div className='flex justify-center items-center h-full w-full'>
            <form className="flex flex-col border-2 border-indigo-600 bg-sky-50 rounded-md p-4 w-96 items-center">
                <h1 className="text-center text-2xl text-violet-950 mb-2">Sign up</h1>
                <input className="mt-2 w-full border-none bg-indigo-100 p-2 rounded" type="text" name="userName" placeholder='User name' value={formData.userName} onChange={handleChange} required />
                <input className="mt-2 w-full border-none bg-indigo-100 p-2 rounded" type="email" name="email" placeholder='E-mail' value={formData.email} onChange={handleChange} required />
                <input className="mt-2 w-full border-none bg-indigo-100 p-2 rounded" type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} required />
                <div className='mt-2 w-full flex justify-between items-center'>
                    <p className='text-md text-violet-950'>Date of birth:</p>
                    <DatePicker name='birthdate' className="w-full border-none bg-indigo-100 p-2 rounded" selected={formData.birthdate} onSelect={(date) => setFormData(prevData => ({
                        ...prevData, ['birthdate']: date
                    }))} />
                </div>
                <button className="mt-4 text-center text-white px-6 py-2 border-none rounded-md bg-violet-600 hover:bg-violet-500" type="submit" onClick={registerRequest}>Submit</button>
            </form>
        </div>
    );
};

export default observer(SignUp);