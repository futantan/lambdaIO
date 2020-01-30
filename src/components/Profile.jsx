import React from "react";
import { Link } from "gatsby";

const Profile = () => (
  <Link to="/">
    <div className='flex flex-row items-center'>
      <img
        className='w-16 mr-3 rounded-full'
        src="https://avatars2.githubusercontent.com/u/6268441?s=460&v=4"
        alt="avatar"
      />
      <p>傅坦坦的个人博客</p>
    </div>
  </Link>
)

export default Profile
