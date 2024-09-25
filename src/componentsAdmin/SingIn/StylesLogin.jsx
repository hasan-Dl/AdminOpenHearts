import React, { useState } from 'react'
import logo from '../../assets/openHearts.png'
import styles from './login.module.css'
import LanguageSelector from '../../Languages/LanguageSelector'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
export default function StylesLogin() {
  const { t } = useTranslation()
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const navigate = useNavigate()


  const Login = (e) => {
    e.preventDefault();
    const data = {
      "Phone": Number(phone),
      "Password": password,
    };
    fetch("http://127.0.0.1:2020/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include', // Если нужно передавать cookie
    })
      .then(response => {
        if (response.ok) {
          alert("susses")
          navigate('/admin/statisticAdmin')
        } else {
          alert("Error")
        }
      })
  }

  return (
    <div>
      <div className={styles.parent}>
        <img src={logo} className={styles.img} alt="" />
        <div className={styles.boxLang}>
          <LanguageSelector />
        </div>
      </div>

      <div className={styles.box}>
        <h1 className={styles.text}>Login</h1>
        <div className={styles.boxx}>

          <div className={styles.inputBox}>
            <input className={styles.input}
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              type="text"
              placeholder='Phone'
            />
            <input className={styles.input}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="text"
              placeholder='Password'
            />
            <Link to={'/email'} className={styles.link}>Forgote password</Link>
          </div>
        </div>
        <div className={styles.boxSub}>
          <button
            onClick={Login}
            className={styles.submit}
          > {t("Admin.submit")}</button>

        </div>
      </div>
    </div>
  )
}
