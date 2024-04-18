import axios from "axios";
import { useEffect, useState } from "react";


function CustomerCrud() {

const [id, setId] = useState("");
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [customers, setUsers] = useState([]);
 
  useEffect(() => {
    (async () => await Load())();
  }, []);
 
  async function Load() {
    
    const result = await axios.get("https://localhost:7013/api/Customer/GetCustomer/");
    setUsers(result.data);
    console.log(result.data);
  }
 
  async function save(event) {
   
    event.preventDefault();
    try {
      await axios.post("https://localhost:7013/api/Customer/AddCustomer/", {
        
        name: name,
        email: email,
        phone: phone,
       
      });
      alert("Customer Registered Successfully");
          setId("");
          setName("");
          setEmail("");
          setPhone("");
       
     
      Load();
    } catch (err) {
      alert(err);
    }
  }

  async function editCustomer(customer) {
    setName(customer.name);
    setEmail(customer.email);
    setPhone(customer.phone);
   
 
    setId(customer.id);
  }
 

  async function DeleteCustomer(id) {
  await axios.delete("https://localhost:7013/api/Customer/DeleteCustomer/" + id);
   alert("Employee deleted Successfully");
   setId("");
   setName("");
   setEmail("");
   setPhone("");
   Load();
  }
 

  async function update(event) {
    event.preventDefault();
    try {

  await axios.patch("https://localhost:7013/api/Customer/UpdateCustomer/"+ customers.find((u) => u.id === id).id || id,
        {
        id: id,
        name: name,
        email: email,
        phone: phone,

        }
      );
      alert("Registation Updated Successfully");
      setId("");
      setName("");
      setEmail("");
     
      Load();
    } catch (err) {
      alert(err);
    }
  }

    return (
      <div>
        <h1>Customer Details</h1>
<div className="container mt-4">
  <form>
    <div className="form-group">
      <input
        type="text"
        className="form-control"
        id="id"
        hidden
        value={id}
        onChange={(event) => setId(event.target.value)}
      />

      <label htmlFor="name">Customer Name</label>
      <input
        type="text"
        className="form-control w-100 mw-200" 
        id="name"
        value={name}
        required
        onChange={(event) => setName(event.target.value)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        className="form-control w-100 mw-200" 
        id="email"
        value={email}
        required
        onChange={(event) => setEmail(event.target.value)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="phone">Phone</label>
      <input
        type="tel"
        className="form-control w-100 mw-200" 
        id="phone"
        value={phone}
        required
        onChange={(event) => setPhone(event.target.value)}
      />
    </div>
    <div>
      <button className="btn btn-primary mt-4" onClick={save}>
        Register
      </button>
      <button className="btn btn-warning mt-4" onClick={update}>
        Update
      </button>
    </div>
  </form>
</div>

      <br></br>

      <table class="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Customer Id</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
         
 
            <th scope="col">Option</th>
          </tr>
        </thead>
        {customers.map(function fn(customer) {
          return (
            <tbody>
              <tr>
                <th scope="row">{customer.id} </th>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                
                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => editCustomer(customer)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => DeleteCustomer(customer.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
        
      </div>
    );
  }
  
  export default CustomerCrud;