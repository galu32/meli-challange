import {card} from './BaseCard.module.css'

const BaseCard = ({children}) => {
  return (
    <div className={card}>
      <>
        {children}
      </>
    </div>
  )
}

export default BaseCard