import React, { useEffect, useState } from "react";
import { useProfile } from "../context/ProfileContext";

const AchievementsView = () => {
    const { userProfile } = useProfile();

    console.log(userProfile.user);

    return (
        <div className="w-full text-indigo-950">
            <ul className="list-none flex flex-col justify-evenly mt-3">
                {(userProfile.user.achievements.length === 0) && <p>Wow... empty</p>}
                {userProfile.user.achievements.map((card) =>
                    <li key={card.id} className="flex relative w-full hover:border-gray-500 rounded-md p-4 cursor-pointer border-transparent border-2">
                        <div className="flex items-center">
                            <img alt={card.title} src={card.url} width={75} />
                            <div className="ml-4">
                                <p className="">{card.title}</p>
                                <p className="text-sm">{card.desc}</p>
                            </div>
                        </div>
                    </li>)}
            </ul>
        </div>
    );
};

export default AchievementsView;