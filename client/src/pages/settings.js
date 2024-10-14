import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import UpdateUserInfo from '../components/UpdateManagerInfo';
import UpdateUserPassword from '../components/UpdateManagerPassword';
import '../styles/Parent.css';
import UpdateUserPic from '../components/UpdateManagerPic'



export default function Settings() {
    return (
        <div className="parent-container">
            <Navbar />
            <div className="sidebar">
                <SideBar />
            </div>
            <div className="content">
                <UpdateUserPic />
                
                <UpdateUserInfo />
                <UpdateUserPassword />
                </div>
            </div>
        
    );
}
