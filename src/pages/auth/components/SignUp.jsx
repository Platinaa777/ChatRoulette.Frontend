import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../context/UserContext";
import { mainPath } from "../../../static/Paths";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SignUp = () => {
    const [formData, setFormData] = useState({
        userName: '', nickName: '', email: '', password: '', age: ''
    });
    const [birthdate, setBirthDate] = useState(new Date());
    const navigate = useNavigate();
    const { userSession } = useUser();

    function calculateAge(birthday) { // birthday is a date
        var ageDifMs = Date.now() - birthday;
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setError(null);
        setFormData(prevData => ({
            ...prevData, [name]: value
        }));
        if (name === "userName") {
            setFormData(prevData => ({
                ...prevData, ['nickName']: value
            }));
        }
    };

    const registerRequest = async (e) => {
        e.preventDefault()
        let response = await userSession.register(formData);
        console.log(response);
        if (response === "OK") {
            navigate(mainPath);
            return;
        }
        Object.keys(response.errors).reverse().map((key) => {
            const error = response.errors[key];
            if (error !== "") {
                setError(error);
                return;
            }
        })
    };

    return (
        <div className='flex justify-center items-center h-full w-full'>
            <form className="flex flex-col border-2 border-indigo-600 bg-sky-50 rounded-md p-4 w-96 items-center">
                <h1 className="text-center text-2xl text-violet-950 mb-2">Sign up</h1>
                <input className="mt-2 w-full border-none bg-indigo-100 p-2 rounded" type="email" name="email" placeholder='E-mail' value={formData.email} onChange={handleChange} required />
                <input className="mt-2 w-full border-none bg-indigo-100 p-2 rounded" type="text" name="userName" placeholder='User name' value={formData.userName} onChange={handleChange} required />
                <input className="mt-2 w-full border-none bg-indigo-100 p-2 rounded" type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} required />
                <div className='mt-2 w-full flex justify-between items-center'>
                    <p className='text-md text-violet-950'>Date of birth:</p>
                    <DatePicker name='birthdate' className="w-full border-none bg-indigo-100 p-2 rounded" selected={birthdate} onChange={(date) => {
                        setFormData(prevData => ({
                            ...prevData, ['age']: String(calculateAge(date))
                        }))
                        console.log(formData.age)
                        setBirthDate(date)
                        setError(null)
                    }} />
                </div>
                <p className='text-sm text-red-500'>{error}</p>
                <button className="mt-4 text-center text-white px-6 py-2 border-none rounded-md bg-violet-600 hover:bg-violet-500" type="submit" onClick={registerRequest}>Submit</button>
            </form>
        </div>
    );
};

export default observer(SignUp);