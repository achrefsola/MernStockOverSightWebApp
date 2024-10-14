import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import { useNavigate } from 'react-router-dom';
import { useManager } from '../components/ManagerContext';

export default function Dashboard() {
    const { ManagerData, loading } = useManager();
    const navigate = useNavigate();

   

    return (
        <div>
            <Navbar />
            <SideBar />
            
        </div>
    );
}
