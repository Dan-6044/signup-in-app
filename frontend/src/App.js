import React from "react";
import Home from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import UserDashboard from "./pages/user/UserDashboard";
import PrivateRoute from "./component/PrivateRoute";
import './App.css';
import {BrowserRouter, Route } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminCreateProduct from "./pages/admin/AdminCreateProduct";


function App() {
  return (
    <>
    <ToastContainer/>
    <BrowserRouter>
    <Route exact path="/" component={Home} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/signin" component={SignIn} />
    < PrivateRoute  exact path="/user/dashboard" component={UserDashboard} />
    < PrivateRoute  exact path="/admin/dashboard/product/create" component={AdminCreateProduct} />
    </BrowserRouter>
    </>
  );
}

export default App;
