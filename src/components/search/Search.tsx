import React from 'react'
import style from './search.module.scss'
import debounce from 'lodash.debounce'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/filterSlice'

export const Search: React.FC = () => {

    const dispatch = useDispatch()
    const [value, setValue] = React.useState('')
    const refInput = React.useRef<HTMLInputElement>(null)

    const onClickClear = () => {
        dispatch(setSearchValue(''))
        setValue('')
        refInput.current?.focus()
    }

    const updateSearchValue = React.useCallback(debounce(str => {
        dispatch(setSearchValue(str))
    }, 500), [])


    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        updateSearchValue(e.currentTarget.value)
    }

    return <div className={style.root}>
        <input ref={refInput}
            onChange={onChangeInput}
            value={value}
            className={style.input}
            type="text"
            placeholder='Поиск пиццы ...' />
        <svg
            className={style.search}
            xmlns="http://www.w3.org/2000/svg"
            height="512px" id="Layer_1"
            version="1.1"
            viewBox="0 0 512 512"
            width="512px" >
            <path d="M445,386.7l-84.8-85.9c13.8-24.1,21-50.9,21-77.9c0-87.6-71.2-158.9-158.6-158.9C135.2,64,64,135.3,64,222.9
              c0,87.6,71.2,158.9,158.6,158.9c27.9,0,55.5-7.7,80.1-22.4l84.4,85.6c1.9,1.9,4.6,3.1,7.3,3.1c2.7,0,5.4-1.1,7.3-3.1l43.3-43.8  
              C449,397.1,449,390.7,445,386.7z M222.6,125.9c53.4,0,96.8,43.5,96.8,97c0,53.5-43.4,97-96.8,97c-53.4,0-96.8-43.5-96.8-97 
               C125.8,169.4,169.2,125.9,222.6,125.9z" />
        </svg>
        {value && <svg
            onClick={onClickClear}
            className={style.close}
            height="512px" id="Layer_1"
            version="1.1" viewBox="0 0 512 512"
            width="512px"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  
            c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  
            c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z" />
        </svg>}

    </div>
}