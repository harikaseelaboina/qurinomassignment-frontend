import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='container-fluid' style={{backgroundColor:"white",color:"black",width:"100%"}}>
    <ul className="nav justify-content-center">
    <li className="nav-item">
      <a className="nav-link " href="/">Home</a>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/userlogin">User Login</Link>
    </li>
    <li className="nav-item">
    <Link className="nav-link" to="/merchantlogin">Merchant Login</Link>
     
    </li>
   
  </ul>
  </div>
  )
}

export default Navbar