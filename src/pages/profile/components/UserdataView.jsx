import { useState } from "react";
import { useUser } from "../../auth/context/UserContext";
import BirthdatePicker from "../../../components/BirthdatePicker";

const UserdataView = () => {
    const { userSession } = useUser();
    const [edit, setEdit] = useState(false);
    const [username, setUsername] = useState("");
    const [birthdate, setBirthDate] = useState((new Date()).toDateString().substring(4));

    return (<div className="mx-4 text-indigo-950">
        <div className={edit ? "hidden" : "flex flex-col"}>
            <div className="bg-indigo-100 rounded-md px-2">
                <p className="p-1">{username !== "" ? username : "Username"}</p>
                <p className="p-1">{userSession.user.email != null ? userSession.user.email : "E-mail"}</p>
                <p className="p-1">Birthday: {birthdate !== "" ? birthdate : "Unknown"}</p>
            </div>
            <button onClick={() => setEdit(true)} className="mt-4 p-2 bg-indigo-500 text-white rounded text-center">Edit profile</button>
        </div>
        <form className={!edit ? "hidden" : "flex flex-col"}
            onSubmit={(e) => {
                e.preventDefault()
                setEdit(false);
            }}>
            <input className="mt-2 w-full bg-indigo-100 p-2 rounded focus:outline-none" type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <div className='mt-2 w-full flex justify-between items-center'>
                <p className='text-md'>Birthday:</p>
                <BirthdatePicker className="w-full ml-2 bg-indigo-100 p-2 rounded focus:outline-none" birthdate={birthdate} setBirthdate={setBirthDate}/>
            </div>
            <button type='submit' className="mt-4 p-2 bg-indigo-500 text-white rounded text-center">Save</button>
        </form>
    </div>);
}

export default UserdataView;