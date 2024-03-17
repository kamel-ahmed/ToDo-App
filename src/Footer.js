import React from 'react'

const Footer = ({items}) => {
  return (
    <footer className="footer">
      <p>there is {items.length} {items.length ===1 ? 'item' : "items"}</p>
    </footer>
  )
}

export default Footer
