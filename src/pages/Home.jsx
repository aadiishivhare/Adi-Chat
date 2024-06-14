import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

const Home = () => {
  return (
   <div className="home">
    <div className="container">
        <Sidebar/>
        <Chat/>
    </div>
    <a href='#' className='design'>Designed By- Aditya Shivhare</a>
   </div>
  )
}

export default Home