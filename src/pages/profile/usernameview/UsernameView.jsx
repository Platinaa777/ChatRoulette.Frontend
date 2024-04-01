import {useState} from "react";
import {useUser} from "../../auth/context/UserContext";
import "./UsernameView.css"

const UsernameView = () => {
    const {userSession} = useUser();
    const [edit, setEdit] = useState(false);
    const [input, setInput] = useState(String(userSession.user.email));
    return (<>
        <div className={edit ? "username" : "username active"}>
            <p>{input}</p>
            <button onClick={() => setEdit(true)}>Edit profile</button>
        </div>
        <form className={edit ? "username-editor active" : "username-editor"} onSubmit={(e) => {
            e.preventDefault()
            setEdit(false);
            userSession.user.email = input;
        }}>
            <label>Username:</label>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
            <button type='submit'>Submit</button>
        </form>
    </>);
}

export default UsernameView;