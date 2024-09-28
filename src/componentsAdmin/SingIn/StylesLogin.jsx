import React, { useState } from 'react'
import logo from '../../assets/openHearts.png'
import styles from './login.module.css'
import LanguageSelector from '../../Languages/LanguageSelector'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// import { PiEyeSlashLight } from 'react-icons/pi'; 
import { GoEyeClosed } from "react-icons/go";
import { GoEye } from "react-icons/go";
import iconError from '../../assets/!.png';
import susses from  '../../assets/susses.png'

export default function StylesLogin() {
  const { t } = useTranslation()
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const navigate = useNavigate()

  // ----- Error and Susses ---
  const [errorPhone, setErrorPhone] = useState(false)
  const [errorPAssword, setErrorPassword] = useState(false)

  // Modal-----
  const [modalMessage, setModalMessage] = useState(''); // Состояние для сообщения в модальном окне
  const [showModal, setShowModal] = useState(false);
  const [modalClass, setModalClass] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [ShowImg,setShowImg]=useState()

  const handleClickOutside = (e) => {
    if (e.target.classList.contains('modal')) {
      setShowModal(false);
    }
  };

  const Login = (e) => {
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
    e.preventDefault();
    const data = {
      "Phone":phone,
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
          setModalMessage(t("Admin.susses"));
          setModalClass('modal-success'); 
          setShowImg (susses)
          navigate("/admin/statisticAdmin")
        } else {
          setModalMessage(t('Admin.send'));
          setModalClass('modal-error'); // Применяем класс для ошибочного состояния
          setShowImg (iconError)
        }
        setShowModal(true);
      })
  }

  return (
    <div>

      {showModal && (
        <div className="modal" onClick={handleClickOutside}>
          <div className={`modal-content ${modalClass}`}>
            <div className={`iconError`} >
            {ShowImg && <img src={ShowImg} alt="Response status" />}
            </div>
            <p className='textModal'>{modalMessage}</p>
          </div>
        </div>
      )}

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
          > {t("Admin.submit")}</button>

        </div>
      </div>
    </div>
  )
}
