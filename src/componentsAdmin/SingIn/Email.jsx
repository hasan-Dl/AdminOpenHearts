import React, { useState, useTransition } from 'react'
import logo from '../../assets/openHearts.png'
import styles from './login.module.css'
import LanguageSelector from '../../Languages/LanguageSelector'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
export default function Email() {
  const {t} =useTranslation()
  const navigate = useNavigate()
  const [email,setEmail]=useState('')

  const Email = () => {
    // e.preventDefault();
    
    fetch(`http://127.0.0.1:2020/check/email?email=${email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Если нужно передавать cookie
    })
      .then(response => {
        if (response.ok) {
          alert("susses")
          navigate('/code')
        } else {
          alert("Error")
        }
      })
  }


  return (
    <div className={styles.loginParent}>
      <div className={styles.parent}>
        <img src={logo} className={styles.img} alt="" />
        <div className={styles.boxLang}>
          <LanguageSelector />
        </div>
      </div>

      <div className={styles.box}>
        <h1 className={styles.text}>Email to Update password</h1>
        <input 
        className={styles.input}
        placeholder='Email'
        name='email'
        type="email" 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
      </div>
        <button className={styles.submitEmail}onClick={Email} to={'/code'}> {t("Admin.submit")}</button>
    </div>
  )
}
