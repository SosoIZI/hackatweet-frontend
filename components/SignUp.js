import { useState } from 'react';
// import Link from 'next/link';
const mongoose = require('mongoose');
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../reducers/user';
import Image from 'next/image';
const fetch = require('node-fetch');

// pop-up Créer un compte

function SignUp(props) {

    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch (); 

        const [SignUpfirstname, setSignUpfirstname] = useState('')
        const [SignUpusername, setSignUpusername] = useState('')
        const [SignUppassword, setSignUppassword] = useState('')
    
        const handleSignUp= () => {
            fetch('http://localhost:3000/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstname: SignUpfirstname, username: SignUpusername, password: SignUppassword }),
            }).then(response => response.json())
                .then(data => {
                    if (data.result) {
                        dispatch(signUp({firstname: SignUpfirstname, username: SignUpusername, token: data.token }));
                        setSignUpfirstname('');
                        setSignUpusername('');
                        setSignUppassword('')
                        
                    }
                });
        };


        const handleClick = () => {
            props.toggle()
          };

        //   const handleButton = () => {
        //     return <Link href="/Home"/>
        //   }
         
        return (

            <div className="popup">
                <div className="popup-inner">

                    <button onClick={() => handleClick()} type="close">X</button>

                    <Image
                    src="/logo-twitter-noir-png.png"
                    alt="Logo"
                    width={50}
                    height={50} 
                    />
                  
                    <h2>Create your Hackatweet account</h2>
                    <div >
                            <input type="text" value={SignUpfirstname} onChange={e => setSignUpfirstname(e.target.value)} placeholder="Firstname"/>
                            <input type="text" value={SignUpusername} onChange={e =>  setSignUpusername(e.target.value)} placeholder="Username" />
                            <input type="password" value={SignUppassword} onChange={e => setSignUppassword(e.target.value)} placeholder="Password"/>
                            <button type="submit" onClick={() => handleSignUp() }>Sign up</button>
                    </div>
                </div>
            </div>
        )
    }

   
   export default SignUp;