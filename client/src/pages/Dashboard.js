import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import '../styles/Parent.css';
import AddCompany from '../components/AddCompany';
import { useState, useEffect } from 'react';
import { useManager } from '../components/ManagerContext';
import { Audio } from 'react-loader-spinner';
import Loader from '../components/Loader';

export default function Dashboard() {
  const { CompanyData, setCompanyData, fetchCompanyData, ManagerData } = useManager();
  const [buttonPopup, setButtonPopup] = useState(false); 
  const [popupMode, setPopupMode] = useState([]);
  console.log('companydata type ',typeof(CompanyData));

  useEffect(() => {
  
    fetchCompanyData()
      
}, []);

  const handleCreateClick = () => {
    setPopupMode("create");
    setButtonPopup(true);
  };


  const handleUpdateClick = () => {
    setPopupMode("edit");
    setButtonPopup(true);
  };



  if (!CompanyData ) {
    return <Loader/>
  }

  return (
    <div className="parent-container">
      <Navbar/>
      <div className="sidebar">
        <SideBar/>
      </div>
      <div className="content">
        <div className="container mt-5">
          <div className="card">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h3 className="mb-0">Your Company Info</h3>
            </div>
            <div className="card-body">
              {CompanyData.length > 0 ? (
                CompanyData.map(company => (
                  <div key={company._id} className="company-details mb-3">
                    <p><strong>Name:</strong> {company.companyName}</p>
                    <p><strong>Address:</strong> {company.companyAddress}</p>
                    <p><strong>Region:</strong> {company.companyRegion}</p>
                    <p><strong>Postal Code:</strong> {company.companyPostalCode}</p>
                    <p><strong>Phone:</strong> {company.companyPhone}</p>
                    <p><strong>Email:</strong> {company.companyEmail}</p>
                    {company.companyLogo && (
                      <img src={`http://localhost:5000/${company.companyLogo}`} alt="Company Logo" className="dashboard-company-logo" />
                    )}
                  </div>
                ))
              ) : (
                <p>No company data available.</p>
              )}
              <div className='dashboard-buttons'>
              {CompanyData.length > 0 ? (
                <button className="btn btn-primary " onClick={handleUpdateClick}>Edit</button>
              ) : (
                <button className="btn btn-primary" onClick={handleCreateClick}>Create</button>
              )}
              </div>
            </div>
          </div>
        </div>
        <AddCompany
          trigger={buttonPopup}
          data={CompanyData}
          setTrigger={setButtonPopup}
          setCompanyData={setCompanyData}
          mode={popupMode}
        />
      </div>
    </div>
  );
}
