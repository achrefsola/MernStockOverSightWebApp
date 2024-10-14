import CategoryTable from '../components/CategoryList';
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
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
        <CategoryTable/>
        
        </div>
        
        </div>
        </div>
    );
}