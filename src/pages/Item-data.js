import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import '../styles/app.css'
import '../styles/data.css'
function ItemData() {
    const [flea, setFlea] = useState([])
    const { id } = useParams()
    console.log(flea);
    useEffect(() => {
        fetch('https://api.tarkov.dev/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: `
          {
   items {
    id
    name
   basePrice
    link
    avg24hPrice
    lastLowPrice
    image8xLink
      weight
     baseImageLink
    sellFor {
      price
      currency
      priceRUB
      vendor{
        name
      }
      
    }
     category {
     name
      parent {
      name
    }
    children {
      name
    }
   }
  }
}
        `,
            }),
        })
            .then(response => response.json())
            .then(data => {
                const fleaid = data.data.items.filter(item => item.id === id);
                setFlea(fleaid);


            })
    }, [id]);
    return (
        <div>
            <div>
                {flea.map((item) => {
                    return (
                        <div className="data-cont">
                            <div className="item-data-div" key={item.id}>
                                <h1>{item.name}</h1>
                                <img className="info-img" src={item.image8xLink}></img>
                            </div>
                            <div className="item-stats" >
                                <h1>Статистика</h1>
                                <p>Категория: {item.category.name}</p>
                                <p>Название типа: {item.category.parent.name}</p>
                                <p>
                                    Связи: {item.category.children && item.category.children.length > 0
                                        ? item.category.children.map((child, index) => (
                                            <p key={index}>{child.name}</p>
                                        ))
                                        : <p>Предмет ни с чем не связан</p>}
                                </p>
                                <p>Вес: {item.weight} кг</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default ItemData