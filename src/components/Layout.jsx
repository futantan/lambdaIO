import React from 'react'

const Layout = ({ children }) => (
  <div
    style={{
      'margin-left': 'auto',
      'margin-right': 'auto',
      padding: '42px 20px',
      'max-width': '672px',
    }}
  >
    {children}
  </div>
)

export default Layout
