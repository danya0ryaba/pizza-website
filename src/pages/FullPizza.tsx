import React, { useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Pizza } from '../redux/slices/pizzaSlice'
import Style from './fullpizza.module.scss'

export const FullPizza: React.FC = () => {

    const [pizza, setPizza] = React.useState<Pizza>()
    const navigate = useNavigate()
    const { id } = useParams()
    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get('https://64bf5ea45ee688b6250d538d.mockapi.io/items/' + id)
                setPizza(data)
            } catch (error) {
                alert('Ошибка, вернуться на главную страницу')
                navigate('/')
            }
        }
        fetchPizza()
    }, [])

    if (!pizza) return <h1>Загрузка...</h1>

    return <div>
        <div className={Style.wrapperDiv}>
            <div className={Style.pizzaView}>
                <img className={Style.image} src={pizza.imageUrl} alt="" />
            </div>

            <div className={Style.info}>
                <h2 className={Style.title}>{pizza.title}</h2>
                <h4 className={Style.price}>{pizza.price} ₽</h4>
                <div>
                    Бекон, цыпленок, ветчина, сыры чеддер и пармезан,
                    соус песто, кубики брынзы, томаты, красный лук, сыр блю чиз, моцарелла, фирменный соус альфредо, чеснок, итальянские травы
                </div>
            </div>
        </div>

        <Link to={'/'}>
            <button className='button button--cart'>назад</button>
        </Link>


    </div >
} 
