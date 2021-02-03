import dynamic from 'next/dynamic'
import axios from 'axios'

let NavBar = dynamic(() => import('../../components/NavBar/NavBar'))
let BaseCard = dynamic(() => import('../../components/BaseCard/BaseCard'))
let ItemRow = dynamic(() => import('../../components/ItemRow/ItemRow'))
let BaseContainer = dynamic(() => import('../../components/BaseContainer/BaseContainer'))

const ItemList = ({data}) => {

    let rows = data.items.map(r => {
        return <ItemRow key={r.id} data={r} />
    })

  return (
        <BaseContainer>
            <NavBar/>
            <BaseCard>
                {rows}
            </BaseCard>
        </BaseContainer>
  )

}

export const getServerSideProps = async ({query}) => {
    let {search} = query;
    let res = await axios.get(`http://localhost:3000/api/items?q=${search}`);
    let {ok, data, err} = res.data;
    if (!ok){
        /*handle error*/
    }
    return {
        props: {
            data
        }
    }
  }

export default ItemList