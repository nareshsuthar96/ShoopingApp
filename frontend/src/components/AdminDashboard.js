import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { DeleteProduct, fetchProducts } from '../features/ProductSlice'


const AdminDashboard = () => {
  const {products} = useSelector((state)=>state.product)

  const dispatch = useDispatch()
  console.log(products)
  useEffect(()=>{
    dispatch(fetchProducts())
  },[dispatch])

  function  handleRemove(e,id){
     dispatch(DeleteProduct(id))
    dispatch(fetchProducts())
  }
  
  return (
    <div className='container'>

    <div className=''>
        <Link to="/addProductForm"><button className='btn btn-primary mt-3'>AddProduct</button></Link>
      </div>
    <div className='row'>
    <p style={{color:'white',textAlign:"end"}}>TotalProduct:-{products.length}</p>
      
      <div className='col-md-12'>
      <table className="table table-dark mt-3" id="table">
<thead>
  <tr>
      <th scope="col">Product Image</th>
    <th scope="col">Product Name</th>
    <th scope="col">Product Description</th>
    <th scope="col">Product Price</th>
    <th scope="col">Product Quantity</th>
    <th scope="col">Product Status </th>
    <th scope='col'>Remove data</th>
    <th scope='col'>Edit data</th>
   
  
  </tr>
</thead>

  <tbody>
   {products.map((item)=>(
        <tr>
      
        <td><img src={`upload/${item.PImage}`} alt='img' id="myimg" /></td>
        <td>{item.PTitle}</td>
        <td>{item.PDesc}</td>
        <td>{item.PPrice}</td>
        <td>{item.PQuantity}</td>
        <td>{item.PStatus}</td>
        <td><button className='btn btn-danger' onClick={(e)=>handleRemove(e,item._id)} ><i class="bi bi-trash3-fill"></i></button></td>
        <td><Link to={`/adminproductupdate/${item._id}`}><button  className='btn btn-primary' ><i class="bi bi-pencil-fill"></i></button></Link></td>
  
      </tr>
   ))}
         

 


</tbody>


</table>
  
    </div>
    </div>
  </div>
  )
}

export default AdminDashboard
