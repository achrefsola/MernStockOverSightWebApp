import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrashAlt, FaPencilAlt, FaFileInvoiceDollar } from 'react-icons/fa';
import { useManager } from './ManagerContext';
import AddOrder from './AddOrder';
import Confirm from './Confirm';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../components/Loader';


export default function ManageOrders(props) {
  const { OrderData, setOrderData, fetchOrderData } = useManager();
  const [buttonPopup, setButtonPopup] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [actionToConfirm, setActionToConfirm] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [popupMode, setPopupMode] = useState('');
  const [oldQuantities, setOldQuantities] = useState([]);




  useEffect(() => {
    fetchOrderData();
  }, []);
  


  const confirmAction = (radioValue) => {
    
    if (actionToConfirm && selectedOrderId && radioValue) {
     
      actionToConfirm(selectedOrderId,radioValue); // This calls the delete or other actions
      
    }
    setShowConfirmation(false); // Close the confirmation dialog
  };

  const handleDeleteClick = (orderId) => {
    setSelectedOrderId(orderId);
    setActionToConfirm(() => handleDelete);
    setShowConfirmation(true);
  };

  const handleUpdateClick = (orderId) => {
    setPopupMode('edit');
    setButtonPopup(true);
    setSelectedOrderId(orderId);
  };

  const handleCreateClick = () => {
    setPopupMode('create');
    setButtonPopup(true);
    setSelectedOrderId(null);
  };

  const handleViewBill = (orderId) => {
    window.open(`/dashboard/bill/${orderId}`, '_blank');
  };

  const handleDelete = async (orderId, radioValue) => {
    try {
      if (radioValue === "no") {
        // If no restocking, just delete the order
        await axios.delete(`http://localhost:5000/api/order/${orderId}`);
        setOrderData(OrderData.filter((order) => order._id !== orderId));
        toast.success('Order deleted successfully');
      } else {
        // Fetch the order details to get the products and quantities
        const response = await axios.get(`http://localhost:5000/api/order/${orderId}`);
        const orderData = response.data;
  
        // Create an array of promises to restock each product
        const productRestockPromises = orderData.products.map(async (product) => {
          try {
            // Fetch the current stock of the product
            const productResponse = await axios.get(`http://localhost:5000/api/product/${product.productId}`);
            const currentStock = productResponse.data.stock;
  
            // Update stock by adding the quantity from the order
            const updatedStock = currentStock + product.quantity;
  
            // Update the product's stock in the database
            return await axios.patch(`http://localhost:5000/api/product/${product.productId}`, { stock: updatedStock });
          } catch (error) {
            console.error(`Error updating stock for product ${product.productId}:`, error);
            return { error }; // Return error object for failed restocks
          }
        });
  
        // Wait for all stock updates to finish (successful or not)
        const productRestockResponses = await Promise.allSettled(productRestockPromises);
        
        // Filter out successful stock updates
        const successfulRestocks = productRestockResponses.filter((result) =>
          result.status === "fulfilled" && !result.value?.error
        );
        const failRestocks = productRestockResponses.filter((result) =>
        result.status === "fulfilled" && result.value?.error?.response?.status === 404
      );
      
        console.log("product restocks responce :", productRestockResponses);
        console.log("Successful product restocks:", successfulRestocks);
        console.log("fail  product restocks:", failRestocks);
        
        if (successfulRestocks.length > 0) {
          toast.success('Products restocked successfully' ,{
            position :"bottom-right"
          });
         
        }
        if (failRestocks.length > 0) {
          toast.error('Info: Some products could not be restocked because they were not found in the inventory.', {
            position : "bottom-right",
          });
        }
  
        // Finally, delete the order
        await axios.delete(`http://localhost:5000/api/order/${orderId}`);
        setOrderData(OrderData.filter((order) => order._id !== orderId));
        toast.success('Order deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting order or restocking products:', error);
      toast.error('Error processing request');
    }
  };
  


  if (!OrderData) {
    return <Loader/>
  }


  return (
    <div className="bodymanager">
      <div className="container mt-5">
        <div className="card">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h3 className="mb-0">Orders</h3>
            <button className="btn btn-light btn-sm" onClick={handleCreateClick}>
              &#43; Add new order
            </button>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Contact</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Order Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {OrderData.map((order, index) => (
                    <tr key={order._id}>
                      <td>{index + 1}</td>
                      <th scope="row">{order._id}</th>
                      <td>{order.customerName}</td>
                      <td>{order.customerContact}</td>
                      <td>{order.totalPrice} TND</td>
                      <td>
                        <span className={`badge ${order.status === 'pending' ? 'bg-danger' : order.status === 'confirmed' ? 'bg-warning' : 'bg-success'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{order.orderDate ? new Date(order.orderDate).toLocaleString() : 'No date available'}</td>
                      <td>
                        <FaTrashAlt className="deleteicon" onClick={() => handleDeleteClick(order._id)} title='Delete' />
                        <FaPencilAlt className="modicon" onClick={() => handleUpdateClick(order._id)} title='Modify' />
                        {order.status==='confirmed'|| order.status==='paid'?
                        <FaFileInvoiceDollar className='billicon' onClick={() => handleViewBill(order._id)} title='Bill' />
                          :null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <AddOrder
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
        data={OrderData}
        setOrderData={setOrderData}
        orderId={selectedOrderId}
        mode={popupMode}
      />
      
        
      
      <Confirm
        show={showConfirmation}
        title="Delete the order ?"
        restockmessage="Restock all products ?"
        radiobuttons={true}
        message="This action will permanently delete the order."
        onConfirm={confirmAction}
        onCancel={() => setShowConfirmation(false)}
      />
    </div>
  );
}
