import React, { useState, useEffect } from 'react';
import './Admin.css';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { adminDashboardDataValue, displayAdminDashboard } from '../../../Redux/Reducer/Slices/AdminSlices/adminDashboardSlice';
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Button } from 'react-bootstrap';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const Admin = () => {
    const dispatch = useDispatch();
    const admin = JSON.parse(localStorage.getItem('client_name'));
    const adminDashboardValue = useSelector(adminDashboardDataValue);
    console.log(adminDashboardValue, 'Dashboard Value');

    const columns = [
        // { field: 'id', headerName: 'ID', width: 70 },
        { 
            field: 'user_name', 
            headerName: 'Name', 
            width: 130 
        },
        {
            field: 'user_email',
            headerName: 'Email',
            width: 130,
        },
        {
            field: 'user_phone',
            headerName: 'Phone Numer',
            width: 130,
            type: 'number'
        },
        {
            field: 'total_quantity',
            headerName: 'Total Products',
            type: 'number',
            width: 130,
        },
        {
            field: 'total_price',
            headerName: 'Total Amount (Rs)',
            type: 'number',
            width: 130,
        },
        {
            field: '',
            headerName: 'Action',
            // type: '',
            width: 130,
            renderCell: (params) => (
                <Button variant='primary' onClick={() => handleButtonClick(params.row)}>
                    Detail
                </Button>
                // <button onClick={() => handleButtonClick(params.row)}>Click Me</button>
              ),
        }
      ];
      
    const data = {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'Total Products Bought',
          data: adminDashboardValue?.map(data => data?.total_quantity),
          backgroundColor: [
            'rgb(255, 99, 132)',
            // 'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
    };

    const displayAdminDashboardHandler = async() => {
        try {
            await dispatch(displayAdminDashboard()).unwrap();
        } catch (err) {
            console.log(err, 'Error in fetching admin dashboard')
        }
    }

    const handleButtonClick = (params) => {
        alert(params);
        console.log(params, 'MUI');
    }

    useEffect(() => {
        displayAdminDashboardHandler();
    }, []);
    return(
        <>
            <p className='text-center fs-2'>Welcome {admin}</p>
            <div className='pie-container' style={{width: '25%'}}>
                <Pie data={data}/>
            </div>

            <div style={{ height: 300, width: '62%' }}>
                <DataGrid
                    rows={adminDashboardValue}
                    columns={columns}
                    getRowId={(row) => row.user_name}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    // checkboxSelection
                />
            </div>
        </>
    )
}
export default Admin;