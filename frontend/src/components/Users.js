import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../features/userSlice'

const Users = () => {
    const {users} = useSelector((state)=>state.users)
    const dispatch = useDispatch()
    console.log(users)
    useEffect(()=>{
        dispatch(fetchUsers())
    },[])
  return (
    <div className='container'>

    
    <div className='row'>
    <p style={{color:'white',textAlign:"end"}} className='mt-2'>TotalUsers :- {users.length}</p>
      
      <div className='col-md-12'>
      <table className="table table-dark mt-3" id="table">
<thead>
  <tr>
      <th scope="col">UserName</th>
    <th scope="col">Email</th>
    <th scope="col">Role</th>
   
   
  
  </tr>
</thead>

  <tbody>
   {users.map((item)=>(
        <tr>
      
        
        <td>{item.username}</td>
        <td>{item.email}</td>
        <td>{item.role}</td>
       
      </tr>
   ))}
         

 


</tbody>


</table>
  
    </div>
    </div>
  </div>
  )
}

export default Users
