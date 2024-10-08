import React from 'react'
import LanguageSelector from '../../Languages/LanguageSelector'
import styles from './headerAdmin.module.css'
import logo from '../../assets/openHearts.png'
import { Link } from 'react-router-dom'
export default function AdminHeader() {
  return (
    <div className={styles.parent}>
      <div className={styles.img}>

        <Link to={"/"} >
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className={styles.box}>
        <LanguageSelector />
      </div>
    </div>


  )
}
