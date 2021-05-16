import jwt from "jsonwebtoken"
import { useContext } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../userContext";

interface Props {
  handleToken:Function
}

export default function Login({handleToken}: Props) {
  const {dispatch,state} = useContext(UserContext)
  let history=useHistory()
  const [user, setUser] = useState({
    password: "",

    email: "",
  });
  const handleChange = (e: any) => {
    let nam = e.target.name;
    let val = e.target.value;
    setUser({ ...user, [nam]: val });
  };
  const doLogin = (e:any) => {
    let res=state.users.find((storedUser:any)=>storedUser.email===user.email)
    if(res && res.password===user.password){
      let token=jwt.sign({userEmail:user.email},"abcde",{expiresIn:"1d"})
      dispatch({type:"login-user",payload:{email:user.email,token:token}})
    }else{
      console.log("Invaild username or password")
    }
    history.push("/")
    /* fetch("http://localhost:5000/users/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      if (response.status === 200) {
        let tokenObj: any = await response.json();
        localStorage.setItem("token", tokenObj.token);
        console.log("login successful");
        handleToken(tokenObj.token)
        history.push("/")
      }else
      console.log("Login unsuccessful")
    }) */
  };
  return (
    <div className="addForm">
      <h2 style={{ color: "rgb(240, 106, 106)", margin: "1.5vw" }}>Login</h2>
      <form onSubmit={doLogin}>
        <div className="form-group row">
          <label className="label col-sm-2 col-form-label">Email:</label>
          <input
            className="input form-control"
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="Enter email"
            autoComplete="off"
          ></input>
        </div>
        <div className="form-group row">
          <label className="label col-sm-2 col-form-label">Password:</label>
          <input
            className="input form-control"
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter password"
            autoComplete="off"
          ></input>
        </div>
        <button className="navLink submitBtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
