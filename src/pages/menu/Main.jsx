import React, { useEffect} from "react";
import { observer } from "mobx-react-lite";
import { useSession } from "../../http/context/UserContext";
import { Link } from "react-router-dom";
import Footer from './components/Footer';

const Main = () => {
    const userSession = useSession();

    useEffect(() => {
        if (!localStorage.getItem('access-token')) {
            userSession.checkAuth().then()
        } else {
            userSession.setAuth(true)
            userSession.setUser({ email: localStorage.getItem('email') })
        }
    });

    return (
        <div className="w-full">
            <section className="w-full flex flex-col items-center p-[1.25rem] overflow-auto absolute h-[65%]">
                <h1 className="text-2xl text-center mb-4 tracking-widest text-indigo-800">
                    Develop your English communication skills<br/>with LangSkillUp!
                </h1>
                <div className="flex flex-col sm:flex-row gap-4 mb-4 text-justify text-indigo-950">
                    <div className="sm:flex-[3_3_0%] border-solid border-2 border-indigo-600 p-3 rounded-md bg-indigo-100">
                        <h1 className="text-xl text-center tracking-wide">About the app</h1>
                        <p>This is a chat-roulette: that means you join a room and talk with a random person. You have cooldown of 3 people to talk again with previous person</p>
                    </div>
                    <ul className="sm:flex-[4_4_0%] border-solid border-2 border-indigo-600 p-3 rounded-md list-disc bg-indigo-100">
                        <h1 className="text-xl text-center tracking-wide">Facts</h1>
                        <li className="ml-2">It's a course project 2nd grade of Software Engineering course in HSE, Moscow, 2024</li>
                        <li className="ml-2">Backend and Devops part: Denis Miroshnichenko</li>
                        <li className="ml-2">Frontend part: Lev Svetlichnyi</li>
                    </ul>
                    <div className="sm:flex-[3_3_0%] border-solid border-2 border-indigo-600 p-3 rounded-md bg-indigo-100">
                        <h1 className="text-xl text-center tracking-wide">Note</h1><p>If you liked our application, please, smash the star on App repo and subscribe to know more about new IT-products</p>
                    </div>
                </div>
                <Link to='/hub' className='text-center text-white px-[20px] py-[10px] mx-4 border-none rounded-md bg-violet-700 hover:bg-violet-600'>
                    Start
                </Link>
            </section>
            <Footer/>
        </div>
    );
};

export default observer(Main);