import dynamic from 'next/dynamic'

import {container} from '../css/app.module.css'

let NavBar = dynamic(() => import('../components/NavBar/NavBar'))
let BaseCard = dynamic(() => import('../components/BaseCard/BaseCard'))

export default (props) => {

  return (
        <div className={container}>
            <NavBar/>
            <BaseCard/>
            <style jsx global>{`
                body, html {
                    height: 100%;
                    margin: 0px; padding: 0px;
                    overflow-y: hidden;
                    position: relative;
                }
            `}</style>
        </div>
  )

}