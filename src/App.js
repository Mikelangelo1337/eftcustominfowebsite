

import { NavLink, useNavigate } from "react-router-dom";
import "./styles/app.css"
import "./styles/Flea.css"
import { useEffect, useState } from "react";


function App() {
  const [flea, setFlea] = useState([])
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const handleImageClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const [displayLimit, setDisplayLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  console.log(flea);
  const filteredFlea = flea
    .filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, displayLimit);
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
            traders {
    name
    image4xLink
  }
   items {
    id
    name
   basePrice
    link
    avg24hPrice
    lastLowPrice
    image8xLink
    sellFor {
      price
      currency
      priceRUB
      vendor{
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
        setFlea(data.data.items)
        setLoading(false)

      })
  }, []);
  const handleLoadMore = () => {
    setDisplayLimit((prevLimit) => prevLimit + 10);
  };
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
            <input
              type="text"
              id="searchInput2"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Поиск"
            />

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
            <div>
              <input
                type="text"
                id="searchInput"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Поиск"

              />
              <div className="row">
                <div className="cell"><h3>Название</h3></div>
                <div className="cell"><h3>Цена</h3></div>
                <div className="cell"><h3>Цена за 24ч</h3></div>
                <div className="cell"><h3>Продать</h3></div>
              </div >

              {filteredFlea.map((item) => (
                <div key={item.id} className="row row-item">

                  <div className="cell"> <img onClick={() => {
                    handleImageClick(item.id)
                  }} src={item.image8xLink}></img><p>{item.name}</p></div>
                  <div className="cell"><p>{item.basePrice}₽</p></div>
                  <div className="cell"><p>{item.avg24hPrice}₽</p></div>
                  <div className="cell"><span className="span">   <p>
                    {item.sellFor &&
                      item.sellFor
                        .filter(entry => entry.vendor.name !== "Flea Market")
                        .reduce((max, entry) => (entry.price > max.price ? entry : max), { price: 0 })
                        .price}₽
                  </p>
                  </span>
                  </div>

                </div>

              ))
              }

              {searchQuery === "" && (
                <button onClick={handleLoadMore}>Загрузить еще</button>
              )}
            </div >



          )}
      </main >

    </div >

  );
}

export default App;
