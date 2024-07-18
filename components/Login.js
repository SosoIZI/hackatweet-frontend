import Image from 'next/image';
const [toggleIsVisible, setToggleIsVisible] = useState(false)

function Login() {

    function togglePop () {
        setToggleIsVisible(!toggleIsVisible);
    };

    return (

    <div>
        <div>
            <span></span>
        </div>
        <div>
            <>
            <Image
                    src='https://get-picto.com/gratuit/logo-twitter-noir-png/'
                    alt="Logo"
                    width={60}
                    height={60} />
                <h1>See what's happening</h1>
            </>
            <>
                <title>Join Hackatweet today</title>

                <button onClick={togglePop}>Signup</button>
                {toggleIsVisible && <SignIn toggle={togglePop}/> } 

                <p>Already have an account ONCLICK</p>
                <button>Signin</button>
            </>

        </div>
    </div>
    )
   }
   
   export default Login;

   
    