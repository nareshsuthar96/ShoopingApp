import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {ShowUserProduct } from '../features/ProductSlice';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';
import { AddToCart } from '../features/cartSlice';


const UserProduct = () => {
const {products} = useSelector((state)=>state.product)
console.log(products)
const dispatch = useDispatch();
useEffect(()=>{
  dispatch(ShowUserProduct())
},[])



  return (
    <div className='container'>
      <div className='row'>
        {products.map((iteam, key) => (
          <div className='col-md-4 mt-3' key={iteam._id}>
            <MDBCard>
              <MDBCardImage src={`upload/${iteam.PImage}`} position='top' alt='...' style={{ height: "20rem" }} />
              <hr/>
      
              <MDBCardBody>
                <MDBCardTitle style={{ height: "100px" }}>{iteam.PTitle}</MDBCardTitle>
                <hr/>
                <hr/>
                <MDBCardText style={{ height: "200px" }}>
                  <p>{iteam.PDesc}</p>
                </MDBCardText>
                <hr/>
                <hr/>
                <MDBCardText>
                  <h5>Price: ₹</h5> <p>{iteam.PPrice}</p>
                </MDBCardText>
                <hr/>
                <hr/>
                <MDBBtn onClick={() => dispatch(AddToCart(iteam))}>Add To Cart</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserProduct
