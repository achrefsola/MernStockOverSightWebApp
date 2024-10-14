
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import '../styles/PopUp.css'
import toast from 'react-hot-toast';
import { useManager } from './ManagerContext';
import SwitchButton from './SwitchButton'


export default function AddCategory(props){

  const {CategoryData,fetchCategoryData}= useManager()
  const [buttonPopup, setButtonPopup] = useState(false);
  const [formData, setFormData] = useState({
    
    categoryName: '',
    
    
    
  });
 // Effects
 useEffect(() => {
  if (props.CategoryId && props.mode === 'edit') {
    fetchSelectedCategoryData();
  }else {
    resetFormData();
  }
}, [props.CategoryId, props.mode,props.trigger]);

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


  //Event Handlers
  const handlePopupCloseClick = ()=>{
    
    resetFormData()
    props.setTrigger(false)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log('handle change working now ')
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');

    if (props.mode==='create'){
    try {
      const res = await axios.post('http://localhost:5000/api/category/create', formData);
      console.log('Data sent', res.data);
      setFormData({  categoryName: '',});
      toast.success('category created successfully');
      props.setTrigger(false);
    
      console.log('props data ', props.data);
      console.log('res data ', res.data)
      props.setCategoryData(props.data);
      fetchCategoryData()/// the data is refetched caus of the issue of the Category name is not updated only after reload 
     
      
     
    
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('category already exists');
    }
  }
  else if (props.mode === 'edit') {
   
    try {
      console.log('form data',formData)
      const res = await axios.patch(`http://localhost:5000/api/category/${props.CategoryId}`, formData);
      console.log('Data updated', res.data);
      setFormData({categoryName: '', });
      toast.success('category updated successfully');
      props.setTrigger(false);
      props.setCategoryData(props.data);
      fetchCategoryData();

    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('An error occurred');
    }
    }
  };
  const fetchSelectedCategoryData= async ()=>{
    console.log("id arrived ", props.CategoryId)
    try{
    const CategoryId = props.CategoryId
    const response = await axios.get(`http://localhost:5000/api/category/${CategoryId}` )
    console.log('Data sent', response.data);
    setFormData({
     
      categoryName: response.data?.categoryName || '',
      
      
        
        
        
    })
    
  
    } catch (error) {
      console.error('Error fetching dCategory data :', error);
    }
  }
  const resetFormData = () => {
    setFormData({
      categoryName: '',
     
     
    });
  };
  console.log('mode',props.mode)
console.log('Category id',props.CategoryId)

  return props.trigger ? (
    <div className="popup">
    <div className="popup-inner">
        <button className="close-btn" onClick={handlePopupCloseClick}>×</button>
        {props.children}
        
        <form onSubmit={handleSubmit}>
            <br></br>
            <br></br>
            <div className="mb-3">
                <label htmlFor="categoryName" className="form-label">Category name</label>
                <input type="text" className="form-control" id="categoryName" placeholder="New category" name="categoryName" value={formData.categoryName} onChange={handleChange} />
            </div>
            
            
           
            
            
            
            <div className="button-container">
                <button type="submit" className="btn btn-success">Confirm</button>
            </div>
        </form>
    </div>
</div>
  ): null;
}
