import Navbar from '../components/Navbar'
import LoginForm from '../components/LogForm';
import "../styles/Main.css"; // Ensure this path is correct

export default function Login() {
    return (
        <div className="landing-background">
        <div>
        <Navbar/>
        <LoginForm/>
        </div>
        </div>
    );
}