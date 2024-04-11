
import React, { useState } from 'react';
import profile from "../../../assets/profile.png";
import './RatingView.css';

const RatingView = () => {
    const [rating] = useState({
        top5: [
            { id: 1, nickName: "dang zui wu", rating: 9999 },
            { id: 2, nickName: "sung hui vchai", rating: 9998 },
            { id: 3, nickName: "vyng su him", rating: 9997 },
            { id: 4, nickName: "nonamesigma", rating: 9996 },
            { id: 5, nickName: "hueSOS2004", rating: 69 },
        ],
        me: { id: 777, nickName: "hueplatina", rating: -1 }
    });
    return (
        <div className='w-full'>
            <h1>Rating</h1>
            <ul className='w-full mt-3'>
                {rating.top5.map((person) => (<li
                    key={person.id}
                    className="w-full flex justify-between flex-row relative rounded-md p-3 border mb-1 hover:bg-gray-100"
                >
                    <div className="flex">
                        <h3 className='text-l font-medium leading-5'>{person.id}</h3>
                        <img alt="" src={profile} width={20} height={20} className="ml-4 rounded-xl overflow-hidden" />
                        <h3 className="ml-4 text-l font-medium leading-5">
                            {person.nickName}
                        </h3>
                    </div>
                    <h3 className='text-l font-medium leading-5'>{person.rating}</h3>
                </li>))}
                {
                    (rating.me.id > 5) && <>
                        <hr className='mt-3' />
                        <li className='mt-3 w-full flex justify-between flex-row relative rounded-md p-3 border mb-1 hover:bg-gray-100'>
                            <div className='flex'>
                                <h3 className='text-l font-medium leading-5'>{rating.me.id}</h3>
                                <img alt="" src={profile} width={20} height={20} className="ml-4 rounded-xl overflow-hidden" />
                                <h3 className="ml-4 text-l font-medium leading-5">
                                    {rating.me.nickName}
                                </h3>
                            </div>
                            <h3 className='text-l font-medium leading-5'>{rating.me.rating}</h3>
                        </li>
                    </>
                }
            </ul>
        </div>
    );
};

export default RatingView;