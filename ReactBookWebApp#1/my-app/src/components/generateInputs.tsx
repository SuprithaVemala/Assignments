import React, { ReactElement } from 'react'

interface Props {
    type:string,
    name:string,
    onchange:any
    
}

export default function generateInputs({type,name,onchange}: Props){
    return (
        <div className="form-group row">
            <label className="label col-sm-2 col-form-label" htmlFor={name}>{name}</label>
            <input className="input form-control" type={type} name={name} onChange={onchange}></input>
            <br></br>
        </div>
    )
}
