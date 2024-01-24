import React from 'react'

const HomePage = () => {
    const gradientStyle = {
        
        display: 'flex',
        flexDirection:'column',
        
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff', 
        height:"90vh"
        
      };
    
      return (
        <div style={gradientStyle}>

        <h1> Welcome to E-Commerece Store</h1>
        <img src="https://res.cloudinary.com/dyylqn8vb/image/upload/v1706089288/gif3_v8fqnc.gif" alt="e-commerce" style={{width:"40%"}}/>
    <p> Instructions: you can use following login details:</p>
    <p> <span style={{fontWeight:"bold",color:"black"}}>  merchant logins </span>
      email: "rossgeller@gmail.com",
        password: "ross@123",</p>

        <p> <span style={{fontWeight:"bold",color:"black"}}>  User logins </span>
      email: "joey@gmail.com",
        password: "joey@123",</p>
    </div>
  )
}

export default HomePage