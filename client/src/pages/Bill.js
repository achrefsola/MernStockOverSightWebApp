import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Bill from '../components/Bill';
import Loader from '../components/Loader';

function BillPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/order/${orderId}`);
        console.log(response.data)
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return <Loader/>
  }

  return <Bill order={order} />;
}

export default BillPage;
