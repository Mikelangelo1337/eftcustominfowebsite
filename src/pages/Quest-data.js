import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import "../styles/quest.css"
function QuestData() {
    const { id } = useParams()
    const [task, setTask] = useState([])
    const navigate = useNavigate()
    const handleImageClick = (itemId) => {
        navigate(`/item/${itemId}`);
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
      gridImageLink
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
                const filteredTasks = data.data.tasks.filter(item => item.name === id);
                setTask(filteredTasks);
            })
    }, [id]);
    return (
        <div>
            <div>
                {task.map((i) => (
                    <div key={i.name}>
                        <div>
                            <h1>Квест: {i.name}</h1>
                        </div>
                        <p>Минимальный уровень игрока: {i.minPlayerLevel}</p>
                        <p>Фракция: {i.factionName}</p>
                        <img className="quest-img" src={i.taskImageLink} alt={i.name} />
                        <p>{i.objectives[0].description}</p>
                        <p>Награды: {i.experience}XP {i.finishRewards.items.map((reward) => (
                            <div className="rewards" key={reward.item.id}>
                                <img onClick={() => {
                                    handleImageClick(reward.item.id)
                                }} src={reward.item.gridImageLink} />  {reward.item.name}
                            </div>
                        ))}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default QuestData