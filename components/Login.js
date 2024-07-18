import Image from 'next/image';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useState } from 'react';

// page d'accueil - 1ère page

function Login() {

    
const [isToggleVisible, setToggleIsVisible] = useState(false)
const [isToggleVisible2, setToggleIsVisible2] = useState(false)

    function togglePop () {
        setToggleIsVisible(!isToggleVisible);
    };

    function togglePop2 () {
        setToggleIsVisible2(!isToggleVisible2)
        
    }


    return (

    <div>
        <div>
            <span></span>
        </div>
        <div>
            <div>
            <Image
                    src="/logo-twitter-noir-png.png"
                    alt="Logo"
                    width={60}
                    height={60} />
                <h1>See what's happening</h1>
            </div>
            <>
                <title>Join Hackatweet today</title>

                <button onClick={togglePop}>Signup</button>
                {isToggleVisible && <SignUp toggle={togglePop}/>} 
                <p>Already have an account</p>
                <button onClick={togglePop2}>Signin</button>
                {isToggleVisible2 && <SignIn toggle={togglePop2}/>} 
            </>

        </div>
    </div>
    )
   }
   
   export default Login;

   
    