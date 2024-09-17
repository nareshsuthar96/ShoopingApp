import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/loginSlice';
import { TbLogout2 } from 'react-icons/tb';
import { FaAmazon, FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  const { cart } = useSelector((state) => state.allcart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleLoginNameClick = () => {
    const role = localStorage.getItem('role'); 
    if (role === 'user') {
      navigate('/product'); 
    } else if (role === 'admin') {
      navigate('/dashboard'); 
    } else {
      navigate('/');
    }
  };

  const loginname = localStorage.getItem('loginname');
  const role = localStorage.getItem('role');

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary" id="navbar">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/product">
            <FaAmazon style={{ fontSize: '30px', color: 'yellow' }} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {role === 'user' && (
                <>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/product" style={{ color: 'white' }}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/product" style={{ color: 'white' }}>
                    All Product
                  </Link>
                </li>
                </>
              )}
              {role === 'admin' && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/users" style={{ color: 'white' }}>
                      Users
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/dashboard" style={{ color: 'white'}}>
                      Dashboard
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {loginname && (
            <>
              <span style={{ marginRight: '30px', color: '#1054af', cursor: 'pointer' }} onClick={handleLoginNameClick}>
                {loginname}
              </span>
              {/* Show Cart icon only if role is 'user' */}
              {role === 'user' && (
                <Link to="/shoppingCart" style={{ marginRight: '30px' }}>
                  <FaShoppingCart style={{ fontSize: '20px' }} />
                  <span className="badge rounded-pill badge-notification bg-danger">{cart.length}</span>
                </Link>
              )}
              <TbLogout2 onClick={handleLogoutClick} style={{ fontSize: '25px', cursor: 'pointer', color: '#1054af' }} className="mb-2" />
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
