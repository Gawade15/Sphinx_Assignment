import React from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import CustomerCRUD from './components/CustomerCRUD';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route element={<ProtectedRoutes />}>
        <Route path='/home' element={<Home />} />
        <Route path='/customercrud' element={<CustomerCRUD />} />
      </Route>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
 
      <Route path='*' element={
        <div>
          <header>
            <h1>Not Found</h1>
          </header>
          <p>
            <a href="/">Back to Login</a>
          </p>
        </div>
      } />
    </Route>
  )
);

function App() {
  const isLogged = localStorage.getItem("user");

  const logout = async () => {
    try {
      const response = await fetch("/api/securewebsite/logout", {
        method: "GET",
        credentials: "include"
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.removeItem("user");
        alert(data.message);
        document.location = "/login";
      } else {
        console.log("could not logout: ", response);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <section>
       {/* {isLogged && ( */}
        <div className='top-nav'>
          <div className="collapse" id="navbarToggleExternalContent" data-bs-theme="dark">
            <div className="bg-dark p-4">
              <span className="text-body-secondary">
               {/* {
                   isLogged ? */}
                  <span className='item-holder'>

                  <button className="btn btn-outline-success white-outline" type="button"><a href="/home">Home</a></button>
                  
                  <button className="btn btn-outline-success white-outline" type="button"><a href="/customercrud">Customer Data</a></button>
                    

                     
                   
                    <span onClick={logout}>
                      <button className="btn btn-outline-success white-outline" type="button"><a href="/">Logout</a></button>
                    </span>
                    {/* </span> :
                        <span className='item-holder'>
                            <a href="/login">Login</a>
                            <a href="/register">Register</a>
                          } */}
                          </span>
              </span>
            </div>
          </div>
          <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <h5 className="text-light">Malaria Genotyping</h5>
              <button className="btn btn-outline-light" type="submit"> Start Experiment </button>
            </div>
          </nav>
        </div>
        {/* )} */}
      <RouterProvider router={router} />
    </section>
  );
}

export default App;
