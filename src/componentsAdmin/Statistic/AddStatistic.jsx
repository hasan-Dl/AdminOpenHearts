import React, { useState } from 'react'
import styles from './statistic.module.css'
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import MyModal from '../../modal/MyModal';
import ErrorModal from '../../modal/ErrorModal';
export default function AddStatistic({setActiveStatistic }) {
    const { t } = useTranslation()
    const [number, setNumber] = useState("")
    const [descriptionEn, setDescriptionEn] = useState("")
    const [descriptionRu, setDescriptionRu] = useState("")
    const [language, setLanguage] = useState(false);
    // error === Submit
    const [errorNumber, setErrorNumber] = useState(false)
    const [errorDescriptionRu, setErrorDescriptionRu] = useState(false)
    const [errorDescriptionEn, setErrorDescriptionEn] = useState(false)

    // =-
    const clickButton = (e) => {
        setLanguage(e)
    }


    const [modalActive, setModalActive] = useState(false)
    const [errorM, setErrorM] = useState(false)
  


    const Submit = (e) => {

        e.preventDefault(e);

        let hasError = false;
        if (!number) {
            setErrorNumber(true);
            hasError = true;
        } else {
            setErrorNumber(false);
        }

        if (!descriptionRu) {
            setErrorDescriptionRu(true);
            hasError = true;
        } else {
            setErrorDescriptionRu(false);
        }
        if (!descriptionEn) {
            setErrorDescriptionEn(true);
            hasError = true;
        } else {
            setErrorDescriptionEn(false);
        }


        // Если есть ошибка, отменяем отправку
        if (hasError) {
            return;
        }

        const submitStatistic = {
            quantity:Number(number),
            ru: {
                description: descriptionRu,
            },
            en: {
                description: descriptionEn,
            },
        };
        setDescriptionEn('');
        setDescriptionRu('');
        setNumber('');

        fetch("http://127.0.0.1:2020/add/statistic", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submitStatistic),
            credentials: 'include', // Если нужно передавать cookie
        })
        .then(response => {
            if (response.ok) {
              setModalActive(true)
              setErrorM(false)
              setTimeout(() => {
                setModalActive(false); // Закрываем модальное окно
                setActiveStatistic(true); // Переключаемся на компонент StatisticS
              }, 2000);
            } else {
                setErrorM(true)
                setModalActive(false)
                setActiveStatistic(false);
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
        setError={setErrorM}
      />

            <div className={styles.inputStatistic}>
                <div>
                    <input
                        type="text"
                        className={styles.inputNumber}
                        placeholder={t("Admin.quantity")}
                        onChange={(e) => setNumber(e.target.value)}
                        value={number}
                        style={{
                            borderColor: errorNumber ? '#FF0000' : '',
                        }}
                    />
                    {errorNumber && <p className={styles.error}>{t("Admin.error")}</p>}
                </div>

                <div className={styles.add}>
                    {!language ? (
                        <div>

                            <div className={styles.divEN_RU}>
                                <input
                                    type="text"
                                    className={styles.inputDescription}
                                    placeholder='Description'
                                    onChange={(e) => setDescriptionEn(e.target.value)}
                                    value={descriptionEn}
                                    style={{
                                        borderColor: errorDescriptionEn ? '#FF0000' : '',
                                    }}
                                />
                            </div>
                            {errorDescriptionEn && <p className={styles.error}>{t("Admin.error")}</p>}
                        </div>
                    ) :
                        (
                            <div>

                                <div className={styles.divEN_RU}>
                                    <input
                                        type="text"
                                        className={styles.inputDescription}
                                        onChange={(e) => setDescriptionRu(e.target.value)}
                                        value={descriptionRu}
                                        placeholder='Описания'
                                        style={{
                                            borderColor: errorDescriptionRu ? '#FF0000' : '',
                                        }}
                                    />
                                </div>
                                {errorDescriptionRu && <p className={styles.error}>{t("Admin.error")}</p>}

                            </div>
                        )}

                    <div className={styles.En_Ru}>
                        <div
                            className={classNames(styles.buttonDiv1,
                                { [styles.activeBDiv1]: language === true })}
                        >
                            <button
                                className={classNames(styles.button1,
                                    { [styles.activeB1]: language === false })}
                                onClick={() => clickButton(false)}>{t("Admin.en")}</button>
                        </div>
                        <div
                            className={classNames(styles.buttonDiv,
                                { [styles.activeBDiv]: language === true })}
                        >

                            <button className={classNames(styles.button2,
                                { [styles.activeB2]: language === true })}
                                onClick={() => clickButton(true)}>{t("Admin.ru")}
                            </button>
                        </div>

                    </div>

                </div>
            </div>
            <div className={styles.boxSub}>

                <button
                    onClick={Submit}
                    className={styles.buttonSubmit}
                >
                    {t("Admin.submit")}
                </button>
            </div>
        </div>
    )
}
