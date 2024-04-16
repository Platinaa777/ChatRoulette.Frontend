import React, {useState, useEffect} from 'react';
import profile from './../../../assets/profile.png';
import { BiMailSend } from 'react-icons/bi';
import { BsTelegram } from 'react-icons/bs';

const Footer = () => {

    const gitIdEndpoint = "https://api.github.com/users/";

    const callGitApi = async (endpoint) => {
        const response = await fetch(endpoint);
        const jsonResponse = await response.json();
        return JSON.stringify(jsonResponse);
    };

    const [creators, setCreators] = useState([
        { name: 'Denis Miroshnichenko', nick: 'Platinaa777', git: 'https://github.com/Platinaa777', img: profile },
        { name: 'Lev Svetlichnyi', nick: 'VoRtEx19', git: 'https://github.com/VoRtEx19', img: profile }
    ])


    useEffect(() => {
        creators.map((creator, idx) => callGitApi(gitIdEndpoint + creator.nick).then(result => {
            setCreators(prevState => prevState.map((c, id) => {
                if (id === idx) {
                    return { ...c, img: JSON.parse(result)["avatar_url"] }
                } else {
                    return c;
                }
            }))
        }).catch(() => {
            setCreators(prevState => prevState.map((c, id) => {
                if (id === idx) {
                    return { ...c, img: profile }
                } else {
                    return c;
                }
            }))
        }))
    }, []);

  return (
    <section className="bg-gradient-to-br from-indigo-600 to-violet-500 flex flex-col sm:flex-row absolute bottom-0 w-full text-white p-3">
                <div className="text-center sm:w-[50%] sm:border-r-2">
                    <h1 className="text-2xl mb-3">Creators</h1>
                    <div className="flex flex-col sm:flex-row">
                        {creators.map((creator) => {
                            return <a key={creator.nick} href={creator.git} className="flex flex-1 flex-col items-center mx-3">
                                <img alt="avatar" src={creator.img} height={100} width={100} className="overflow-hidden rounded-[50px]" />
                                <p>{creator.name}</p>
                                <p>@{creator.nick}</p>
                            </a>
                        })}
                    </div>
                </div>
                <ul className="w-[50%] text-center h-full flex flex-col items-center">
                    <h1 className="text-2xl mb-3">Contact us</h1>
                    <li className="flex items-center"><BiMailSend/><a href="mailto:langskillup@gmail.com" className="ml-2">langskillup@gmail.com</a></li>
                    <li className="flex items-center"><BsTelegram/><a href="https://t.me/motivated_at_midnight" className="ml-2">@motivated_at_midnight</a></li>
                    <li className="flex items-center"><BsTelegram/><a href="https://t.me/platina_777" className="ml-2">@platina_777</a></li>
                </ul>
            </section>
  )
}

export default Footer