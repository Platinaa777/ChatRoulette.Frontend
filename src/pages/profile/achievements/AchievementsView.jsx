import React, { useRef } from "react";
import { achievements } from "../../../static/Achievements";

const AchievementsView = () => {
    return (
        <>
            <h1>Achievements</h1>
            <ul className="list-none overflow-x-auto whitespace-nowrap flex justify-evenly">
                {achievements.map((card) =>
                    <li key={card.id} className="inline-block relative h-[100px] w-[100px] overflow-hidden bg-neutral-200">
                        <div
                            style={{
                                backgroundImage: `url(${card.url})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                            className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
                        ></div>
                        <div className="absolute inset-0 z-10 grid place-content-center">
                            <p>
                                {card.title}
                            </p></div>
                    </li>)}
            </ul>
        </>
    );
};

export default AchievementsView;