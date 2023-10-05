import React from 'react'
import style from './NotFoundBlock.module.scss'
import { NavLink } from 'react-router-dom'

export const NotFoundBlock: React.FC = () => {
    return (
        <div className={style.root}>
            <h1>
                <span>😕</span>
                <br />
                Ничего не найдено
            </h1>
            <p className={style.description}>Вероятней всего, вы не заказывали ещё пиццу.</p>

            <p className={style.description}>Для того, чтобы заказать пиццу, перейди на главную страницу.</p>

            <img src="../../assets/cartClear" alt="" />
            <NavLink to={'/'}>
                <button>Вернуться назад</button>
            </NavLink>
        </div>
    )
}
