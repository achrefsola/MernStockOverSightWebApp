import Navbar from '../components/Navbar'
import LoginForm from '../components/LogForm';
import SideBar from '../components/SideBar'
import SupplierList from '../components/SupplierList'
import "../styles/ProductList.css";

export default function Products() {
    return (
        <div>
            <div className="parent-container">
        <Navbar/>
        <div className="sidebar">
        <SideBar/>
        </div>
        <div className="content">
        <SupplierList/>
        
        </div>
        
        </div>
        </div>
    );
}