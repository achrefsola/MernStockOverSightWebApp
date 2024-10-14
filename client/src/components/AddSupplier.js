
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import '../styles/PopUp.css'
import toast from 'react-hot-toast';
import { useManager } from './ManagerContext';
import SwitchButton from './SwitchButton'


export default function AddSupplier(props){

  const {SupplierData,fetchSupplierData}= useManager()
  const [buttonPopup, setButtonPopup] = useState(false);
  const [formData, setFormData] = useState({
    
    supplierName: '',
    contact: '',
    fiscalNumber: '',
    email : '',
    
    
  });
 // Effects
 useEffect(() => {
  if (props.SupplierId && props.mode === 'edit') {
    fetchSelectedSupplierData();
  }else {
    resetFormData();
  }
}, [props.SupplierId, props.mode,props.trigger]);

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
      const res = await axios.post('http://localhost:5000/api/supplier/create', formData);
      console.log('Data sent', res.data);
      setFormData({  supplierName: '',contact: '',email:'',fiscalNumber:''});
      toast.success('supplier created successfully');
      props.setTrigger(false);
    
      console.log('props data ', props.data);
      console.log('res data ', res.data)
      props.setSupplierData(props.data);
      fetchSupplierData()/// the data is refetched caus of the issue of the supplier name is not updated only after reload 
     
      
     
    
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Fiscal number already exists');
    }
  }
  else if (props.mode === 'edit') {
   
    try {
      console.log('form data',formData)
      const res = await axios.patch(`http://localhost:5000/api/supplier/${props.SupplierId}`, formData);
      console.log('Data updated', res.data);
      setFormData({supplierName: '',contact: ''  });
      toast.success('Supplier updated successfully');
      props.setTrigger(false);
      props.setSupplierData(props.data);
      fetchSupplierData();

    } catch (error) {
      console.error('Error updating supplier:', error);
      toast.error('An error occurred');
    }
    }
  };
  const fetchSelectedSupplierData = async ()=>{
    console.log("id arrived ", props.SupplierId)
    try{
    const SupplierId = props.SupplierId
    const response = await axios.get(`http://localhost:5000/api/supplier/${SupplierId}` )
    console.log('Data sent', response.data);
    setFormData({
     
      supplierName: response.data?.supplierName || '',
      contact: response.data?.contact || '',
      fiscalNumber: response.data?.fiscalNumber ||'',
      email : response.data?.email ||'',
      
        
        
        
    })
    
  
    } catch (error) {
      console.error('Error fetching product data :', error);
    }
  }
  const resetFormData = () => {
    setFormData({
      supplierName: '',
      contact: '',
      fiscalNumber: '',
      email : '',
     
    });
  };
  console.log('mode',props.mode)
console.log('Supplier id',props.SupplierId)

  return props.trigger ? (
    <div className="popup">
    <div className="popup-inner">
        <button className="close-btn" onClick={handlePopupCloseClick}>×</button>
        {props.children}
        
        <form onSubmit={handleSubmit}>
            <br></br>
            <br></br>
            <div className="mb-3">
                <label htmlFor="supplierName" className="form-label">Supplier name</label>
                <input type="text" className="form-control" id="supplierName" placeholder="New supplier" name="supplierName" value={formData.supplierName} onChange={handleChange} />
            </div>
            
            <div className="mb-3">
                <label htmlFor="contact" className="form-label">Phone number</label>
                <input type="number" className="form-control" id="contact" placeholder="Phone number" name="contact" value={formData.contact} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor=" fiscalNumber" className="form-label">Fiscal number</label>
                <input type="text" className="form-control" id="fiscalNumber" placeholder="XXXXXXX/X/X/X/XXX" name=" fiscalNumber" value={formData.fiscalNumber} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="text" className="form-control" id="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            
           
            
            
            
            <div className="button-container">
                <button type="submit" className="btn btn-success">Confirm</button>
            </div>
        </form>
    </div>
</div>
  ): null;
}
