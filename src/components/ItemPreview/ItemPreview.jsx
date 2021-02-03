import styles from './ItemPreview.module.css'
import {MDBBtn} from 'mdbreact'

const ItemPreview = ({data}) => {
    let {picture, title, description, price, condition, sold_quantity} = data.item
  return (
        <>
            <img className={styles["item-img"]} src={picture}/>
            <div className={styles["item-box"]}>
                <h5>{condition === 'new' ? 'Nuevo' : 'Usado'} - {sold_quantity} vendidos</h5>
                <br></br>
                <h3> {title} </h3>
                <div className={styles["item-box-pricing"]}>
                    <h1 className={styles["item-box-price"]}>${price.amount}</h1>
                    <MDBBtn className={styles["item-box-btn"]}> COMPRAR </MDBBtn>
                </div>
            </div>
            <div className={styles["item-description"]}>
                <h3>Descripción del producto:</h3>
                <br/>
                <pre className={styles["item-description-text"]}>{description}</pre>
            </div>
        </>
  )
}
export default ItemPreview