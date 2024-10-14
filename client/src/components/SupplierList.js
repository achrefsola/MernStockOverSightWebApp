import axios from 'axios';
import { FaTrashAlt,FaPencilAlt } from 'react-icons/fa';
import '../styles/ProductList.css'
import { useManager } from '../components/ManagerContext';
import { useState, useEffect } from 'react';
import AddProduct from './AddProduct';
import Confirm from'./Confirm'
import AddSupplier from './AddSupplier';
import Loader from '../components/Loader';



import toast from 'react-hot-toast'

const SupplierTable = () => {
  const { SupplierData , setSupplierData,loading} = useManager();
  const [buttonPopup, setButtonPopup] = useState(false); 
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [actionToConfirm, setActionToConfirm] = useState(null);
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);
  const [popupMode,setPopupMode] =useState('')

  const confirmAction = () => {
    if (actionToConfirm && selectedSupplierId) {
      actionToConfirm(selectedSupplierId);
    }
    setShowConfirmation(false);
  };

  const handleDeleteClick = (SupplierId) => {
    setSelectedSupplierId(SupplierId);
    setActionToConfirm(() => handleDelete);
    setShowConfirmation(true);
  };
  
  
  

  const handleDelete = async (SupplierId) => {
   
    try {
      const response = await axios.delete(`http://localhost:5000/api/supplier/${SupplierId}`);
      setSupplierData(SupplierData.filter((supplier) => supplier._id !== SupplierId));
      console.log('Supplier deleted successfully:', response.data);
      toast.success('Supplier deleted successfully');
    } catch (error) {
      console.error('Error deleting supplier:', error);
    }
  };
  

 
 /* const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };*/

  const handleUpdateClick = (SupplierId) => {
    setSelectedSupplierId(SupplierId);
    setPopupMode("edit")
    setButtonPopup(true)
   
   
    
    
  };

  const handleCreateClick = ()=>{
    setPopupMode("create")
    setButtonPopup(true)
    setSelectedSupplierId(null)


  }
  const handleClick = (SupplierId) => {
    handleUpdateClick(SupplierId)
    
 };

  console.log('data',SupplierData)
  if (!SupplierData) {
    return <Loader/>
}
  

  return (
    <div className="bodymanager">
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Suppliers</h3>
          <button className="btn btn-light btn-sm" onClick={handleCreateClick}>
            &#43; Add new supplier
          </button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Supplier</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Fiscal number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {SupplierData.map((supplier,index) => (
                  <tr key={supplier._id}>
                    <td>{index+1}</td>
                    <td>{supplier.supplierName}</td>
                    <td>{supplier.contact ? supplier.contact : "No data"}</td>
                    <td>{supplier.email? supplier.email : "No data"}</td>
                    <td>{supplier.fiscalNumber}</td>
                    <td>
                      <FaTrashAlt className="deleteicon" onClick={() => handleDeleteClick(supplier._id)} />
                      <FaPencilAlt className="modicon" onClick={() => handleClick(supplier._id)} />
                     
                    </td>
                  </tr>
                ))}
                <AddSupplier
                  trigger={buttonPopup}
                  data={SupplierData}
                  setTrigger={setButtonPopup}
                  setSupplierData={setSupplierData}
                  SupplierId={selectedSupplierId}
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

export default SupplierTable;
