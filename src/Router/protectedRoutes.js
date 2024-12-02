import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, role, ...rest }) => {
    const user = JSON.parse(localStorage.getItem('client_role'));

    if (user === role) {
        return <Element {...rest} />;
    } else {
        return <Navigate to="/" />;
    }
};

export default ProtectedRoute;
