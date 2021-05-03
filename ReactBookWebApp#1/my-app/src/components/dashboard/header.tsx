import Animation from "../../lottie/animation";
import NavLink from "./navLink";
interface Props {}

export default function Header({}: Props) {
  let links = [
    ["Books", "/"],
    ["Add Book", "/addNewBook"],
    ["Authors", "/"],
    ["Add Author", "/"],
  ];

  return (
    <div className="header">
      <div style={{display:"inline-block"}}  >
        <Animation  />
        
      </div>

      <div className="navGroup">
        {links.map(([name, url]) => (
          <NavLink url={url} name={name}></NavLink>
        ))}
      </div>
    </div>
  );
}
