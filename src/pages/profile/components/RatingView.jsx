import React, { useEffect, useState } from 'react';
import profile from '../../../assets/profile.png'
import { observer } from 'mobx-react-lite';
import { useSession } from '../../../http/context/UserContext';

const RatingView = observer(() => {
    const userSession = useSession();

    const [rating, setRating] = useState([]);

    useEffect(() => {
        const getTopUsers = async () => {
            const result = await userSession.getTopUsers()
            setRating([...result])
        }

        getTopUsers()
        console.log('rating received', rating)
    }, [])

    return (
        <div className='w-full text-indigo-950'>
            <ul className='w-full mt-3'>
                {rating.map((person, idx) => (<li
                    key={idx}
                    className={`cursor-pointer w-full flex justify-between items-center flex-row relative rounded-md p-3 ${person.userName === rating.me.userName ? "border-2 border-blue-500" : "border-blue-800 border"} mb-1 bg-indigo-50`}
                >
                    <div className="flex items-center">
                        <img alt="" src={person.avatar === '' ? profile : person.avatar} width={40} height={40} className="rounded overflow-hidden" />
                        <h3 className="ml-4 text-l font-medium leading-5">
                            #{idx + 1} {person.userName}
                        </h3>
                    </div>
                    <h3 className='text-l font-medium leading-5'>{person.rating}</h3>
                </li>))}
                {/*(!(rating.some(person => person.userName === userSession.profile.userName))) && <>
                    <hr className='mt-3 border-blue-800' />
                    <li className='cursor-pointer mt-3 w-full flex justify-between items-center flex-row relative rounded p-3 border border-blue-800 mb-1 bg-blue-50'>
                        <div className='flex items-center'>
                            <img alt="" src={rating.me.avatar} width={40} height={40} className="rounded overflow-hidden" />
                            <h3 className="ml-4 text-l font-medium leading-5">
                                {rating.me.userName}
                            </h3>
                        </div>
                        <h3 className='text-l font-medium leading-5'>{rating.me.rating}</h3>
                    </li>
                </>*/
                }
            </ul>
        </div>
    );
});

export default RatingView;