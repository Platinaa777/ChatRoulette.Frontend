import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../context/UserContext";
import { paths } from "../../../static/Paths";
import BirthdatePicker from '../../../components/BirthdatePicker';

const SignUp = () => {
    const dateToFormat = (date) => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${date.getDate()}`;

    const [formData, setFormData] = useState({
        userName: '', email: '', password: '', birthdate: dateToFormat(new Date())
    });

    const [wasFocused, setWasFocused] = useState({
        email: false,
        password: false,
        nickName: false,
        birthday: false
    });

    const navigate = useNavigate();
    const { userSession } = useUser();

    function calculateAge(birthday) {
        var ageDifMs = Date.now() - birthday;
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setError(null);
        setFormData(prevData => ({
            ...prevData, [name]: value
        }));
    };

    const registerRequest = async (e) => {
        e.preventDefault()
        let response = await userSession.register(formData);
        console.log(response);
        if (response.status === 200) {
            switch (response.data.error.message) {
                case "User is older than 100 years old":
                case "":
                    setError("User must be older than 16");
                    return;
            }
            navigate(paths.mainPath);
            return;
        }
        Object.keys(response.data.errors).reverse().forEach((key) => {
            const error = response.data.errors[key];
            if (error !== "") {
                setError(error);
            }
            return;
        })
    };

    return (
        <div className='flex justify-center items-center h-full w-full'>
            <form className="flex flex-col border-2 border-indigo-600 bg-sky-50 rounded-md p-4 w-96 items-center">
                <h1 className="text-center text-2xl text-violet-950 mb-2">Sign up</h1>

                <input
                    className={`mt-2 w-full bg-indigo-100 p-2 rounded focus:outline-none ${wasFocused.email ? "[&:not(:focus)]:invalid:border [&:not(:focus)]:invalid:border-red-500 [&:not(:focus)]:invalid:text-red-600" : ""}`}
                    type="email" name="email" placeholder='E-mail'
                    onFocus={() => setWasFocused(prevState => ({
                        ...prevState, email: true
                    }))}
                    value={formData.email} onChange={handleChange} required />

                <input
                    className={`mt-2 w-full bg-indigo-100 p-2 rounded focus:outline-none ${wasFocused.userName ? "[&:not(:focus)]:invalid:border [&:not(:focus)]:invalid:border-red-500 [&:not(:focus)]:invalid:text-red-600" : ""}`}
                    type="text" name="userName" placeholder='User name'
                    onFocus={() => setWasFocused(prevState => ({
                        ...prevState, userName: true
                    }))}
                    value={formData.userName} onChange={handleChange} required />

                <input className={`mt-2 w-full bg-indigo-100 p-2 rounded focus:outline-none ${wasFocused.password ? "[&:not(:focus)]:invalid:border [&:not(:focus)]:invalid:border-red-500 [&:not(:focus)]:invalid:text-red-600" : ""}`}
                    type="password" name="password" placeholder='Password'
                    onFocus={() => setWasFocused(prevState => ({
                        ...prevState, password: true
                    }))}
                    value={formData.password} onChange={handleChange} required />

                <div className='mt-2 w-full flex justify-between items-center'>
                    <p className='text-md text-violet-950' onFocus={() => setWasFocused(prevState => ({
                        ...prevState, birthday: true
                    }))} >Date of birth:</p>
                    <BirthdatePicker
                        className={"w-full bg-indigo-100 p-2 rounded focus:outline-none " + (wasFocused.email ? "[&:not(:focus)]:invalid:border [&:not(:focus)]:invalid:border-red-500 [&:not(:focus)]:invalid:text-red-600" : "")}
                        onFocus={() => setWasFocused(prevState => ({
                            ...prevState, birthday: true
                        }))}
                        birthdate={formData.birthdate} setBirthdate={(value) => setFormData(prevData => ({
                            ...prevData, birthdate: value
                        }))} />
                </div>
                <p className='text-sm text-red-500'>{error}</p>
                <button className="mt-4 text-center text-white px-6 py-2 border-none rounded-md bg-violet-600 hover:bg-violet-500" type="submit" onClick={registerRequest}>Submit</button>
            </form>
        </div>
    );
};

export default observer(SignUp);