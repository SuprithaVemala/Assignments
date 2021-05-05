
import Lottie from 'react-lottie';
import animationData from './58718-404-error-page.json';
export default function BookNotFound() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    console.log("hello")
    return (
      <div>
        <h3 style={{textAlign:"center",color:"red"}}>Book Not found</h3>
        <Lottie 
          options={defaultOptions}
          height={300}
          width={500}
        />
      </div>
    );
  }