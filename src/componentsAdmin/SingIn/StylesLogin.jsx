import React, { useState } from 'react'
import logo from '../../assets/openHearts.png'
import styles from './login.module.css'
import LanguageSelector from '../../Languages/LanguageSelector'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { GoEyeClosed } from "react-icons/go";
import { GoEye } from "react-icons/go";
import MyModal from '../../modal/MyModal'
import { use } from 'i18next'
import ErrorModal from '../../modal/ErrorModal'


export default function StylesLogin() {

  const { t } = useTranslation()
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const navigate = useNavigate()

  // ----- Error and Susses ---
  const [errorPhone, setErrorPhone] = useState(false)
  const [errorPAssword, setErrorPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  // Modal-----

  const [modalActive, setModalActive] = useState(false)
  const [errorM, setError] = useState(false)

  const Login = (e) => {

    e.preventDefault();

    let hasError = false;
    if (!password) {
      setErrorPassword(true);
      hasError = true;
    } else {
      setErrorPassword(false);
    }

    if (!phone) {
      setErrorPhone(true);
      hasError = true;
    } else {
      setErrorPhone(false);
    }


    // Если есть ошибка, отменяем отправку
    if (hasError) {
      return;
    }

    const data = {
      "Phone": phone,
      "Password": password,
    };

    setPhone("");
    setPassword("");

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
          // setModalActive(true);
          navigate("/admin/statisticAdmin")
          setModalActive(true);
          setError(false);
        } else {
          setModalActive(false);
          setError(true);
        }

      })
  }

  return (
    <div>

      <MyModal
        active={modalActive}
        setActive={setModalActive}
      />
      <ErrorModal
      error={errorM}
      setError={setError}
      />

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
            <div >
              <input className={styles.input}
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                type="text"
                placeholder='Phone'
                style={{
                  borderColor: errorPhone ? '#FF0000' : '',
                }}
              />
              {errorPhone && <p className={styles.error}>{t("Admin.error")}</p>}


            </div>

            <div style={{ position: 'relative', width: 'fit-content' }}>

              <input className={styles.inputPass}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                // 
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                name='password'
                style={{
                  borderColor: errorPAssword ? '#FF0000' : '',
                }}
              />
              {errorPAssword && <p className={styles.error}>{t("Admin.error")}</p>}
              <span
                onClick={() => setShowPassword(!showPassword)}
                className={styles.eye}
              >
                {showPassword ? <GoEyeClosed className={styles.eyes} /> : <GoEye className={styles.eyes} />}
              </span>
            </div>
            <Link to={'/email'} className={styles.link}>Forgote password</Link>
          </div>
        </div>
        <div className={styles.boxSub}>
          <button
            onClick={Login}
            className={styles.submit}
          > {t("Admin.submit")}
          </button>

        </div>
      </div>
    </div>
  )
}
