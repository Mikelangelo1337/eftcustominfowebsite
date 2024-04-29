import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import "../styles/quest.css"
import "../styles/app.css"
function Quest() {
    const [task, setTask] = useState([])
    const [traders, setTraders] = useState([])
    const [selectedTrader, setSelectedTrader] = useState(null);
    const navigate = useNavigate()
    const handleImageClick = (itemId) => {
        navigate(`/quest/${itemId}`);
    };
    console.log(task);
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
            traders{
    name
    image4xLink
    imageLink
  }
           tasks {
  name
  minPlayerLevel
  taskImageLink
  experience
  finishRewards{
   items{
    item{
      id
      name
    }
  }
  }

factionName
  objectives {
    description
  }
  trader {
    name
    image4xLink
  }
}
}
        `,
            }),
        })
            .then(response => response.json())
            .then(data => {
                setTask(data.data.tasks)
                setTraders(data.data.traders)
            })
    }, []);
    const handleTraderClick = (trader) => {
        setSelectedTrader(trader);
    };
    return (
        <div>
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
            </div>
            <div className="quest-div">
                <div className="quest-txt">
                    {selectedTrader ? (
                        <h1 style={{ color: 'lightblue', textDecoration: 'underline', textTransform: 'uppercase' }}> {selectedTrader.name}</h1>
                    ) : (
                        <h1>Чтобы начать, выберите торговца</h1>
                    )}
                </div>
                <div className="traders">
                    {traders.map((i) => (
                        <div onClick={() => handleTraderClick(i)} key={i.name} className={`trader-image-container ${selectedTrader === i ? 'selected-trader' : ''}`}>
                            <img src={i.image4xLink} alt={i.name} />
                        </div>
                    ))}
                </div>
                <div>


                    {selectedTrader && (
                        <div className="selected-trader-quests">

                            {task.filter((task) => task.trader.name === selectedTrader.name)
                                .map((task) => (
                                    <div key={task.name} className="quest-item">
                                        <h3>{task.name}</h3>
                                        <img onClick={() => {
                                            handleImageClick(task.name)
                                        }} src={task.taskImageLink}></img>
                                    </div>

                                ))}
                        </div>
                    )})

                </div>
            </div>

        </div>

    )
}
export default Quest