import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ManagerContext = createContext();
/*------------------------------FOR MANAGER ----------------------------*/
export const ManagerProvider = ({ children }) => {
    const navigate = useNavigate();
    const [ManagerData, setManagerData] = useState(() => {
        const savedData = localStorage.getItem('ManagerData');
        return savedData ? JSON.parse(savedData) : null;
    });
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken && !ManagerData) {
            const storedManagerId = localStorage.getItem('managerid');
            fetchManagerData(storedManagerId, storedToken);
        } else {
            setLoading(false); // Stop loading if no token or ManagerData is already present
        }
    }, [ManagerData,localStorage.getItem('token')]);
    
    const fetchManagerData = async (id, token) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/manager/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    ManagerId: id
                }
            });
            setManagerData(response.data);
            localStorage.setItem('ManagerData', JSON.stringify(response.data));
        } catch (error) {
            console.error('Error fetching Manager data:', error);
        } finally {
            setLoading(false); // Stop loading after fetching data
        }
    };
    const updateManagerData = (newData) => {
        setManagerData(newData);
        localStorage.setItem('ManagerData', JSON.stringify(newData));
    };

    const handleManagerLogout = async () => {
        setManagerData(null);
        localStorage.removeItem('token');
        localStorage.removeItem('managerid');
        localStorage.removeItem('ManagerData');
        setCompanyData(null)
        navigate('/login');
    };
/*------------------------------FOR PRODUCTS ----------------------------*/
const [ProductData, setProductData] = useState()
useEffect(() => {
   
    if (!ProductData) {
        fetchProductData();
    } else {
        setLoading(false); 
    }
}, [ProductData]);

const fetchProductData = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/product/products`);
        setProductData(response.data)
        console.log('products data,', response.data)
    } catch (error) {
        console.error('Error fetching product data:', error);
    } finally {
        setLoading(false); // Stop loading after fetching data
    }
};
/*------------------------------FOR SUPPLIERS ----------------------------*/


const [SupplierData, setSupplierData] = useState()
useEffect(() => {
   
    if (!SupplierData) {
        fetchSupplierData();
    } else {
        setLoading(false); 
    }
}, [SupplierData]);

const fetchSupplierData = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/Supplier/Suppliers`);
        setSupplierData(response.data)
        console.log('Suppliers data,', response.data)
    } catch (error) {
        console.error('Error fetching Supplier data:', error);
    } finally {
        setLoading(false); // Stop loading after fetching data
    }
};
/*------------------------------FOR Orders ----------------------------*/
const [OrderData, setOrderData] = useState()
useEffect(() => {
   
    if (!OrderData) {
        fetchOrderData();
    } else {
        setLoading(false); 
    }
}, [OrderData]);

const fetchOrderData = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/order/orders`);
        setOrderData(response.data)
        console.log('Order data,', response.data)
    } catch (error) {
        console.error('Error fetching Order data:', error);
    } finally {
        setLoading(false); // Stop loading after fetching data
    }
    };  

/*------------------------------FOR Categories ----------------------------*/
const [CategoryData, setCategoryData] = useState()
useEffect(() => {
   
    if (!CategoryData) {
        fetchCategoryData();
    } else {
        setLoading(false); 
    }
}, [CategoryData]);

const fetchCategoryData = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/category/categorys`);
        setCategoryData(response.data)
        console.log('category data,', response.data)
    } catch (error) {
        console.error('Error fetching category data:', error);
    } finally {
        setLoading(false); // Stop loading after fetching data
    }
};
/*------------------------------FOR companies ----------------------------*/
const [CompanyData, setCompanyData] = useState([])
useEffect(() => {
    const storedManagerId = localStorage.getItem('managerid');
    if (!CompanyData && storedManagerId) {
        fetchCompanyData();
    } else {
        setLoading(false); 
    }
}, [CompanyData, localStorage.getItem('managerid')]);

const fetchCompanyData = async () => {
    try {
        const managerId = localStorage.getItem('managerid');
        const response = await axios.get(`http://localhost:5000/api/company/company/${managerId}`);
        console.log('company data re from context ',response.data);
       
        setCompanyData(response.data)
        console.log('Company data,', response.data)
        
    } catch (error) {
        console.error('Error fetching Company data:', error);
    } finally {
        setLoading(false); // Stop loading after fetching data
    }
};
const updateCompanyData = (newData) => {
    setCompanyData(newData);
    
};


    return (
        <ManagerContext.Provider value={{ ManagerData, setManagerData, handleManagerLogout,
             loading ,updateManagerData,ProductData,setProductData,
            SupplierData,fetchProductData,setSupplierData,fetchSupplierData,OrderData, setOrderData,fetchOrderData,
            CategoryData,setCategoryData,fetchCategoryData,fetchCompanyData,CompanyData,updateCompanyData}}>
            {children}
        </ManagerContext.Provider>
    );  
};

export const useManager = () => useContext(ManagerContext);
