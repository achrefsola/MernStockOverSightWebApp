
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useManager } from '../components/ManagerContext';
import toast from 'react-hot-toast';
import noImage from "../img/No_Image_Available.jpg";
import '../styles/UpdateManagerPic.css'

export default function UpdateUserPic() {
  const { ManagerData, updateManagerData } = useManager();
  const [image, setImage] = useState(null);
  const fileInputRef = useRef()

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    

    const data = new FormData();
    if (!image){
        toast.error("Please select an image ")
        return null
    }
    if (image) {
      data.append('image', image);
    }

    try {
      const id = localStorage.getItem('managerid');
      const res = await axios.patch(`http://localhost:5000/api/manager/updatepic/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Data sent', res.data);

 
      const newManagerData = { ...ManagerData, image: res.data.image };

      // Update context
      updateManagerData(newManagerData);
      fileInputRef.current.value='';
      setImage(null);
      toast.success('success')
      
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='profile-pic-details'>

    <form className='profile-pic-form' onSubmit={handleSubmit}>
      <div className="custom-mb-3 custom-row custom-align-items-center">
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Profile Picture</label>
          <input type="file" className="form-control" id="image" ref={fileInputRef} onChange={handleImageChange} />
        </div>
      </div>
      <button type="submit" className="btn btn-primary" style={{zIndex:1000}}>Update Picture</button>
    </form>
     <div className="avatar-lg">
     {ManagerData.image?
       <img
         src={`http://localhost:5000/${ManagerData.image}`} className="img-fluid rounded-circle img-thumbnail" />:<img src={noImage}className="img-fluid rounded-circle"></img>}
     </div>
     </div>
  );
}
