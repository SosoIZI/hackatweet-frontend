function SignUp() {

    const handleSignIn = () => {
    
        fetch('http://localhost:3000/users/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: signInUsername, password: signInPassword }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(login({ username: signInUsername, token: data.token }));
                    setSignInUsername('');
                    setSignInPassword('');
                    setIsModalVisible(false)
                }
            });
    };
    
    return (

    <div>

    </div>
    )
   }
   
   export default Login;