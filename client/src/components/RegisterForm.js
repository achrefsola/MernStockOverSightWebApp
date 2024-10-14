import React , {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../styles/LogForm.css'
import { useManager } from './ManagerContext';
import { useEffect } from 'react';


export default function RegisterForm() {
  const {ManagerData}=useManager();
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    lastName:'',
    firstName:'',
    email: '',
    password :'',
    
    
  });
  useEffect(() => {
    if (ManagerData) {
        navigate('/dashboard');
    }
}, [ManagerData, navigate]);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');

    try {
      const res = await axios.post('http://localhost:5000/api/manager/register', formData);
    
      console.log('register Data sent', res.data);
      
      
      const managerId = res.data.id;
    
    
    
      navigate('/login');
     
      setFormData({  firstName:'',lastName:'',email: '',password :''});
      
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("user already exists" )
      
    }
    
  };
   if (ManagerData){
    return null 
   }
  


    return (
      <div className='body'>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card  text-white">
              <div className="card-body">
                <h2 className="card-title text-center">Register</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">FirstName</label>
                    <input type="text" className="form-control" id="firstName" placeholder="Enter your First Name" name="firstName" value={formData.firstName} onChange={handleChange}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">lastName</label>
                    <input type="text" className="form-control" id="lastName" placeholder="Enter your last Name" name="lastName" value={formData.lastName} onChange={handleChange}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className="form-control" id="email" placeholder="Enter your Email" name="email" value={formData.email} onChange={handleChange}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter your Password" name="password" value={formData.password} onChange={handleChange}/>
                  </div>
                  <button type="submit" className="btn btn-primary-login">Register</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }