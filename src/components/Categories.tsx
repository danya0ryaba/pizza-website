import React from "react";

type CategoryPropsType = {
    value: number
    onChangeCategory: (value: number) => void
}

export const Categories: React.FC<CategoryPropsType> = React.memo(({ value, onChangeCategory }) => {

    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    return (<div className="categories">
        <ul>
            {categories.map((categoryName, ind) => (
                <li key={ind}
                    onClick={() => onChangeCategory(ind)}
                    className={value === ind ? 'active' : ''}>
                    {categoryName}
                </li>
            )
            )}
        </ul>
    </div>)
})
