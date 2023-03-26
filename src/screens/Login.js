import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom';

export default function Login() {
  let navigate = useNavigate();
  const [credentials,setCredentials] = useState({email:"",password:""});
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/loginuser',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const vari = await response.json()
        console.log(vari);
        if(vari.success==false)alert("Enter valid credentials");
        if(vari.success){
          localStorage.setItem("userEmail",credentials.email);
          localStorage.setItem("authToken",vari.authToken);
          navigate('/');}

    }
    const onChange=(event)=>{
        setCredentials({...credentials,[event.target.name]:event.target.value});
    }
  return (
    <div className='container'>
        <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange}/>
  </div>
  <button type="submit" className=" m-3 btn btn-primary">Submit</button>
  <Link to="/signup" className='m-3 btn btn-danger'>New User?</Link>
</form>
    </div>
  )
}
