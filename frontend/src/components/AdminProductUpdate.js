import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminfinalupdate, adminfinalupdateImage, fetchProducts, SingleProductUpdate } from '../features/ProductSlice'
import { useNavigate, useParams } from 'react-router-dom'

const AdminProductUpdate = () => {

  const { items } = useSelector((state) => state.product)
  const dispatch = useDispatch()

  const [pname, setPName] = useState("")
  const [pdesc, setDesc] = useState("")
  const [pprice, setPPrice] = useState("")
  const [pqty, setPQty] = useState("")
  const [pstatus, setPStatus] = useState("")
  const [pimg, setPImg] = useState("")
  const [editImage, setEditImage] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (items) {
      setPName(items.PTitle)
      setDesc(items.PDesc)
      setPPrice(items.PPrice)
      setPQty(items.PQuantity)
      setPImg(items.PImage)
      setPStatus(items.PStatus)
    }
  }, [items])

  useEffect(() => {
    dispatch(SingleProductUpdate(id))
    dispatch(fetchProducts())
  }, [dispatch, id])

  function handleupdate(e) {
    e.preventDefault()

    let Data1 = new FormData()

    if (editImage) {
      Data1.append("pname", pname)
      Data1.append("pdesc", pdesc)
      Data1.append("pamount", pprice)
      Data1.append("pqty", pqty)
      Data1.append("pstatus", pstatus)
      Data1.append("pimg", pimg)

      dispatch(adminfinalupdateImage({ Data1, id }))
      navigate("/dashboard")
      dispatch(fetchProducts())
    } else {
      const data = {
        pname: pname,
        pdesc: pdesc,
        pprice: pprice,
        pqty: pqty,
        pstatus: pstatus
      }
      dispatch(adminfinalupdate({ data, id }))
      navigate("/dashboard")
      dispatch(fetchProducts())
    }
  }

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-9' id="Adminaddproductform">
            <form onSubmit={(e) => { handleupdate(e) }}>
              <label>Product Name</label>
              <input type="text" className='form-control' value={pname} onChange={(e) => { setPName(e.target.value) }} required />

              <label>Product Description</label>
              <input type="text" className='form-control' value={pdesc} onChange={(e) => { setDesc(e.target.value) }} required />

              <label>Product Price</label>
              <input type="number" className='form-control' value={pprice} onChange={(e) => { setPPrice(e.target.value) }} required />

              <label>Product Quantity</label>
              <input type="number" className='form-control' value={pqty} onChange={(e) => { setPQty(e.target.value) }} required />

              <label>Product Status</label>
              <select className='form-select' value={pstatus} onChange={(e) => { setPStatus(e.target.value) }}>
                <option value='OUT-STOCK'>OUTSTOCK</option>
                <option value='IN-STOCK'>INSTOCK</option>
              </select>

              <label>Product Image</label>
              {editImage ? (
                <div>
                  <input type="file" className='form-control' onChange={(e) => { setPImg(e.target.files[0]) }} required />
                </div>
              ) : (
                <div>
                  <img src={`http://localhost:5000/upload/${pimg}`} id="editImage" alt="Product" />
                  <i className="bi bi-pencil-fill" onClick={() => { setEditImage(true) }}
                    style={{ cursor: 'pointer' }}
                  ></i>
                </div>
              )}

              <button type="submit" className='btn btn-primary mt-3 form-control'>Edit Product Here</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProductUpdate
