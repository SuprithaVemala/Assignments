
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Animation from "../../lottie/animation";
import { UserContext } from "../../userContext";
import {Link} from 'react-router-dom'
interface Props {
  tokenFlag:any
}

export default function Header({tokenFlag}: Props) {
  const [checkLogin, setCheckLogin] = useState(false)
  const {state} = useContext(UserContext)
  useEffect(() => {
   if(state.activeUser!==null){
     setCheckLogin(true)
   }else
   setCheckLogin(false)
  })
  return (
    <div className="header">
      <div style={{display:"inline-block"}}  >
        <Animation  />
        
      </div>

      <div className="navGroup">
          <Link className="navLink" to="/">Books</Link>
         {checkLogin===true?<Link className="navLink" to="/addNewBook">Add Book</Link>:<></>}
         {checkLogin===false?<Link className="navLink" to="/login">Login</Link>:<></>}
        {checkLogin===false?<Link className="navLink" to="/Register">Register</Link>:<></>}
        {checkLogin===true?<Link className="navLink" to="/logoff">Logout</Link>:<></>}
      </div>
    </div>
  );
}
