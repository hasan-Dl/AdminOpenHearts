import React, { useState } from 'react'
import styles from './statistic.module.css'
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
export default function AddStatistic() {
    const { t } = useTranslation()
    const [number, setNumber] = useState("")
    const [descriptionEn, setDescriptionEn] = useState("")
    const [descriptionRu, setDescriptionRu] = useState("")
    const [language, setLanguage] = useState(false);

    const clickButton = (e) => {
        setLanguage(e)
    }


    const Submit = (e) => {

        e.preventDefault();
        const submitStatistic = {
            quantity: Number(number),
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
                    alert("Susses")
                } else {
                    alert("Error")
                }

            })
    }

    return (
        <div>
            <div className={styles.inputStatistic}>
                <input
                    type="text"
                    className={styles.inputNumber}
                    placeholder={t("Admin.quantity")}
                    onChange={(e) => setNumber(e.target.value)}
                    value={number}
                />

                <div className={styles.add}>
                    {!language ? (
                        <div className={classNames(styles.divEN_RUactive,
                            { [styles.divEN_RU]: language === false })}>
                            <input
                                type="text"
                                className={styles.inputDescription}
                                placeholder='Description'
                                onChange={(e) => setDescriptionEn(e.target.value)}
                                value={descriptionEn}
                            />
                        </div>
                    ) :
                        (
                            <div className={styles.divEN_RU}>
                                <input
                                    type="text"
                                    className={styles.inputDescription}
                                    onChange={(e) => setDescriptionRu(e.target.value)}
                                    value={descriptionRu}
                                    placeholder='Описания'
                                />
                            </div>
                        )}
                    <div className={styles.En_RU}>

                        <div className={classNames(styles.one,
                            { [styles.oneNone]: language === false })} >
                            <button
                                className={classNames(styles.oneButton,
                                    { [styles.oneActive]: language === false })}
                                onClick={() => clickButton(false)}
                            >{t("Admin.en")}</button>
                        </div>

                        <div className={classNames(styles.gray,
                            { [styles.noneGray]: language === true })}>
                            <button
                                className={classNames(styles.twoButton,
                                    { [styles.twoActive]: language === true })}
                                onClick={() => clickButton(true)}
                            >{t("Admin.ru")}</button>
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
