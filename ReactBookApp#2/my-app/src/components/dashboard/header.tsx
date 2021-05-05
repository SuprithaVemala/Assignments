
import { useState } from "react";
import { useEffect } from "react";
import Animation from "../../lottie/animation";
import NavLink from "./navLink";
interface Props {
  tokenFlag:any
}

export default function Header({tokenFlag}: Props) {
  const [checkLogin, setCheckLogin] = useState(false)
  useEffect(() => {
   if(localStorage.getItem("token"))
   setCheckLogin(true)
  },[localStorage])
  let links = [
    ["Books", "/"],
    ["Add Book", "/addNewBook"],
    ["Authors", "/"],
    ["Add Author", "/"],
    ["Login","/login"],
    ["Register","/register"]
  ];
  console.log(`tokenFlag`, tokenFlag)
  return (
    <div className="header">
      <div style={{display:"inline-block"}}  >
        <Animation  />
        
      </div>

      <div className="navGroup">
        {links.map(([name, url]) => (
          tokenFlag===false && name==="Add Book"?<></>:<NavLink url={url} name={name}></NavLink>
        ))}
      </div>
    </div>
  );
}
