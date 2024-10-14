import Navbar from '../components/Navbar'
import LoginForm from '../components/LogForm';
import SideBar from '../components/SideBar'
import ProductList from '../components/ProductList'
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
        <ProductList/>
        
        </div>
        
        </div>
        </div>
    );
}