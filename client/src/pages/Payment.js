import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import Payment from '../components/Payment';
import OrderList from '../components/OrderList'
import '../styles/Parent.css';

export default function PaymentPage() {
    return (
        <div className="parent-container">
            <Navbar />
            <div className="sidebar">
                <SideBar />
            </div>
            <div className="content">
                <Payment />
           
            </div>
        </div>
    );
}
