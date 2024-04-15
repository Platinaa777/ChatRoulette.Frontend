import React, { useState } from 'react';
import profile from "../../../assets/profile.png";

const RatingView = () => {
    const [rating] = useState({
        top5: [
            { id: 1, nickName: "dang zui wu", rating: 9999, img: profile },
            { id: 2, nickName: "sung hui vchai", rating: 9998, img: profile },
            { id: 3, nickName: "vyng su him", rating: 9997, img: profile },
            { id: 4, nickName: "nonamesigma", rating: 9996, img: profile },
            { id: 5, nickName: "hueSOS2004", rating: 69, img: profile },
        ],
        me: { id: 777, nickName: "hueplatina", rating: -1, img: profile }
    });
    return (
        <div className='w-full text-indigo-950'>
            <ul className='w-full mt-3'>
                {rating.top5.map((person) => (<li
                    key={person.id}
                    className="cursor-pointer w-full flex justify-between items-center flex-row relative rounded-md p-3 border border-blue-800 mb-1 hover:bg-indigo-100 bg-blue-50"
                >
                    <div className="flex items-center">
                        <img alt="" src={person.img} width={40} height={40} className="rounded overflow-hidden" />
                        <h3 className="ml-4 text-l font-medium leading-5">
                            #{person.id} {person.nickName}
                        </h3>
                    </div>
                    <h3 className='text-l font-medium leading-5'>{person.rating}</h3>
                </li>))}
                {
                    (rating.me.id > 5) && <>
                        <hr className='mt-3 border-blue-800' />
                        <li className='cursor-pointer mt-3 w-full flex justify-between items-center flex-row relative rounded p-3 border border-blue-800 mb-1 hover:bg-indigo-100 bg-blue-50'>
                            <div className='flex items-center'>
                                <img alt="" src={rating.me.img} width={40} height={40} className="rounded overflow-hidden" />
                                <h3 className="ml-4 text-l font-medium leading-5">
                                    #{rating.me.id} {rating.me.nickName}
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