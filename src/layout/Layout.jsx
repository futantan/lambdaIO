import React from 'react'
import styles from './Layout.module.css'
import Profile from '../components/Profile'

const Layout = ({ children }) => (
  <div className={styles.layout}>
    <Profile />
    {children}
  </div>
)

export default Layout
