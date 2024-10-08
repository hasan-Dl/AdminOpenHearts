import React, { useRef, useState } from 'react'
import styles from './report.module.css'
import classNames from 'classnames';
import { useTranslation } from 'react-i18next'
import date_time from "../../assets/date_time.png"
import PDF from "../../assets/pGF.png"
import MyModal from '../../modal/MyModal';
import ErrorModal from '../../modal/ErrorModal';
export default function AddReport({setActive}) {

    const dateTimeRef = useRef()

    const { t } = useTranslation()
    const [titleEn, setTitleEn] = useState("")
    const [titleRu, setTitleRu] = useState("")

    const [date, setDate] = useState("")

    const [photoPath, setPhotoPath] = useState(""); // Путь к фото (имя файла)
    const [base64File, setBase64File] = useState(""); // To store base64-encoded file

    // Handle file selection and conversion to base64
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the first uploaded file

        if (file) {
            setPhotoPath(file.name); // Set the file name to the input field

            const reader = new FileReader();

            // When file reading is done, convert to base64
            reader.onloadend = function () {
                const rawData = reader.result;

                // Convert the file data to base64 in chunks
                const chunkSize = 100536;
                let offset = 0;
                let base64String = "";

                while (offset < rawData.byteLength) {
                    const chunk = rawData.slice(offset, offset + chunkSize);
                    base64String += btoa(String.fromCharCode.apply(null, new Uint8Array(chunk)));
                    offset += chunkSize;
                }

                // Store the base64 string
                setBase64File(base64String);
            };

            // Read the file as an array buffer (necessary for conversion to base64)
            reader.readAsArrayBuffer(file);
        }
    };

    // ----
    const [language, setLanguage] = useState(false);

    // ----- EN-RU--Button
    const handleLanguageChange = (lang) => {
        setLanguage(lang)

    }

    const [modalActive, setModalActive] = useState(false)
    const [errorM, setErrorM] = useState(false)


    const[errorTitleEn,setErrorTitleEn]=useState(false)
    

    const handleSubmit = (event) => {
        event.preventDefault();

        // Prepare the payload with the base64-encoded file
        const newPartner = {
            file: base64File,
            date: date,
            "ru": {
                title: titleRu,
            },
            "en": {
                title: titleEn,
            },


        };

        // POST request
        fetch("http://127.0.0.1:2020/add/report", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPartner),
            credentials: 'include', // If cookies are needed
        })
            .then(response => {
                if (response.ok) {
                    setModalActive(true)
                    setErrorM(false)
                    setTimeout(() => {
                        setModalActive(false);
                        setActive(true) 
                      }, 2000);
                } else {
                    setModalActive(false)
                    setErrorM(true)
                }

            })
            .catch(error => {
                console.error("Error:", error);
            });
    };

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
            {!language ? (
                <div className={styles.parent} >
                    <div className={styles.boxStr} >
                        <input
                            className={styles.inputStr}
                            placeholder="Title"
                            type="text"
                            onChange={(e) => setTitleEn(e.target.value)}
                            value={titleEn}
                        />
                        {/* -------- */}
                    </div>
                    {/* <div className={styles.En_Ru}>
                        <button
                            className={classNames(styles.button,
                                { [styles.activeB]: language === false })}
                            onClick={() => handleLanguageChange(false)}>{t("Admin.en")}</button>

                        <button className={classNames(styles.button,
                            { [styles.activeB]: language === true })}
                            onClick={() => handleLanguageChange(true)}>{t("Admin.ru")}</button>
                    </div> */}

                    <div className={styles.En_Ru}>
                        <div
                            className={classNames(styles.buttonDiv1,
                                { [styles.activeBDiv1]: language === true })}
                        >
                            <button
                                className={classNames(styles.button1,
                                    { [styles.activeB1]: language === false })}
                                onClick={() => handleLanguageChange(false)}>{t("Admin.en")}</button>
                        </div>
                        <div
                            className={classNames(styles.buttonDiv,
                                { [styles.activeBDiv]: language === true })}
                        >

                            <button className={classNames(styles.button2,
                                { [styles.activeB2]: language === true })}
                                onClick={() => handleLanguageChange(true)}>{t("Admin.ru")}
                            </button>
                        </div>

                    </div>
                </div>
            ) : (
                <div className={styles.parent} >
                    <div className={styles.boxStr}>
                        <input
                            className={styles.inputStr}
                            placeholder="Заголовок"
                            type="text"
                            onChange={(e) => setTitleRu(e.target.value)}
                            value={titleRu}
                        />
                    </div>
                    {/* <div className={styles.En_Ru}>
                        <button
                            className={classNames(styles.button,
                                { [styles.activeB]: language === false })}
                            onClick={() => handleLanguageChange(false)}>{t("Admin.en")}</button>

                        <button className={classNames(styles.button,
                            { [styles.activeB]: language === true })}
                            onClick={() => handleLanguageChange(true)}>{t("Admin.ru")}</button>
                    </div> */}

                    <div className={styles.En_Ru}>
                        <div
                            className={classNames(styles.buttonDiv1,
                                { [styles.activeBDiv1]: language === true })}
                        >
                            <button
                                className={classNames(styles.button1,
                                    { [styles.activeB1]: language === false })}
                                onClick={() => handleLanguageChange(false)}>{t("Admin.en")}</button>
                        </div>
                        <div
                            className={classNames(styles.buttonDiv,
                                { [styles.activeBDiv]: language === true })}
                        >

                            <button className={classNames(styles.button2,
                                { [styles.activeB2]: language === true })}
                                onClick={() => handleLanguageChange(true)}>{t("Admin.ru")}
                            </button>
                        </div>

                    </div>
                </div>
            )}


            <div className={styles.submit}>

                <div className={styles.date}>
                    <input type="text"
                        placeholder={t("Admin.date")}
                        value={date}
                        className={styles.time1}
                        readOnly
                    />

                    <input
                        type="datetime-local"
                        id="date-time"
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                        ref={dateTimeRef}
                        style={{ opacity: "0" }}
                    />
                    <button
                        style={{ border: "none", background: "white" }}
                    >
                        <img
                            style={{ objectFit: "cover" }}
                            onClick={() => { dateTimeRef.current.showPicker() }}
                            src={date_time}
                            alt="" />
                    </button>

                </div>

                <div className={styles.parentPhoto}>
                    <input
                        className={styles.photo}
                        type="text"
                        placeholder="PDF"
                        value={photoPath}
                        readOnly
                    />
                    <input
                        type="file"
                        accept="PGF"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        id="photo-upload"
                    />
                    <label
                        className={styles.buttonPhoto}
                        htmlFor="photo-upload">
                        <img src={PDF} alt="" />
                    </label>
                </div>
            </div>
            <div className={styles.subDiv}>

                <button
                    onClick={handleSubmit}
                    type="submit"
                    className={styles.buttonSubmit}>
                    {t("Admin.submit")}
                </button>
            </div>

        </div>
    )
}
