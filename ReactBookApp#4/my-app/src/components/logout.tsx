import React from 'react'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../userContext'

interface Props {
    
}

const Logout = (props: Props) => {
    const history=useHistory()
    const {dispatch} = useContext(UserContext)
    dispatch({type:"logout-user"})
    history.push("/")
    return (
        <div>
            
        </div>
    )
}

export default Logout