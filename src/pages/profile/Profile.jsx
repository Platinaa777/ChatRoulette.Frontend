import React from 'react';
import ProfilePic from "./profilepic/ProfilePic";
import UsernameView from "./usernameview/UsernameView";
import RatingView from "./ratingview/RatingView";
import "./Profile.css"

const Profile = () => {
    return (<div className="profile-container">
        <div className="profile-data-container">
            <h1>Profile</h1>
            <ProfilePic/>
            <UsernameView/>
        </div>
        <div className="rating-container">
            <RatingView/>
        </div>
    </div>);
};

export default Profile;