import React, { useRef,useEffect } from 'react';
import '../styles/Bill.css';
import { useManager } from "./ManagerContext";
import {useReactToPrint} from 'react-to-print'
import {MdLocalPrintshop } from 'react-icons/md'
import Loader from '../components/Loader';


const Bill = (props) => {
  const {CompanyData,fetchCompanyData} =useManager() ;
  console.log('1-company data',CompanyData);
console.log('companydata type ',typeof(CompanyData));
 let taxstamp =1

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
 console.log('props.order',props.order)
 console.log('company data',CompanyData);
  
 useEffect(() => {
  
  fetchCompanyData()
    
}, []);

 if (!CompanyData ) {
  console.log('no company data ');
  return <Loader/>
  
}

  return (
    <div className="bill-body">
      <div className="bill-content" ref={componentRef}>
        
        
          
        <div className='company-logo-bill'>
        {  CompanyData.map(company=>(
                <div key={company._id}>
                  {company.companyLogo && (
         
         <img src={`http://localhost:5000/${company.companyLogo}`} alt="Company Logo" />
       
         )}
        </div>))}
        </div>
        <div className='info'>
          <div className='company-details'>
          { CompanyData.map(company=>(
                <div key={company._id}>
                  
            <p>{company.companyName}</p>
            <p> {company.companyAddress}</p>
            <p> {company.companyPostalCode} &nbsp; {company.companyRegion} </p>
            <p> Phone : {company.companyPhone}</p>
            <p> Email : {company.companyEmail}</p>
            </div>))}
          </div>
          
          <div className='customer-details'>
            <p><strong>Customer : </strong> {props.order.customerName}</p>
            <p><strong>Address :</strong> {props.order.address}</p>
            <p><strong>Phone :</strong> {props.order.customerContact}</p>
            <p><strong>Email :</strong> {props.order.email}</p>
          </div>
          </div>
          <div className='bill-info'>
        <h3 className='bill-title '>Invoice</h3>
        <label> <strong>Date : {new Date(props.order.orderDate).toLocaleDateString()}</strong></label>
        <label><strong>{props.order._id} </strong></label>
        </div>
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
  {props.order.products.map((product) => (
    <tr key={product._id}>
      <td>{product.product}</td>
      <td>{product.quantity}</td>
      <td>{product.price} TND</td>
      <td>{product.price * product.quantity}</td>
    </tr>
  ))}
  <tr>
    <td></td>
    <td></td>
    <td>Total</td>
    <td>{props.order.totalPrice} TND</td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td>tax stamp</td>
    <td> {taxstamp} TND</td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td><strong>Total to pay </strong></td>
    <td><strong> {props.order.totalPrice+taxstamp} TND</strong></td>
  </tr>
</tbody>

        </table>
       <label className='stamp'>stamp and signature</label> 

      </div>
      <div className='print-button'>
        <button className='btn btn-primary' onClick={handlePrint}>Print <MdLocalPrintshop/></button>
      </div>
    </div>
  );
};

export default Bill;
