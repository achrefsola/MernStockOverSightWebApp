import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useManager } from './ManagerContext';
import toast, { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/PopUp.css';

export default function CompanyInfo(props) {
  const { ManagerData, fetchCompanyData } = useManager();
  const [formData, setFormData] = useState({
    companyName: '',
    companyAddress: '',
    companyRegion: '',
    companyPostalCode: '',
    companyPhone: '',
    companyEmail: '',
    companyLogo: null,
    managerId: '',
    _id: ''
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (ManagerData) {
      setFormData((prevData) => ({
        ...prevData,
        managerId: ManagerData._id,
      }));
    }
  }, [ManagerData]);

 

  useEffect(() => {
    if (props.mode === 'edit' && props.data && Array.isArray(props.data) && props.data.length > 0) {
      const company = props.data[0];
      setFormData({
        companyName: company.companyName || '',
        companyAddress: company.companyAddress || '',
        companyRegion: company.companyRegion || '',
        companyPostalCode: company.companyPostalCode || '',
        companyPhone: company.companyPhone || '',
        companyEmail: company.companyEmail || '',
        companyLogo: null,
        managerId: company.managerId || ManagerData?._id || '',
        _id: company._id || ''
      });
      setImage(company.companyLogo);
    }
  }, [props.mode, props.data, ManagerData]);

  useEffect(() => {
    if (props.mode === 'create') {
      resetFormData();
    }
  }, [props.mode]);

  useEffect(() => {
    if (!props.trigger) {
      resetFormData();
    }
  }, [props.trigger]);

  useEffect(() => {
    if (props.trigger && props.mode==='edit') {
      fetchCompanyData();
    }
  }, [props.trigger,props.mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      companyLogo: e.target.files[0] || null,
    }));
  };

  const handlePopupCloseClick = () => {
    resetFormData();
    props.setTrigger(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.managerId) {
      toast.error("Manager ID is required");
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      if (formData[key] !== '' && formData[key] !== null) {
        if (key === 'companyLogo' && formData[key] instanceof File) {
          data.append(key, formData[key]);
        } else {
          data.append(key, formData[key]);
        }
      }
    }

    if (!formData.companyLogo && image) {
      data.append('companyLogo', image);
    }

    try {
      let response;
      if (props.mode === 'create') {
        response = await axios.post('http://localhost:5000/api/company/create', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
       
        toast.success('Company created successfully');
        fetchCompanyData();
      } else if (props.mode === 'edit') {
        response = await axios.patch(`http://localhost:5000/api/company/${formData._id}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
       
        toast.success('Company updated successfully');
      }
      console.log('Company submitted successfully', response.data);
      props.setTrigger(false);
      fetchCompanyData();
    } catch (error) {
      console.error('There was an error submitting the company!', error);
      toast.error('Error submitting company');
    }
  };

  const resetFormData = () => {
    setFormData({
      companyName: '',
      companyAddress: '',
      companyRegion: '',
      companyPostalCode: '',
      companyPhone: '',
      companyEmail: '',
      companyLogo: null,
      managerId: ManagerData?._id || '',
      _id: ''
    });
    setImage(null);
  };

  console.log('mode', props.mode);

  return (props.trigger && (props.mode === "create" || props.mode === "edit")) ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={handlePopupCloseClick}>×</button>
        <h2 className="custom-card-title custom-text-center">{props.mode === 'create' ? 'Add Company Information' : 'Edit Company Information'}</h2>
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="companyName" className="form-label">Company Name</label>
            <input
              type="text"
              className="form-control"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="companyAddress" className="form-label">Company Address</label>
            <input
              type="text"
              className="form-control"
              id="companyAddress"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="companyRegion" className="form-label">Company Region</label>
            <input
              type="text"
              className="form-control"
              id="companyRegion"
              name="companyRegion"
              value={formData.companyRegion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="companyPostalCode" className="form-label">Postal Code</label>
            <input
              type="number"
              className="form-control"
              id="companyPostalCode"
              name="companyPostalCode"
              value={formData.companyPostalCode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="companyPhone" className="form-label">Phone</label>
            <input
              type="number"
              className="form-control"
              id="companyPhone"
              name="companyPhone"
              value={formData.companyPhone}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="companyEmail" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="companyEmail"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="companyLogo" className="form-label">Logo</label>
            <input
              type="file"
              className="form-control"
              id="companyLogo"
              name="companyLogo"
              onChange={handleFileChange}
            />
          </div>
          {props.mode === 'edit' && image && (
            <div className="image-container">
              <img src={`http://localhost:5000/${image}`} alt="Company Logo" className="small-image" />
            </div>
          )}
          <div className="button-container">
            <button type="submit" className="btn btn-success">
              {props.mode === 'create' ? 'Create Company' : 'Update Company'}
            </button>
          </div>
        </form>
        <Toaster />
      </div>
    </div>
  ) : null;
}
