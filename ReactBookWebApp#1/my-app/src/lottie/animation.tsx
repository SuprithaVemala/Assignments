
import Lottie from 'react-lottie';
import animationData from './booksAnimation.json';
export default function Animation() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    
    return (
      <div>
        <Lottie 
          options={defaultOptions}
          height={120}
          width={120}
          style={{display:"inline-block"}}
        />
        <h1 style={{display:"inline-block",marginTop:"1.8vw"}} className="header-title">BookApp</h1>
      </div>
    );
  }