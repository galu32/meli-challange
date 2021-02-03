import '@fortawesome/fontawesome-free/css/all.min.css'; import
'bootstrap-css-only/css/bootstrap.min.css'; import
'mdbreact/dist/css/mdb.css';

import { MDBBtn, MDBIcon } from "mdbreact";
import styles from './NavBar.module.css'

export default (props) => {

  return (
    <div className={styles.navbar} >
        <img className={styles.logo} src='/meli.png'/>
        <input placeholder='Nunca dejes de buscar' className={styles["search-box"]}></input>
        <MDBBtn className={styles["search-button"]} size="sm">
            <MDBIcon icon="search" />
        </MDBBtn>
    </div>
  )
}