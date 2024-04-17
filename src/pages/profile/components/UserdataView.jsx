import { useState } from "react";
import { useSession } from "../../../http/context/UserContext";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";

const UserdataView = observer(() => {
    const userSession = useSession();

    const [edit, setEdit] = useState(false);
    const [username, setUsername] = useState(userSession.IsAuth ? userSession.profile.userName : "")

    const changeUsername = async (e) => {
        e.preventDefault()
        await userSession.changeUsername(username)
    }

    return (<div className="mx-4 text-indigo-950">
        <div className={edit ? "hidden" : "flex flex-col"}>
            <div className="bg-indigo-100 rounded-md px-2">
                <p className="p-1 text-ellipsis overflow-hidden">{userSession.IsAuth ? userSession.profile.userName : "Username"}</p>
                <p className="p-1 text-ellipsis overflow-hidden">{userSession.IsAuth ? userSession.user.email : "E-mail"}</p>
                <p className="p-1 text-ellipsis overflow-hidden">Birthday: {userSession.IsAuth ? dayjs(userSession.profile.birthDateUtc).format('MMM DD YYYY') : "Unknown"}</p>
            </div>
            <button onClick={() => setEdit(true)} className="mt-4 p-2 bg-indigo-500 text-white rounded text-center">Edit profile</button>
        </div>
        <form className={!edit ? "hidden" : "flex flex-col"}
            onSubmit={(e) => {
                changeUsername(e)
                setEdit(false)
            }}>
            <input className="mt-2 w-full bg-indigo-100 p-2 rounded focus:outline-none" type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <button type='submit' className="mt-4 p-2 bg-indigo-500 text-white rounded text-center">Save</button>
        </form>
    </div>);
});

export default UserdataView;