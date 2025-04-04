import React from 'react'
import './Menu.scss'
import {Link} from'react-router-dom'
const Menu = () => {
  return (
    <div className='Menu-container-user'> 
      <div className='left-menu-user menu'><h1>DTube</h1></div>
      <div className='mid-menu-user menu'>
        <Link className='label-mid' to='/'>Home</Link>
        <Link className='label-mid' to='/tvshow'>TV Shows</Link>
        <Link className='label-mid' to='/movies'>Movies</Link>
        <Link className='label-mid' to='/new&popular'>New & Popular</Link>
        <Link className='label-mid' to='/mylist'>My List</Link>
        <Link className='label-mid' to='/BBL'>Browse by Languages</Link>
      </div>
      <div className='right-menu-user menu'>
        <button><i class="fa fa-search" aria-hidden="true"></i></button>
        <button>DvD</button>
        <button><i class="fa fa-gift" aria-hidden="true"></i></button>
        <button><i class="fa fa-bell" aria-hidden="true"></i></button>
        <button><i class="fa fa-user" aria-hidden="true"></i></button>
      </div>
    </div>
  )
}

export default Menu
