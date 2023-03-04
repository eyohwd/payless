import InfoBox from "../../infoBox/InfoBox";
import styles from "./Home.module.scss";
import {AiFillDollarCircle} from "react-icons/ai"
import { FaCartArrowDown } from "react-icons/fa";
import { TbCurrencyNaira} from "react-icons/tb";
import { BsCart4} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, STORE_PRODUCTS } from "../../../redux/slice/productSlice";
import { CALC_TOTAL_ORDER_AMOUNT, selectOrderHistory, selectTotalOrderAmount, STORE_ORDERS } from "../../../redux/slice/orderSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import { useEffect } from "react";
import Charts from "../../chart/Charts";











// Icons
const earningIcon = <AiFillDollarCircle size={30} color="#b624ff"/>;
const productIcon = <BsCart4 size={30} color="#1f93ff"/>;
const ordersIcon = <FaCartArrowDown size={30} color="orangered"/>;
const nairaIcon = <TbCurrencyNaira size={30} color="#b624ff"/>


const Home = () => {
  const products = useSelector(selectProducts)
  const orders = useSelector(selectOrderHistory)
  const totalOrderAmount = useSelector(selectTotalOrderAmount)
  const fbProducts = useFetchCollection("products")
  const {data} = useFetchCollection("orders")

  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(STORE_PRODUCTS({
        products: fbProducts.data,
      }))

      dispatch(STORE_ORDERS(data))

      dispatch(CALC_TOTAL_ORDER_AMOUNT());
  }, [dispatch, data, fbProducts]);
 
  return (
    <div className={styles.home}>
      <h2>Admin Home</h2>
      <div className={styles["info-box"]}>
        <InfoBox cardClass={`${styles.card} ${styles.card1}`}
         title={"Earnings"} 
         count={`\u20A6${totalOrderAmount}`}
         icon={nairaIcon}
         />

         <InfoBox cardClass={`${styles.card} ${styles.card2}`}
         title={"Products"} 
         count={products.length}
         icon={productIcon}
         />
         
         <InfoBox cardClass={`${styles.card} ${styles.card3}`}
         title={"Orders"} 
         count={orders.length}
         icon={ordersIcon}
         />
      </div>
      <div>
        <Charts/>
      </div>
    </div>
  );
}

export default Home;
