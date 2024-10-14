import '../styles/UpdateManagerInfo.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useManager } from '../components/ManagerContext';
import Button from './Button';
import toast from 'react-hot-toast';
import Navbar from './Navbar';
import SideBar from './SideBar';


export default function UpdateUserInfo() {
  const { ManagerData, updateManagerData } = useManager();

  const [formData, setFormData] = useState({
    password: '',
    newpassword: '',
    cnewpassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    if (formData.newpassword !== formData.cnewpassword) {
      toast.error('New password and confirmation do not match');
      return;
    }

    try {
      const id = localStorage.getItem('managerid');
      const response = await axios.post(`http://localhost:5000/api/manager/changepassword`, {
        id,
        password: formData.password,
        newpassword: formData.newpassword,
        cnewpassword: formData.cnewpassword,
      });

      console.log('Data sent', response.data);

      if (response.data.message === 'Password successfully changed') {
        toast.success('Password updated successfully');
        setFormData({
          password: '',
          newpassword: '',
          cnewpassword: '',
        });
      } else {
        toast.custom(response.data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
   
    
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div className="card">
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Security</h3>
              </div>
              <div className="card-body">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-3 row align-items-center">
                    <label htmlFor="password" className="col-sm-3 col-form-label">Current Password</label>
                    <div className="col-sm-7">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="mb-3 row align-items-center">
                    <label htmlFor="newpassword" className="col-sm-3 col-form-label">New Password</label>
                    <div className="col-sm-7">
                      <input
                        type="password"
                        className="form-control"
                        id="newpassword"
                        value={formData.newpassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="mb-3 row align-items-center">
                    <label htmlFor="cnewpassword" className="col-sm-3 col-form-label">Confirm New Password</label>
                    <div className="col-sm-7">
                      <input
                        type="password"
                        className="form-control"
                        id="cnewpassword"
                        value={formData.cnewpassword}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-2">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleSubmit}
                      >
                        Save 
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  
  );
}
