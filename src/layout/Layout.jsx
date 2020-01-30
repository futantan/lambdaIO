import React from 'react'
import Profile from '../components/Profile'

const Layout = ({ children }) => (
  <div className="mx-auto max-w-2xl px-5 py-10">
    <Profile />
    {children}
  </div>
)

export default Layout
