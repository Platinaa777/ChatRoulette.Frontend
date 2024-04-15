import React from "react";
import { achievements } from "../../../static/Achievements";

const AchievementsView = () => {
    return (
        <div className="w-full text-indigo-950">
            <ul className="list-none flex flex-col justify-evenly mt-3">
                {achievements.map((card) =>
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