import React from 'react'
import { Categories } from '../components/Categories'
import { Sort, list } from '../components/Sort'
import { Skeleton } from '../components/pizzaBlock/Skeleton'
import { PizzaBlock } from '../components/pizzaBlock/PizzaBlock'
import { Pagination } from '../components/pagination/Pagination'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../redux/store'
import { selectFilter, setCategoryId, setCurrenPage, setFilters } from '../redux/slices/filterSlice'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { Pizza, fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice'
import style from './home.module.scss'



export const Home: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { items, status } = useSelector(selectPizzaData)

    const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)

    const sortType = sort.sortPropperty

    // const [isLoading, setIsLoading] = React.useState<boolean>(true)

    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)

    const onChangePage = (number: number) => dispatch(setCurrenPage(number))

    const getPizzas = async () => {
        // setIsLoading(true)
        const order = sortType.includes('-') ? 'ASC' : 'DESC'
        const sortBy = sortType.replace('-', '')
        const categoty = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        dispatch(fetchPizzas({
            order,
            sortBy,
            categoty,
            search,
            currentPage
        }))
        window.scrollTo(0, 0)
    }

    const onChangeCategory = React.useCallback((id: number) => {
        dispatch(setCategoryId(id))
    }, [])

    const pizzas = items.map((obj: Pizza) => <PizzaBlock key={obj.id}  {...obj} />)

    const skeletons = [...Array(4)].map((_, i) => <Skeleton key={i} />)

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            let sort = list.find(obj => obj.sortPropperty === params.sortProperty)

            dispatch(setFilters({
                searchValue: String(params.search),
                categoryId: Number(params.category),
                currentPage: Number(params.currentPage),
                sort: sort || list[0],
            }))
            isSearch.current = true
        }
    }, [])

    React.useEffect(() => {
        window.scrollTo(0, 0)
        if (isSearch) getPizzas();
        isSearch.current = false
    }, [categoryId, sort.sortPropperty, currentPage, searchValue])



    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortPropperty,
                categoryId,
                currentPage
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sort.sortPropperty, currentPage, searchValue])

    return <div className="container">
        <div className="content__top">
            <Categories value={categoryId} onChangeCategory={onChangeCategory} />
            <Sort value={sort} />
        </div>

        <h2 className="content__title">Все пиццы</h2>
        { }
        <div className="content__items">{status === 'loading' ? skeletons : pizzas} </div>

        <Pagination paginationValue={currentPage} setPaginationValue={onChangePage} />

    </div>
}
