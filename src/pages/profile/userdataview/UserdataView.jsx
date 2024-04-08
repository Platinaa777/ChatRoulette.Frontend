import {useState} from "react";
import {useUser} from "../../auth/context/UserContext";
import "./UserdataView.css"

const UserdataView = () => {
    const {userSession} = useUser();
    const [edit, setEdit] = useState(false);
    const [username, setUsername] = useState("");
    const [age, setAge] = useState("");
    return (<>
        <div className={edit ? "userdata-container inactive" : "userdata-container active"}>
            <p>{username !== "" ? username : "Username"}</p>
            <p>{userSession.user.email != null ? userSession.user.email : "E-mail"}</p>
            <p>Age: {age !== "" ? age : "Unknown"}</p>
            <button onClick={() => setEdit(true)}>Edit profile</button>
        </div>
        <form className={edit ? "userdata-container editor active" : "userdata-container editor inactive"}
              onSubmit={(e) => {
                  e.preventDefault()
                  setEdit(false);
              }}>
            <input type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
            <input type="number" value={age} placeholder="Age" onChange={(e) => setAge(e.target.value)}/>
            <button type='submit'>Submit</button>
        </form>
    </>);
}

export default UserdataView;