import dynamic from 'next/dynamic'
import {card} from './BaseCard.module.css'
import styles from './BaseCard.module.css'
let ItemRow = dynamic(() => import('../ItemRow/ItemRow'))
let Line = dynamic(() => import('../Line/Line'))


import '@fortawesome/fontawesome-free/css/all.min.css'; import
'bootstrap-css-only/css/bootstrap.min.css'; import
'mdbreact/dist/css/mdb.css';

import { MDBBtn, MDBIcon } from "mdbreact";


export default (props) => {

  return (
    <div className={card}>
        {/* <ItemRow></ItemRow>
        <Line/> */}
        <img className={styles["item-img"]} src='/meli.png'/>
        <div className={styles["item-box"]}>
            <h5>Nuevo - 234 vendidos</h5>
            <br></br>
            <h3>ARTICULO NUMERO 1 BLA BLA BLA BLA BLA BLAARTICULO NUMERO 1 BLA BLA BLA BLA BLA BLAARTICULO NUMERO 1 BLA BLA BLA BLA BLA BLAARTICULO NUMERO 1 </h3>
            <div className={styles["item-box-pricing"]}>
                <h1 className={styles["item-box-price"]}>$1234,34</h1>
                <MDBBtn className={styles["item-box-btn"]}> COMPRAR </MDBBtn>
            </div>
        </div>
        <div className={styles["item-description"]}>
            <h3>ARTICULO NUMERO 1 BLA BLA BLA BLA BLA BLAARTICULO NUMERO 1 BLA BLA BLA BLA BLA BLAARTICULO NUMERO 1 BLA BLA BLA BLA BLA BLAARTICULO NUMERO 1 BLA BLA BLA BLA BLA BLAARTICULO NUMERO 1 BLA BLA BLA BLA BLA BLAARTICULO NUMERO 1 BLA BLA BLA BLA BLA BLAARTICULO NUMERO 1 BLA BLA BLA BLA BLA BLAARTICULO NUMERO 1 BLA BLA BLA BLA BLA BLAARTICULO NUMERO 1 BLA BLA BLA BLA BLA BLAARTICULO NUMERO 1 BLA BLA BLA BLA BLA BLAARTICULO NUMERO 1 BLA BLA BLA BLA BLA BLAARTICULO NUMERO 1 BLA BLA BLA BLA BLA BLAARTICULO NUMERO 1 BLA BLA BLA BLA BLA BLAARTICULO NUMERO 1 BLA BLA BLA BLA BLA BLAARTICULO NUMERO 1 BLA BLA BLA BLA BLA BLAARTICULO NUMERO 1 BLA BLA BLA BLA BLA BLA</h3>
        </div>
    </div>
  )
}