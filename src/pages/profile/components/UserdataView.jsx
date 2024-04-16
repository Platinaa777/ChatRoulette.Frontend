import { useEffect, useState } from "react";
import { useUser } from "../../auth/context/UserContext";
import { useProfile } from "../context/ProfileContext";
import dayjs from "dayjs";

const UserdataView = () => {
    const { userProfile } = useProfile();
    const { userSession } = useUser();

    const [edit, setEdit] = useState(false);
    const [username, setUsername] = useState(userSession.IsAuth ? userProfile.user.userName : "Username");

    const changeUsername = (e) => {
        e.preventDefault()
        setEdit(false);
        userProfile.changeUsername(username)
    }

    return (<div className="mx-4 text-indigo-950">
        <div className={edit ? "hidden" : "flex flex-col"}>
            <div className="bg-indigo-100 rounded-md px-2">
                <p className="p-1 text-ellipsis overflow-hidden">{userSession.IsAuth ? userProfile.user.userName : "Username"}</p>
                <p className="p-1 text-ellipsis overflow-hidden">{userSession.IsAuth ? userProfile.user.email : "E-mail"}</p>
                <p className="p-1 text-ellipsis overflow-hidden">Birthday: {userSession.IsAuth ? dayjs(userProfile.user.birthDateUtc).format('MMM DD YYYY') : "Unknown"}</p>
            </div>
            <button onClick={() => setEdit(true)} className="mt-4 p-2 bg-indigo-500 text-white rounded text-center">Edit profile</button>
        </div>
        <form className={!edit ? "hidden" : "flex flex-col"}
            onSubmit={changeUsername}>
            <input className="mt-2 w-full bg-indigo-100 p-2 rounded focus:outline-none" type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <button type='submit' className="mt-4 p-2 bg-indigo-500 text-white rounded text-center">Save</button>
        </form>
    </div>);
}

export default UserdataView;