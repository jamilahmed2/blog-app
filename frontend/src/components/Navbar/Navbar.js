import { getAuth, signOut } from 'firebase/auth'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useUser from '../../Hooks/useUser'

const Navbar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/articles">Articles</Link></li>
        </ul>
        <div className="nav-right">
          {
            user
              ?
              <button onClick={() =>
                signOut(getAuth())
              }>Log Out</button>

              : <form style={{ display: 'flex',flexWrap:'wrap',alignContent:'center' }}>
                <button style={{ marginRight: '5px' }} onClick={(e) =>{
                e.preventDefault();
                  navigate('/login')}
                }>Log In</button>
                <button onClick={(e) =>{
                e.preventDefault();
                  navigate('/signup')}
                }>Sign Up</button>

              </form>
          }
        </div>
      </nav>
    </>
  )
}

export default Navbar