import styles from "./Header.module.scss"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa"
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import { useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from 'react-toastify';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";
import AdminOnlyRoute, { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";
import { CALCULATE_TOTAL_QUANTITY, selectCartTotalQuantity } from "../../redux/slice/cartSlice";
import imgpay from "../../assets/payless2.jpg"




const logo = (
  <div className={styles.logo}>
  <Link to="/">
    <h2>
   
    <img src={imgpay} alt="" style={{width:"65px", height:"65px", borderRadius:"50%", marginTop:"15px"}}/>
    
     
    </h2>
    
  </Link>
  
</div>
)



const activeLink = ({isActive}) => (isActive ? `${styles.active}` : "");

const Header = () => {

  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setdisplayName] = useState("");
  const [scrollPage, setScrollPage] = useState(false)
  const cartTotalQuantity = useSelector(selectCartTotalQuantity)

  useEffect(() => {
     dispatch(CALCULATE_TOTAL_QUANTITY)
  }, [])

  const navigate = useNavigate();

  const fixNavbar = () => {
     if (window.scrollY > 50) {
       setScrollPage(true)
     } else {
      setScrollPage(false);
     }
       
  };

  window.addEventListener("scroll", fixNavbar)

  const dispatch = useDispatch();
  
  // Monitor currently sign in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
       const uid = user.uid;
       // console.log(user.displayName);

       if (user.displayName == null) {
        // const u1 = user.email.slice(0, -10);    (in cases where the user sign in with a gmail account)
        const u1 = user.email.substring(0, user.email.indexOf("@"));
        const uName = u1.charAt(0).toUpperCase() + u1.slice(1)
        console.log(uName);
        setdisplayName(uName)
       } else {
        setdisplayName(user.displayName);
       }
       


        dispatch(
          SET_ACTIVE_USER({
          email: user.email,
          userName: user.displayName ? user.displayName : displayName,
          userID: user.uid,
        })
        );
      } else {
        setdisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName])
  
  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }; 

  const hideMenu = () => {
    setShowMenu(false)
  };

  const logoutUser = () => {
    signOut(auth).then(() => {
      toast.success("Logout successful...")
      navigate("/")

    }).catch((error) => {
      toast.error(error.message)
    });
  };

  const cart =(
    <span className={styles.cart}>
                 <Link to="/cart">
                  Cart
                  <FaShoppingCart size={20}/>
                  <p>{cartTotalQuantity}</p>
                  </Link>
              </span>
  );


  return (
    <header className={scrollPage ? `${styles.fixed}` : null}>
      <div className={styles.header}>
        {logo}
        <h2 style={{color: "#f1f10a", marginLeft: "10px"}}>Pay<span style={{color: "orange"}}>Less</span></h2>      
        <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}> 
          <div  className = { showMenu ? `${styles["nav-wrapper"] } ${styles["show-nav-wrapper"]}`
          : `${styles["nav-wrapper"]}`} onClick={hideMenu}></div>
          
          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu}/>
            </li>
            
            <li>
              <AdminOnlyLink>
                <Link to="/admin/home">
              <button className="--btn --btn-primary">Admin</button>
              </Link>
              </AdminOnlyLink>
            </li>
            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>
                Contact Us
              </NavLink>
            </li>

          </ul>
      < div className = {styles["header-right"]} onClick = {hideMenu} >
             <span className={styles.links}>
              <ShowOnLogout>
               <NavLink to="/login"className={activeLink}>Login</NavLink>
               </ShowOnLogout>
               <ShowOnLogin>
               <a href="#home" style={{color: "#ff4500"}}>
                <FaUserCircle size={16}/>
                Hi, {displayName}
               </a>
               </ShowOnLogin>
               <ShowOnLogin>
               <NavLink to="/order-history"className={activeLink}>My Orders</NavLink>
               </ShowOnLogin>
               <ShowOnLogin>
               <NavLink to="/" onClick={logoutUser}>Logout</NavLink>
               </ShowOnLogin>
             </span>
                {cart}
          </div>
      
        </nav>
        <div className={styles["menu-icon"]} >
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu}/>
        </div>
  
  </div>
      
    </header>
  );
}

export default Header;
