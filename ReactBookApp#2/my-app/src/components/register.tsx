
import { useState } from "react";
import { useHistory } from "react-router";

interface Props {}

export default function Register({}: Props) {
  let history = useHistory();
  const [warning, setWarning] = useState("");
  const [user, setUser] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const handleChange = (e: any) => {
    let nam = e.target.name;
    let val = e.target.value;
    if (nam === "confirmPassword" && val !== user.password) {
      setWarning("Password dosent match");
    } else {
      setWarning("");
    }
    setUser({ ...user, [nam]: val });
  };
  const addUser = (e: any) => {
    fetch("http://localhost:5000/users/register", {
      method: "POST",
      body: JSON.stringify({
        name: user.name,
        password: user.password,
        email: user.email,
      }),
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      if (response.status === 201) {
        console.log(await response.text());
        history.push("/");
      } else if (response.status === 409) {
        console.log("Already registered please sign in");
      } else console.log("Error in registering try again");
    });
  };
  return (
    <div className="addForm">
      <h2 style={{ color: "rgb(240, 106, 106)", margin: "1.5vw" }}>Register</h2>
      <form onSubmit={addUser}>
        <div className="form-group row">
          <label className="label col-sm-2 col-form-label">Name:</label>
          <input
            className="input form-control"
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Enter name"
            autoComplete="off"
          ></input>
        </div>
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
        <div className="form-group row">
          <label className="label col-sm-2 col-form-label">
            Confirm password:
          </label>
          <input
            className="input form-control"
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            placeholder="confirm pasword"
            autoComplete="off"
          ></input>
          <br></br>
          <p style={{ marginLeft: "35vw" }}>{warning}</p>
        </div>

        <button className="navLink submitBtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
