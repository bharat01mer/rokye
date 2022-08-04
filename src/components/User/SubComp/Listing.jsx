import { Card } from "../../resuable"
import { cardData } from "../../../../utils/data"

const Listing = () => {
  return (
    <div className="rokye__user-dashboard__listing">
        <div className="title">
            <h1>My Listing</h1>
        </div>
        <div className="content">
            {
                cardData.slice(0,4).map((item)=>(
                    <div key={item.id}>
                    <Card id={item.id} city={item.city} place={item.place} img={item.img} bath={2}  bed={2} price={12000} title={item.title} useFavorite={false} />
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Listing