import React from 'react'
import LanguageSelector from '../../Languages/LanguageSelector'
import styles from './headerAdmin.module.css'
import logo from '../../assets/openHearts.png'
export default function AdminHeader() {
  return (
    <div className={styles.parent}>
      <div className={styles.img}>
      <img  src={logo} alt="" />
      </div>
      <div className={styles.box}>
         <LanguageSelector/>
      </div>
    </div>
  )
}
