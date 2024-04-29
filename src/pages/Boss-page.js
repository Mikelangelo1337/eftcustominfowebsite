import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "../styles/app.css"
import "../styles/bosses.css"
function BossPage() {
    const [boss, setBoss] = useState([])
    console.log(boss)
    const { id } = useParams()
    const navigate = useNavigate()
    const handleImageClick = (itemId) => {
        navigate(`/item/${itemId}`);
    };

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
                     bosses {
    id
    name
    imagePosterLink
  health {
    id
  max
    bodyPart
  }
   equipment {
    item {
      id
      name
      image512pxLink
   image8xLink
    }
  }
  }
 } `,
            }),
        })
            .then(response => response.json())
            .then(data => {
                const bossId = data.data.bosses.filter(item => item.id === id);
                setBoss(bossId);

            })
    }, [id]);
    return (
        <div id="cont">
            {boss.map((item) => {
                return (
                    <div className="boss-container" key={item.id}>
                        <div className="boss-flexy">
                            <img className="boss-info-img" src={item.imagePosterLink}></img>
                            <div className="hp">
                                <h3>{item.health[1].id} - {item.health[1].max}HP</h3>
                                <h3>{item.health[0].id} - {item.health[0].max}HP</h3>
                                <div className="div-arms">
                                    <h3>{item.health[2].max}HP - {item.health[2].id} </h3>
                                    <h3>{item.health[4].id} - {item.health[4].max}HP  </h3>
                                </div>
                                <h3>{item.health[6].id} - {item.health[6].max}HP </h3>
                                <div className="div-legs">
                                    <h3>{item.health[3].max}HP - {item.health[3].id} </h3>
                                    <h3>{item.health[5].id} - {item.health[5].max}HP</h3>
                                </div>

                            </div>
                        </div>
                        <div className="boss-info">
                            <div className="boss-text">
                                <h1>Информация о боссе</h1>
                            </div>
                            {boss.map((item) => {
                                return (
                                    <div className="">
                                        {item.equipment.map((i, ind) => (
                                            <div className="equipment" key={ind}>

                                                <p key={ind}>{i.item.name}</p>
                                                <img className="boss-equipment-img" onClick={() => {
                                                    handleImageClick(i.item.id)
                                                }} src={i.item.image8xLink}></img>
                                            </div>

                                        ))}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default BossPage