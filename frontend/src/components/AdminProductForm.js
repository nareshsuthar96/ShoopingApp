import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AddProduct, fetchProducts } from '../features/ProductSlice'

const AdminProductForm = () => {
  
  
    const [pname, setPName] = useState("")
  const [pdesc, setDesc] = useState("")
  const [pprice, setPPrice] = useState("")
  const [pqty, setPQty] = useState("")
  const [pstatus, setPStatus] = useState("")
  const [pimg, setPImg] = useState("")
  const [message, setMessage] = useState("")

  

  const dispatch = useDispatch();
  const navigate = useNavigate()

  function handleform(e) {
    e.preventDefault()
    console.log(pname , pdesc , pprice , pstatus  ,pqty)
    console.log(pimg)




    let Data = new FormData()

    Data.append("pname", pname)
    Data.append("pdesc", pdesc)
    Data.append("pprice", pprice)
    Data.append("pqty", pqty)
    Data.append("pstatus", pstatus)
    Data.append("pimg", pimg)

    console.log(Data)

    dispatch(AddProduct(Data))
   
    navigate("/dashboard")
    dispatch(fetchProducts())
}
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-3'>
          {/* <Link to="/addProductForm"><button className='btn btn-success mt-3'>AddProduct</button></Link> */}
        </div>
        <div className='col-md-9' id="Adminaddproductform">
          <form onSubmit={(e) => { handleform(e) }}>
            <label>Product Name</label>
            <input type="text" className='form-control' value={pname} onChange={(e) => { setPName(e.target.value) }} required />

            <label>Product Description</label>
            <input type="text" className='form-control' value={pdesc} onChange={(e) => { setDesc(e.target.value) }} required />

            <label>Product Price</label>
            <input type="number" className='form-control' value={pprice} onChange={(e) => { setPPrice(e.target.value) }} required />

            <label>Product Quantity</label>
            <input type="number" className='form-control' value={pqty} onChange={(e) => { setPQty(e.target.value) }} required />

            <label>Product Status</label>
            {/* <input type="text" className='form-control' value={pstatus} onChange={(e) => { setPStatus(e.target.value) }} /> */}
            <select className='form-select' value={pstatus} onChange={(e)=>{setPStatus(e.target.value)}}>
              <option value='OUT-STOCK'>OUTSTOCK</option>
              <option value= 'IN-STOCK'>INSTOCK</option>
            </select>

            <label>Product Image</label>
            <input type="file" className='form-control' onChange={(e) => { setPImg(e.target.files[0]) }} required />
           

            <button type="submit" className='btn btn-primary mt-3 form-control'>Add Product Here</button>
          </form>


        </div>
      </div>
    </div>
  )
}

export default AdminProductForm
