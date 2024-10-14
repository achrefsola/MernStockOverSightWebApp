import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as  Router,Route,Routes } from 'react-router-dom';
import { ManagerProvider } from './components/ManagerContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoutes';
import Settings from './pages/settings';
import ProductList from './pages/ProductList';
import SupplierList from './pages/SupplierList';
import Orders from './pages/Orders';
import CategoryList from './pages/categories';
import Bill from './pages/Bill'
import Loader from './components/Loader';
import Main from './pages/Main';
import Payment from './pages/Payment';
import SuccessPayment from './components/SuccessPayment';

import {Toaster} from 'react-hot-toast'
function App() {
  return (
    <div >
      
 
<Router>
      <ManagerProvider> 
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
        <Route path="/dashboard/settings" element={<PrivateRoute><Settings/></PrivateRoute>} />
        <Route path="/dashboard/products" element={<PrivateRoute><ProductList/></PrivateRoute>} />
        <Route path="/dashboard/suppliers" element={<PrivateRoute><SupplierList/></PrivateRoute>} />
        <Route path="/dashboard/orders" element={<PrivateRoute><Orders/></PrivateRoute>} />
        <Route path="/dashboard/categories" element={<PrivateRoute><CategoryList/></PrivateRoute>} />
        <Route path="/dashboard/bill/:orderId" element={<PrivateRoute><Bill/></PrivateRoute>} />
        <Route path="/dashboard/loader" element={<PrivateRoute><Loader/></PrivateRoute>} />
        <Route path="/dashboard/payment" element={<PrivateRoute><Payment/></PrivateRoute>} />
        <Route path="/dashboard/payment/success" element={<PrivateRoute><SuccessPayment/></PrivateRoute>} />
       
            
        </Routes>
          <Toaster position="top-center"  toastOptions={{ className: 'toast-z-index', style: { zIndex: 9999 } }} />
        </ManagerProvider>
      
      
    </Router>
    
    </div>
  );
}

export default App;
