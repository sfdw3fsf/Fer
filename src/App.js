import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import View from './components/View';
import { Modal, Button } from 'react-bootstrap';
//get value of local storage
const getDatafromLS = () => {
  const data = localStorage.getItem('books');
  if (data) {
    return JSON.parse(data);
  }
  else {
    return []
  }
}
export const App = () => {
  //Modal
  const [visible, setVisible] = useState(false);

  const btnClose = () => setVisible(false);
  const btnShow = () => setVisible(true);
  //main array of object state
  const [products, setproducts] = useState(getDatafromLS());
  //input state
  const [id, setid] = useState('');
  const [name, setname] = useState('');
  const [price, setprice] = useState('');
  //submit event
  const HandleAddProductSubmit = (e) => {
    e.preventDefault();
    //creating an object
    let product = {
      id,
      name,
      price
    }
    setproducts([...products, product]);
    setid('');
    setname('');
    setprice('');
    console.log(products);
  }
  //delete
  const deleteProduct = (id) => {
    const filtered = products.filter((element, index) => {
      return element.id !== id
    })
    setproducts(filtered);
  }
  //save data to local storage
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products])

  return (
    //Modal
    <>

      <>


        <Modal show={visible} onHide={btnClose}>
          <form autoComplete="off" className='form-group'
            onSubmit={HandleAddProductSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='form-container p-3'>

                <label>ID</label>
                <input onChange={(e) => setid(e.target.value)} value={id} type="text" className='form-control' placeholder='' required></input>

                <label>Name</label>
                <input onChange={(e) => setname(e.target.value)} value={name} type="text" className='form-control' placeholder='' required></input>

                <label>Price</label>
                <input onChange={(e) => setprice(e.target.value)} value={price} type="text" className='form-control' placeholder='' required></input>



              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={btnClose}>
                Cancel
              </Button>
              <Button type="submit" variant="success" onClick={btnClose}>
                Add
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </>

      <div className='wrapper'>

        <div className='row'>
          <div className='col-md-2'></div>
          <div className='col-md-9  mb-3'><h1>Product List</h1>
            </div>
        </div>
        <div className='main row'>
          <div className='col-md-1'></div>

          <div className='col-md-1'></div>
          <div className='view-container col-md-5 border border-secondary rounded-2 p-4'>
            {products.length > 0 && <>
              <div className="table-responsive">
                <table className='table'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Product</th>
                      <th>GPA</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <View products={products} deleteProduct={deleteProduct} />
                  </tbody>

                </table>

              </div>
              <button className='btn btn-md btn-danger'
                onClick={() => setproducts([])}>Remove All</button>

            </>}
            <button clas onClick={btnShow} className='btn btn-md btn-success ms-2'
            >AddModal</button>
            {products.length < 1 && <div>No products here</div>}

          </div>

        </div>

      </div></>
  )
}

export default App;
