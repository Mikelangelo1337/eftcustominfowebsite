import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Ammo.css"
import "../styles/app.css"
import "../styles/ammo-item.css"
function AmmoItem() {
    const [ammo, setAmmo] = useState([])
    console.log(ammo)
    const { id } = useParams()

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
                    ammo {
                        item {
                            id
                            name
                            image512pxLink
                            gridImageLink
                            buyFor {
                                price
                                currency
                                 priceRUB
        source
                            }
                             sellFor {
        price
        currency
        priceRUB
        source
      }
                        }
                        penetrationPower
                        penetrationChance
                        damage
                        ammoType
                        weight
                        tracer
                        armorDamage
                    }
                }
            `,
            }),
        })
            .then(response => response.json())
            .then(data => {
                const ammoById = data.data.ammo.filter(item => item.item.id === id);
                setAmmo(ammoById);

            })
    }, [id]);
    return (
        <div>
            {ammo.map((item) => {
                return (
                    <div>
                        <div className="ammo-cell" key={item.id}>
                            <img src={item.item.gridImageLink}></img>
                            <h3>{item.item.name}</h3>
                            <h3>Бронепробитие: {item.penetrationPower} </h3>
                            <h3>Урон: {item.damage}</h3>
                            <h3>Урон по броне: {item.armorDamage}</h3>
                            <h3>Тип патрона: {item.ammoType}</h3>
                        </div>
                        <div className="ammo-cell-2">
                            <h1>Данные предмета:</h1>
                            {item?.item?.buyFor && item.item.buyFor.length > 0 ? (
                                <h3>
                                    Купить за: <span className="styled-span">{item.item.buyFor[0].price}{item.item.buyFor[0].currency}</span> у {item.item.buyFor[0].source}
                                </h3>
                            ) : (
                                <h3>Нельзя купить</h3>
                            )}

                            <h3>Продать за: <span className="styled-span">{item.item.sellFor[0].price}{item.item.sellFor[0].currency}</span> у {item.item.sellFor[0].source}</h3>

                        </div>

                    </div>
                )
            })}
        </div>
    )
}
export default AmmoItem