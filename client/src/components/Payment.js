import axios from 'axios';
import Navbar from "./Navbar";
import SideBar from './SideBar';
import Button from './Button';




export default function Payment() {
    const handlePayment= async ()=>{
        try{
            const response = await axios.post(`http://localhost:5000/api/payment/create-checkout-session`);
            console.log(response.data.id)
            console.log(response.data.url)
            window.open(response.data.url)



        }catch(error){
            console.log(error.message)
        
    }

    }


    return (
     <div>
    
        <Button onClick={handlePayment} name={"pay 20$ vip pack"}/>
     </div>
    );
}