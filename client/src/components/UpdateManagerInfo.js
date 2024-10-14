import '../styles/UpdateManagerInfo.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useManager } from '../components/ManagerContext';
import Navbar from './Navbar';
import SideBar from './SideBar';
import toast from 'react-hot-toast';

export default function UpdateUserInfo() {
  const { ManagerData, updateManagerData } = useManager();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    if (ManagerData) {
      setFormData({
        firstName: ManagerData?.firstName || '',
        lastName: ManagerData?.lastName || '',
        email: ManagerData?.email || '',
      });
    }
  }, [ManagerData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (fieldToUpdate) => {
    try {
      const id = localStorage.getItem('managerid');
      const updatedData = { [fieldToUpdate]: formData[fieldToUpdate] };
      const res = await axios.patch(`http://localhost:5000/api/manager/${id}`, updatedData);

      console.log("update", updatedData);
      console.log('Data sent', res.data);

      // Update formData immediately
      setFormData(prevFormData => ({
        ...prevFormData,
        [fieldToUpdate]: res.data[fieldToUpdate]
      }));

      // Create new manager data object
      const newManagerData = { ...ManagerData, [fieldToUpdate]: res.data[fieldToUpdate] };

      // Update context
      updateManagerData(newManagerData);
      toast.success("success")

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    
   
      <div className="container mt-5">
        <div className="row justify-content-center ">
          <div className="col-md-7">
            <div className="card">
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Profile</h3>
              </div>
              <div className="card-body">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-3 row align-items-center">
                    <label htmlFor="firstName" className="col-sm-3 col-form-label">First Name</label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-2">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => handleSubmit('firstName')}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                  <div className="mb-3 row align-items-center">
                    <label htmlFor="lastName" className="col-sm-3 col-form-label">Last Name</label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-2">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => handleSubmit('lastName')}
                      >
                       Save
                      </button>
                    </div>
                  </div>
                  <div className="mb-3 row align-items-center">
                    <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-2">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => handleSubmit('email')}
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
