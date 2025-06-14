import '../styles/auth.css';

const Login = () => {
    
    return (
        <div className='container'>
            <div className='auth-form'>
                <div className='form-header'>
                    <h1>Wellcome Back!</h1>
                    <p className='text-center'>Please fill in the details below to log in to your account.</p>
                </div>
                <form>
                    <div>
                        <div className='input-group'>
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                className='input-bx'
                                placeholder='username/email/contact'
                            />
                            <p className='error'>*validation</p>
                        </div>
                        <div className='input-group'>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className='input-bx'
                                placeholder='password' />
                                <p className='error'>*validation</p>
                        </div>
                    </div>
                    <button className='action-btn'>Login</button>
                    <p className='error'>*validation</p>
                    <p className='text-center'>Don't have an acount? <a href="/register">create one</a></p>
                </form>
            </div>
        </div>
    )
}

export default Login