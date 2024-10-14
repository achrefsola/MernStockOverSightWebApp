import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/PopUp.css';
import toast from 'react-hot-toast';
import { useManager } from './ManagerContext';
import SwitchButton from './SwitchButton';
import { FaPlus } from "react-icons/fa";
import AddSupplier from './AddSupplier';

export default function AddProduct(props) {
  const { SupplierData, fetchProductData, setSupplierData, CategoryData } = useManager();
 const [buttonPopup, setButtonPopup] = useState(false); 
  const [formData, setFormData] = useState({
    product: '',
    status: false,
    category: '',
    buyprice: '',
    price: '',
    supplierName: '',
    stock: '',
    image : null 
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (props.productId && props.mode === 'edit') {
      fetchSelectedProductData();
    } else {
      resetFormData();
    }
  }, [props.productId, props.mode, props.trigger]);

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

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePopupCloseClick = () => {
    resetFormData();
    props.setTrigger(false);
  };

  const handleToggleSwitch = () => {
    setFormData(prev => ({ ...prev, status: !prev.status }));
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');

    const data = new FormData();
    data.append('product', formData.product);
    data.append('status', formData.status);
    data.append('category', formData.category);
    data.append('buyprice', formData.buyprice);
    data.append('price', formData.price);
    data.append('supplierName', formData.supplierName);
    data.append('stock', formData.stock);
    if (image) {
      data.append('image', image);
      console.log('image exists')
    }

   

    try {
      let res;
      if (props.mode === 'create') {
        res = await axios.post('http://localhost:5000/api/product/create', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Product created successfully');
      } else if (props.mode === 'edit') {
        res = await axios.patch(`http://localhost:5000/api/product/${props.productId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Product updated successfully');
      }

      console.log('Data sent', res.data);
      resetFormData();
      props.setTrigger(false);
      fetchProductData();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred');
    }
  };

  const fetchSelectedProductData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/product/${props.productId}`);
      console.log('Fetched product data:', response.data);
      setFormData({
        product: response.data?.product || '',
        status: response.data?.status || false,
        category: response.data?.category || '',
        buyprice: response.data?.buyprice || '',
        price: response.data?.price || '',
        supplierName: response.data?.supplierName || '',
        stock: response.data?.stock || '',
        image:response.data?.image ||''
      });
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const resetFormData = () => {
    setFormData({
      product: '',
      status: false,
      category: '',
      buyprice: '',
      price: '',
      supplierName: '',
      stock: '',
    });
    setImage(null);
  };


  return (props.trigger && (props.mode === "create" || props.mode === "edit")) ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={handlePopupCloseClick}>×</button>
        {props.children}
        <form onSubmit={handleSubmit}>
          <br /><br />
          <div className="mb-3">
            <label htmlFor="product" className="form-label">Product Name</label>
            <input type="text" className="form-control" id="product" placeholder="New Product" name="product" value={formData.product} onChange={handleChange} />
          </div>
          <div className='product-status'>
            <label> Product status</label>
            <div className='actif-inactif'>
              <p>Inactif</p>
              <SwitchButton isChecked={formData.status} onChange={handleToggleSwitch} />
              <p>Actif</p>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select className="form-control" id="category" name="Category" value={formData.category} onChange={handleChange}>
              <option value="">Select a category</option>
              {CategoryData.map(category => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="buyprice" className="form-label">Buy price</label>
            <input type="number" className="form-control" id="buyprice" placeholder="Buy price" name="buyprice" value={formData.buyprice} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Sell price</label>
            <input type="number" className="form-control" id="price" placeholder="Sell price" name="price" value={formData.price} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="supplierName" className="form-label">Supplier</label>
            <select className="form-control" id="supplierName" name="supplierName" value={formData.supplierName} onChange={handleChange}>
              <option value="">Select a Supplier</option>
              {SupplierData.map(supplier => (
                <option key={supplier._id} value={supplier._id}>
                  {supplier.supplierName} - {supplier.fiscalNumber}
                </option>
              ))}
            </select>
            <div className='supplier-add'>
              <p>No supplier? Add one...</p>
              <FaPlus className="addicon" onClick={() => setButtonPopup(true)} />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="stock" className="form-label">Actual Stock</label>
            <input type="number" className="form-control" id="stock" placeholder="Stock" name="stock" value={formData.stock} onChange={handleChange} />
          </div>
          
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Media</label>
              <input type="file" className="form-control" id="image" onChange={handleImageChange} />
            </div>
            {props.mode === 'edit' && (
              <div className="image-container">
              {formData.image ? (
              <img src={`http://localhost:5000/${formData.image}`} alt="Product" className="small-image" />) : "nodat"}

                </div>)}

          <div className="button-container">
            <button type="submit" className="btn btn-success">Confirm</button>
          </div>
        </form>
      </div>
      <AddSupplier trigger={buttonPopup} data={SupplierData} setTrigger={setButtonPopup} setSupplierData={setSupplierData} mode={"create"} />
    </div>
  ) : null;
}
