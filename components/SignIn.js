import { useState } from 'react';
const mongoose = require('mongoose');
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../reducers/user';
import Image from 'next/image';
const fetch = require('node-fetch');


// pop-up Créer un compte

function SignIn(props) {

    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch (); 
        
        const [SignInusername, setSignInusername] = useState('')
        const [SignInpassword, setSignInpassword] = useState('')
    
        const handleSignIn = () => {
            fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({username: SignInusername, password: SignInpassword}),
            }).then(response => response.json())
                .then(data => {
                    if (data.result) {
                        dispatch(signIn({ username: SignInusername, token: data.token }));
                        setSignInusername('');
                        setSignInpassword('')
                        
                    }
                });
        };


        const handleClick = () => {
            props.toggle()
          };

          const handleButton = () => {
            return <Link href="/Home"/>
          }
         
        return (

            <div className="popup">
                <div className="popup-inner">

                    <Image
                    src="/logo-twitter-noir-png.png"
                    alt="Logo"
                    width={50}
                    height={50} 
                    />

                    
                    <button onClick={() => handleClick()} type="close">X</button>
                  
                    <h2>Connect to Hackatweet</h2>
                        <form>
                            <input type="text" value={SignInusername} onChange={e => setSignInusername(e.target.value)} placeholder="Username" />
                            <input type="password" value={SignInpassword} onChange={e => setSignInpassword(e.target.value)} placeholder="Password"/>
                            <Link href="/tweet">
                            <button  type="submit" onClick={() => handleSignIn() }>Sign in</button>
                            </Link>
                         </form>
                </div>
            </div>
        )
    }

   
   export default SignIn;