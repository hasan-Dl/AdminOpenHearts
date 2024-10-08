import React, { useState } from 'react'
import OtpInput from 'react-otp-input';
import styles from './login.module.css'
import LanguageSelector from '../../Languages/LanguageSelector';
import logo from '../../assets/openHearts.png'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MyModal from '../../modal/MyModal';
import ErrorModal from '../../modal/ErrorModal';
export default function Code() {
    const { t } = useTranslation()
    const [otp, setOtp] = useState('');
    const navigate = useNavigate()

    const [modalActive, setModalActive] = useState(false)
    const [errorM, setErrorM] = useState(false)

    const [otpError, setOtpError] = useState(false);


    const Submit = (e) => {
        e.preventDefault();

        let hasError = false;

        if (!otp) {
            setOtpError(true);
            hasError = true;
        } else {
            setOtpError(false);
        }
        if (hasError) {
            return;
        }

        const codeUpdate = {
            code: Number(otp)
        }
        setOtp('')

        fetch(`http://127.0.0.1:2020/check/code`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(codeUpdate),
            credentials: 'include', // Если нужно передавать cookie
        })
            .then(response => {
                if (response.ok) {
                    setModalActive(true);
                    navigate('/login')
                    setErrorM(false);
                } else {
                    setModalActive(false);
                    setErrorM(true);
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
                setError={setErrorM}
            />
            <h1 className={styles.line}></h1>

            <div>
                <div className={styles.parent}>
                    <img src={logo} className={styles.img} alt="" />
                    <div className={styles.boxLang}>
                        <LanguageSelector />
                    </div>
                </div>
                <div className={styles.styleCode1}>
                    <h1 className={styles.text}>Enter the code</h1>


                    <div className={styles.DivCode}>
                        <h1 className={styles.text1}>Enter code </h1>
                        <OtpInput
                            onChange={setOtp}
                            value={otp}
                            numInputs={6}
                            renderInput={(props) => <input
                                {...props}
                                className={styles.code}
                                placeholder='-'
                                style={{
                                    borderColor: otpError ? 'red' : '',
                                }}
                            />}
                        />
                    </div>
                    {otpError && <p style={{ color: 'red' }}>Code </p>}
                    <div className={styles.boxSub1}>

                        <button
                            onClick={Submit}
                            className={styles.submit}
                        > {t("Admin.submit")}</button>

                    </div>
                </div>

            </div>
        </div>
    )
}
