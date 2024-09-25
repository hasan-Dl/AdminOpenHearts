import React from 'react'
import Navbar from '../../navbar/Navbar'
import LanguageSelector from '../../Languages/LanguageSelector'
import styles from './header.module.css'
import logo from '../../assets/openHearts.png'
export default function Header() {
  return (
    <div className={styles.parent}>
      <img src={logo} className={styles.img} alt="" />
      <Navbar/>
      <LanguageSelector/>
    </div>
  )
}
