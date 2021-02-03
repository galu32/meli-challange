import styles from './ItemRow.module.css'

export default (props) => {

  return (
        <div className={styles["item-row"]} onClick={() => console.log(1)}>
            <img className={styles["item-row-img"]} src='/meli.png'/>
            <div className={styles["item-row-container"]}>
                <h3 className={styles["item-row-price"]}>$1.123,99</h3>
                <h3 className={styles["item-row-name"]}>ARTICULO NUMERO 1 BLA BLA BLA BLA BLA BLA BLAARTICULO NaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaUMERO 1 BLA BLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </h3>
            </div>
        </div>
  )
}