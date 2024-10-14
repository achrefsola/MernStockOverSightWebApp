import axios from 'axios';
import { FaTrashAlt,FaPencilAlt } from 'react-icons/fa';
import '../styles/ProductList.css'
import { useManager } from '../components/ManagerContext';
import { useState, useEffect } from 'react';
import AddProduct from './AddProduct';
import Confirm from'./Confirm'
import noImage from "../img/No_Image_Available.jpg";
import Loader from '../components/Loader';




import toast from 'react-hot-toast'

const ProductTable = () => {
  const { ProductData , setProductData,loading, fetchProductData  } = useManager();
  const [buttonPopup, setButtonPopup] = useState(false); 
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [actionToConfirm, setActionToConfirm] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [popupMode,setPopupMode] =useState('')
  
useEffect(() => {
  
    fetchProductData()
      
}, []);
  const confirmAction = () => {
    if (actionToConfirm && selectedProductId) {
      actionToConfirm(selectedProductId);
    }
    setShowConfirmation(false);
  };
   

  const handleDeleteClick = (ProductId) => {
    setSelectedProductId(ProductId);
    setActionToConfirm(() => handleDelete);
    setShowConfirmation(true);
  };
  
  const handleUpdateClick = (ProductId) => {
    setPopupMode("edit")
    setButtonPopup(true)
    setSelectedProductId(ProductId);
   
    
    
  };


  const handleCreateClick = ()=>{
    setPopupMode("create")
    setButtonPopup(true)
    setSelectedProductId(null)


  }

  const handleClick = (productId) => {
     handleUpdateClick(productId)
     
  };
  
  

  const handleDelete = async (ProductId) => {
   
    try {
      const response = await axios.delete(`http://localhost:5000/api/product/${ProductId}`);
      setProductData(ProductData.filter((product) => product._id !== ProductId));
      console.log('Product deleted successfully:', response.data);
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };



 
 /* const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };*/

  console.log('data',ProductData)
  if (!ProductData) {
    return <Loader/>
}
  

return (
  <div className="bodymanager">
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Products</h3>
          <button className="btn btn-light btn-sm" onClick={handleCreateClick}>
            &#43; Add new product
          </button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Reference</th>
                  <th>Status</th>
                  <th>Category</th>
                  <th>Buy price</th>
                  <th>Sell price</th>
                  <th>Supplier</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {ProductData.map((product,index) => (
                  <tr key={product._id}>
                    <td>{index+1}</td>
                    <td>
                      <div className='image-product-name'>
                      <div className="image-container">
                        {product.image?
                        <img src={`http://localhost:5000/${product.image}`} className="small-image"/>:<img src={noImage}className="small-image"></img>}
                          <div className="image-preview">
                          {product.image?
                            <img src={`http://localhost:5000/${product.image}`} className="large-image"/>:<img src={noImage}className="small-image"></img>}
                          </div>

                        </div>
                        &nbsp;
                        <td>
                            <div class="tooltip-container">
                              <div class="product-name">
                                {product.product}
                              </div>
                              <div class="tooltip-text">
                                {product.product} 
                              </div>
                            </div>
                          </td>
                        </div>
                   </td>
                   <td>
                      <div class="tooltip-container">
                        <div class="product-name">
                        {product.reference}
                        </div>
                        <div class="tooltip-text">
                        {product.reference}
                        </div>
                      </div>
                    </td>
                    <td>
                    <span className={`badge ${product.status ? 'bg-success' : 'bg-warning'}`}>
                          {product.status ? "Actif" : "Inactif"}
                        </span>
                      </td>
                    <td>{product.category?product.category.categoryName:"no data"}</td>
                    <td>{product.buyprice} TND</td>
                    <td>{product.price} TND</td>
                    <td>{product.supplierName ? product.supplierName.supplierName : "No data"}</td>
                    <td>{product.stock}</td>
                    
                    <td>
                      <FaTrashAlt className="deleteicon" onClick={() => handleDeleteClick(product._id)} />
                      <FaPencilAlt className="modicon" onClick={() => handleClick(product._id)} />
                    </td>
                  </tr>
                ))}
                <AddProduct
                  trigger={buttonPopup}
                  data={ProductData}
                  setTrigger={setButtonPopup}
                  setProductData={setProductData}
                  productId={selectedProductId}
                  mode={popupMode}
                />
                <Confirm
                  show={showConfirmation}
                  title="Confirm Action"
                  message="Are you sure you want to perform this action?"
                  onConfirm={confirmAction}
                  onCancel={() => setShowConfirmation(false)}
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default ProductTable;
