import axios from 'axios';
import { FaTrashAlt,FaPencilAlt } from 'react-icons/fa';
import '../styles/ProductList.css'
import { useManager } from '../components/ManagerContext';
import { useState, useEffect, useCallback } from 'react';
import AddCategory from './AddCategory';
import Confirm from'./Confirm'
import AddSupplier from './AddSupplier';
import Loader from '../components/Loader';



import toast from 'react-hot-toast'

const CategoryTable = () => {
  const { CategoryData , setCategoryData,loading} = useManager();
  const [buttonPopup, setButtonPopup] = useState(false); 
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [actionToConfirm, setActionToConfirm] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [popupMode,setPopupMode] =useState('')

  const confirmAction = () => {
    if (actionToConfirm && selectedCategoryId) {
      actionToConfirm(selectedCategoryId);
    }
    setShowConfirmation(false);
  };

  const handleDeleteClick = (CategoryId) => {
    setSelectedCategoryId(CategoryId);
    setActionToConfirm(() => handleDelete);
    setShowConfirmation(true);
  };
   
  
  
  
  

  const handleDelete = async (CategoryId) => {
   
    try {
      const response = await axios.delete(`http://localhost:5000/api/category/${CategoryId}`);
      setCategoryData(CategoryData.filter((category) => category._id !== CategoryId));
      console.log('Category deleted successfully:', response.data);
      toast.success('Category deleted successfully');
    } catch (error) {
      console.error('Error deleting Category:', error);
    }
  };
  

 
 /* const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };*/

  const handleUpdateClick = (CategoryId) => {
    setSelectedCategoryId(CategoryId);
    setPopupMode("edit")
    setButtonPopup(true)
   
   
    
    
  };

  const handleCreateClick = ()=>{
    setPopupMode("create")
    setButtonPopup(true)
    setSelectedCategoryId(null)


  }
  const handleClick = (CategoryId) => {
    handleUpdateClick(CategoryId)
    
 };

  console.log('data',CategoryData)
  if (!CategoryData) {
    return <Loader/>
}
  

  return (
    <div className="bodymanager">
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Categories</h3>
          <button className="btn btn-light btn-sm" onClick={handleCreateClick}>
            &#43; Add new category
          </button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Category</th>
                  <th>Created at</th>
                  <th>Updated at</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {CategoryData.map((category, index) => (
                  <tr key={category._id}>
                    <td>{index+1}</td>
                    <td>{category.categoryName}</td>
                    <td>{category.createdAt? new Date(category.createdAt).toLocaleString(): 'No date available'}</td>
                    <td>{category.updatedAt? new Date(category.updatedAt).toLocaleString(): 'No date available'}</td>
                    
                    <td>
                      <FaTrashAlt className="deleteicon" onClick={() => handleDeleteClick(category._id)} />
                      <FaPencilAlt className="modicon" onClick={() => handleClick(category._id)} />
                     
                    </td>
                  </tr>
                ))}
                <AddCategory
                  trigger={buttonPopup}
                  data={CategoryData}
                  setTrigger={setButtonPopup}
                  setCategoryData={setCategoryData}
                  CategoryId={selectedCategoryId}
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

export default CategoryTable;
