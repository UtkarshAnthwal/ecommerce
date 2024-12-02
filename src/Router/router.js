    import {createBrowserRouter} from "react-router-dom";
    import {Routes} from "./config";
    import {AllProductDashboard, CartDashboard, ClothesDashboard} from '../Pages/index';
    import AllElectronicsDashboard from "../Pages/Dashboard/ProductDashboard/ElectronicsDashboard/ElectronicsDashboard/AllElectronics";
    import CustomDetail from "../Components/CustomDetail/CustomDetail";
    import Purchase from "../Pages/Purchase/Purchase";
    import LoginFrom from "../Pages/Credentials/Login.jsx/Login";
    import Admin from "../Pages/Admin/Dashboard/Admin";
    import ClientDetails from "../Pages/PersonalDetails/ClientDetails/ClientDetails";
    import WishlistDashboard from "../Pages/Dashboard/WishlistDashboard/WishlistDashboard";
    import ConfirmPurchaseDashboard from "../Pages/Purchase/ConfirmPurchaseDashboard/ConfirmPurchaseDashboard";
    import ForgotPassword from "../Pages/Credentials/ForgotPassword/ForgotPassword";
    import ProtectedRoute from "./protectedRoutes";

    const router = createBrowserRouter([
        {path: Routes.AllProductDashboard, element: <AllProductDashboard/>},
        {path: Routes.AddToCartDashboard, element: <CartDashboard/>},
        {path: Routes.ClothesDashboard, element: <ClothesDashboard/>},
        {path: Routes.ElectronicsDashboard, element: <AllElectronicsDashboard/>},
        {path: Routes.Details, element: <CustomDetail/>},
        {path: Routes.Purchase, element: <Purchase/>},
        {path: Routes.Login, element: <LoginFrom/>},
        {path: Routes.ClientDetails, element: <ClientDetails/>},
        {path: Routes.WishlistDashboard, element: <WishlistDashboard/>},
        {path: Routes.ConfirmPurhaseDashboard, element: <ConfirmPurchaseDashboard/>},
        {path: Routes.ForgotPassword, element: <ForgotPassword/>},
        {path: Routes.Admin, element: <ProtectedRoute element={Admin} role='admin' /> },
    ]);
    export default router;

