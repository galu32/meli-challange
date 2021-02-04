import styles from "./ItemPreview.module.css";
import PropTypes from "prop-types";

const ItemPreview = ({data}) => {
    let {picture, title, description, price, condition, sold_quantity} = data.item;
    return (
        <>
            <img className={styles["item-img"]} src={picture}/>
            <div className={styles["item-box"]}>
                <h5>{condition === "new" ? "Nuevo" : "Usado"} - {sold_quantity} vendidos</h5>
                <h3> {title} </h3>
                <div className={styles["item-box-pricing"]}>
                    <h1 className={styles["item-box-price"]}>$ {Number(price.amount).toLocaleString("en")}</h1>
                    <button className={styles["item-box-btn"]}> Comprar </button>
                </div>
            </div>
            <div className={styles["item-description"]}>
                <h3>Descripción del producto:</h3>
                <br/>
                <pre className={styles["item-description-text"]}>{description}</pre>
            </div>
        </>
    );
};

ItemPreview.propTypes = {
    data: PropTypes.object,
};

export default ItemPreview;