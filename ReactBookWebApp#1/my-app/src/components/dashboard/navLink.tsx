import React from 'react'
import {Link} from 'react-router-dom'

interface Props {
    name:string,
    url:string
    
}

export default function NavLink({name,url}: Props){
    return (
        <>
          <Link className="navLink" to={url}>{name}</Link>  
        </>
    )
}
