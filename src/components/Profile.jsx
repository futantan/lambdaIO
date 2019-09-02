import React from 'react'
import styles from './Profile.module.css'

const Profile = () => (
  <div className={styles.layout}>
    <img
      className={styles.avatar}
      src="https://avatars2.githubusercontent.com/u/6268441?s=460&v=4"
      alt="avatar"
    />
    <p>傅坦坦的个人博客</p>
  </div>
)

export default Profile
