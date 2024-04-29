

import { NavLink, useNavigate } from "react-router-dom";
import "../styles/app.css"
import "../styles/Ammo.css"
import { useEffect, useState } from "react";


function Ammo() {
    const [ammo, setAmmo] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate()
    const handleImageClick = (itemId) => {
        navigate(`/ammo/${itemId}`);
    };
    console.log(ammo)
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
                setAmmo(data.data.ammo)
                setLoading(false)
            })
    }, []);
    return (
        <div className="nav-ammo">
            <div id="container-header">
                <header>
                    <div className="brand" data-v-257c3298="">
                        <div className="title" data-v-257c3298="">
                            <NavLink to={"/"} data-v-257c3298="">Tarkov Data</NavLink>
                        </div>
                        <div className="desc" data-v-257c3298="">
                            <p> Мониторинг цен на товары барахолки и утилиты</p></div>
                    </div>
                </header>
            </div>
            <main>
                <div className="nav-menu">
                    <div className="menu" data-v-39f6afb9="">
                        <NavLink to={"/"} >
                            Барахолка
                        </NavLink>
                        <NavLink to={"/ammo"}>Патроны</NavLink>
                        <NavLink to={"/boss"}>Боссы</NavLink>
                        <NavLink to={"/quest"}>Квесты</NavLink>
                    </div>
                </div>
                {loading ? (
                    <p>Загрузка...</p>
                )
                    : (
                        <div className="nav-ammos">
                            {ammo.map(ammoItem => (
                                <div className="container-ammo" key={ammoItem.item.id}>
                                    <img onClick={() => handleImageClick(ammoItem.item.id)} src={ammoItem.item.image512pxLink} alt={ammoItem.item.name} />
                                    <p>{ammoItem.item.name}</p>
                                </div>
                            ))}
                        </div>
                    )}
            </main>

        </div>

    );
}

export default Ammo
