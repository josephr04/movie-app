import React from 'react'
import NavListItems from './components/header/NavListItems'

function Header() {
  return (
    <header>
      <a href="/" className='logo'>
      </a>
      <ul className='nav'>
        <NavListItems name="Upcoming"/>
        <NavListItems name="Popular"/>
        <NavListItems name="Categories"/>
      </ul>
    </header>
  )
}

export default Header