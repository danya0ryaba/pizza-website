import React from 'react'
import style from './pagination.module.scss'

type PaginationPropsType = {
    paginationValue: number
    setPaginationValue: (value: number) => void
}

export const Pagination: React.FC<PaginationPropsType> = ({ paginationValue, setPaginationValue }) => {

    const valuePage = [1, 2, 3] //переписать пагинацию

    const onClickLeft = () => {
        if (paginationValue > 1) setPaginationValue(paginationValue - 1)
    }

    const onClickRight = () => {
        if (paginationValue < 3) setPaginationValue(paginationValue + 1)
    }

    return <div className={style.main}>
        <ul>
            <li className={style.number} onClick={onClickLeft}>{`<`}</li>
            {valuePage.map((el, index) => (
                <li key={index}
                    onClick={() => setPaginationValue(el)}
                    className={`${style.number} ${el === paginationValue ? style.active : ''}`}>{el}</li>
            ))}
            <li className={style.number} onClick={onClickRight}>{`>`}</li>
        </ul>
    </div>

}
