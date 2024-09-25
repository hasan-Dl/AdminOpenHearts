import React from 'react'
import { useTranslation } from 'react-i18next'
import {NavLink} from 'react-router-dom'
import styleNavbar from './Navbar.module.css'
export default function Navbar() {
    const {t} =  useTranslation()
  return (
    <div className={styleNavbar.parent}>
        <NavLink className={styleNavbar.link}  to={'/'}> {t('Home.Navbar.home')}</NavLink>
        <NavLink className={styleNavbar.link}  to={'/about'}>{t('Home.Navbar.About')}</NavLink>
        <NavLink className={styleNavbar.link}  to={'/specialists'}>{t('Home.Navbar.Specialists')}</NavLink>
        <NavLink className={styleNavbar.link}  to={'/direction'}>{t('Home.Navbar.Direction')}</NavLink>
        <NavLink className={styleNavbar.link}  to={'/stories'}>{t('Home.Navbar.Stories')}</NavLink>
        <NavLink className={styleNavbar.login}  to={'/login'}>Login</NavLink>
    </div>
  )
}