import { useEffect, useState } from "react"
import "../styles/bosses.css"
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
function Boss() {
    const [boss, setBoss] = useState([])
    console.log(boss);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const handleImageClick = (itemId) => {
        navigate(`/boss/${itemId}`);
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
  }
}
        `,
            }),
        })
            .then(response => response.json())
            .then(data => {
                setBoss(data.data.bosses)
                setLoading(false)

            })
    }, []);
    return (
        <div className="nav-flea">
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
            </main>
            {loading ? (
                <p>Загрузка...</p>
            )
                : (
                    <div>

                        {boss.map((i) => {
                            return (
                                <div>
                                    <div className="div-boss-container" id={i.id}>
                                        <img onClick={() => {
                                            handleImageClick(i.id)
                                        }} className="boss-img" src={i.imagePosterLink}></img>
                                        <p>{i.name}</p>

                                    </div>
                                </div>
                            )
                        })}
                    </div >
                )}
        </div>


    )
}
export default Boss