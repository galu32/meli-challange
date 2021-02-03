import styles from './ItemRow.module.css'

const ItemRow = ({data}) => {
  let handleClick = () => window.location = `/items/${data.id}`
  return (
          <div className={styles["item-row"]} onClick={() => handleClick()}>
              <img className={styles["item-row-img"]} src={data.picture}/>
              <div className={styles["item-row-container"]}>
                  <h3 className={styles["item-row-price"]}>${data.price.amount}</h3>
                  <h3 className={styles["item-row-name"]}>{data.title}</h3>
              </div>
          </div>
  )
}

export default ItemRow