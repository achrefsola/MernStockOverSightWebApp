import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import OrderList from '../components/OrderList'
import '../styles/Parent.css';

export default function Settings() {
    return (
        <div className="parent-container">
            <Navbar />
            <div className="sidebar">
                <SideBar />
            </div>
            <div className="content">
                <OrderList />
           
            </div>
        </div>
    );
}
