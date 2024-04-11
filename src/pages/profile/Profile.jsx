import React from 'react';
import ProfilePic from "./profilepic/ProfilePic";
import UserdataView from "./userdataview/UserdataView";
import RatingView from "./ratingview/RatingView";
import "./Profile.css"
import AchievementsView from "./achievements/AchievementsView";

const Profile = () => {
    return (<div className="profile-container">
        <div className="profile-data-container">
            <h1>Profile</h1>
            <ProfilePic />
            <UserdataView />
        </div>
        <div className="rating-achievements-container">
            <div className='w-full h-[fit-content()]'>
                <RatingView />
            </div>
            <div className='w-full h-[30%]'>
                <AchievementsView />
            </div>
        </div>
    </div>);
};

export default Profile;