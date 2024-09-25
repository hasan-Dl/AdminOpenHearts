import React, { useTransition } from 'react'
import logo from '../../assets/openHearts.png'
import styles from './login.module.css'
import LanguageSelector from '../../Languages/LanguageSelector'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
export default function Email() {
  const {t} =useTranslation()
  return (
    <div className={styles.loginParent}>
      <div className={styles.parent}>
        <img src={logo} className={styles.img} alt="" />
        <LanguageSelector />
      </div>

      <div className={styles.box}>
        <h1 className={styles.text}>Email to Update password</h1>
        <input 
        className={styles.input}
        placeholder='Email'
        name='email'
        type="email" />
      </div>
        <button className={styles.submitEmail} to={'/code'}> {t("Admin.submit")}</button>
    </div>
  )
}
