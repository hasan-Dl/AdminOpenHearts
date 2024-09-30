import React, { useState, useTransition } from 'react'
import logo from '../../assets/openHearts.png'
import styles from './login.module.css'
import LanguageSelector from '../../Languages/LanguageSelector'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import MyModal from '../../modal/MyModal'
import ErrorModal from '../../modal/ErrorModal'
export default function Email() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState(false)


  const [modalActive, setModalActive] = useState(false)
  const [errorM, setError] = useState(false)

  const Email = (e) => {
    e.preventDefault();

    let hasError = false;
    if (!email) {
      setErrorEmail(true);
      hasError = true;
    } else {
      setErrorEmail(false);
    }


    if (hasError) {
      return;
    }



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
      .then(response => {
        if (response.ok) {
          setModalActive(true);
          navigate('/code')
          setError(false);
        } else {
          setModalActive(false);
          setError(true);
        }

      })
  }


  return (

    <div className={styles.LoginParent} >
        <MyModal
        active={modalActive}
        setActive={setModalActive}
      />
      <ErrorModal
        error={errorM}
        setError={setError}
      />
      <h1 className={styles.line}></h1>
      <div >
        <div className={styles.parent}>
          <img src={logo} className={styles.img} alt="" />
          <div className={styles.boxLang}>
            <LanguageSelector />
          </div>
        </div>

        <div className={styles.box}>
          <div>
            <h1 className={styles.text}>Email to Update password</h1>
            <input
              className={styles.input}
              placeholder={t("Admin.email")}
              name='email'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                borderColor: errorEmail ? '#FF0000' : '',
              }}
            />
            {errorEmail && <p className={styles.error}>{t("Admin.error")}</p>}
          </div>
          <div className={styles.sub}>

            <button className={styles.submitEmail} onClick={Email} to={'/code'}> {t("Admin.submit")}</button>
          </div>
        </div>
      </div>
    </div >
  )
}
