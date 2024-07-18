import { useState } from 'react';
import Link from 'next/link';

function SignIn() {

        const [SignUpfirstname, setSignUpfirstname] = useState('')
        const [SignUpusername, setSignUpusername] = useState('')
        const [SignUppassword, setSignUppassword] = useState('')
    

        const handleSignUp= () => {
            fetch('http://localhost:3000/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: signUpUsername, password: signUpPassword }),
            }).then(response => response.json())
                .then(data => {
                    if (data.result) {
                        dispatch(login({ username: signUpUsername, token: data.token }));
                        setSignUpfirstname('');
                        setSignUpusername('');
                        setSignUppassword
                        // setIsModalVisible(false)
                    }
                });
        };



        // function handleLogin(e) {
        //     e.preventDefault()
        //     // dispatch()
        //     props.toggle()
        // }

        const changePage = () => {

        }

    
        return (

            <div className="popup">
                <div className="popup-inner">

                    <button OnClick={() => } type="close">X</button>

                    <Image
                    src="https://get-picto.com/gratuit/logo-twitter-noir-png/"
                    alt="Logo"
                    width={50}
                    height={50} />

                    <h2>Create your Hackatweet account</h2>
                    <form onSubmit={handleLogin}>

                        <label>
                            Firstame:
                            <input type="text" value={firstname} onChange={e =>} placeholder="Firstname"/>
                        </label>

                        <label>
                            Username:
                            <input type="text" value={username} onChange={e => } placeholder="Username" />
                        </label>

                        <label>
                            Password:
                            <input type="password" value={password} onChange={e => } placeholder="Password"/>
                        </label>
                        
                        <button type="submit"></button>
                    </form>
                </div>
            </div>
        )
    }

   
   export default SignIn;