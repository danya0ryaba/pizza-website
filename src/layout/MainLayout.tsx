import React from 'react'
import { Header } from '../components/header/Header'
import { Outlet } from 'react-router-dom'

type MainLayoutPropsType = {
    children?: React.ReactNode | React.ReactChild
}

export const MainLayout: React.FC<MainLayoutPropsType> = () => {
    return <div className="wrapper">
        <Header />
        <div className="content"><Outlet /></div >
    </div>
}
