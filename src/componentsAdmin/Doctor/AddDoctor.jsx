import React, { useRef, useState } from 'react'
import classNames from 'classnames';
import styles from './doctor.module.css'
import { useTranslation } from 'react-i18next';
import Plus from '../../assets/Admin botton.png'
import X from '../../assets/Group 110@2x.png'
import { CiTimer } from "react-icons/ci";
import { RxTimer } from "react-icons/rx";
import MyModal from '../../modal/MyModal';
import ErrorModal from '../../modal/ErrorModal';
export default function AddDoctor() {
    const timeRef = useRef()
    const timeRefEnd = useRef()
    const { t } = useTranslation()
    // --------- En----
    const [nameEn, setNameEn] = useState("")
    const [professionEn, setProfessionEn] = useState("")
    const [educationEn, setEducationEn] = useState("")
    const [specializationEn, setSpecializationEn] = useState("")
    const [aboutEn, setAboutEn] = useState("")

    // --List En ---
    const [additionalEn, setAdditionalEn] = useState("")
    const [InfoEn, setInfoEn] = useState([]);
    // ---
    const [experienceEn, setExperienceEn] = useState("")
    const [expInfoEn, setExpInfoEn] = useState([])
    // ------------
    const [servicesEn, setServicesEn] = useState("")
    const [servicesInfoEn, setServicesInfoEn] = useState([])

    //    -----------------
    const [nameRu, setNameRu] = useState("")
    const [professionRu, setProfessionRu] = useState("")
    const [educationRu, setEducationRu] = useState("")
    const [specializationRu, setSpecializationRu] = useState("")
    const [aboutRu, setAboutRu] = useState("")
    // -------------------------------------

    // List Ru ----
    const [additionalRu, setAdditionalRu] = useState("")
    const [InfoRu, setInfoRu] = useState([]);
    // -----
    const [experienceRu, setExperienceRu] = useState("")
    const [expInfoRu, setExpInfoRu] = useState([])
    // ------------------
    const [servicesRu, setServicesRu] = useState("")
    const [servicesInfoRu, setServicesInfoRu] = useState([])

    // -------------------

    // ----- Email -- Phone  -- Photo -
    const [gmail, setGmail] = useState('')
    const [phone, setPhone] = useState("")


    const [starTime, setStartTime] = useState("")
    const [end, setEnd] = useState("")


    const [days, setDays] = useState("")
    const [week, setWeek] = useState([])

    const [photoPath, setPhotoPath] = useState(""); // Путь к фото (имя файла)

    const [modalActive, setModalActive] = useState(false)
    const [errorM, setError] = useState(false)
    // ----
    const [language, setLanguage] = useState(false);

    // ----- EN-RU--Button
    const handleLanguageChange = (lang) => {
        setLanguage(lang)

    }


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


    // --- Error EN ---
    const [errorNameEn, setErrorNameEn] = useState(false)
    const [errorProfessionEn, setErrorProfessionEn] = useState(false)
    const [errorEducationEn, setErrorEducationEn] = useState(false)
    const [errorSpecializationEn, setErrorSpecializationEn] = useState(false)
    const [errorAdditionalEn, setErrorAdditionalEn] = useState(false)
    const [errorAboutEn, setErrorAboutEn] = useState(false)
    const [errorExperienceEn, setErrorExperienceEn] = useState(false)
    const [errorServicesEn, setErrorServicesEn] = useState(false)
    // ---Error -- Ru ---
    const [errorNameRu, setErrorNameRu] = useState(false)
    const [errorProfessionRu, setErrorProfessionRu] = useState(false)
    const [errorEducationRu, setErrorEducationRu] = useState(false)
    const [errorSpecializationRu, setErrorSpecializationRu] = useState(false)
    const [errorAdditionalRu, setErrorAdditionalRu] = useState(false)
    const [errorAboutRu, setErrorAboutRu] = useState(false)
    const [errorExperienceRu, setErrorExperienceRu] = useState(false)
    const [errorServicesRu, setErrorServicesRu] = useState(false)
    // ----------------
    const [errorDays, setErrorDays] = useState(false)
    const [errorStartTime, setErrorStartTime] = useState(false)
    const [errorEndTime, setErrorEndTime] = useState(false)


    const [errorPhone, setErrorPhone] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPhoto, setErrorPhoto] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();

        let hasError = false

        if (!nameEn) {
            setErrorNameEn(true);
            hasError = true;
        } else {
            setErrorNameEn(false)
        }

        if (!professionEn) {
            setErrorProfessionEn(true);
            hasError = true;
        } else {
            setErrorProfessionEn(false)
        }

        if (!educationEn) {
            setErrorEducationEn(true);
            hasError = true
        } else {
            setErrorEducationEn(false)
        }

        if (!specializationEn) {
            setErrorSpecializationEn(true);
            hasError = true
        } else {
            setErrorSpecializationEn(false)
        }
        // if (!additionalEn) {
        //     setErrorAdditionalEn(true);
        //     hasError = true;
        // } else {
        //     setErrorAdditionalEn(false)
        // }
        if (!aboutEn) {
            setErrorAboutEn(true)
        } else {
            setErrorAboutEn(false)
        }

        // if (!experienceEn) {
        //     setErrorExperienceEn(true);
        //     hasError = true;
        // } else {
        //     setErrorExperienceEn(false)
        // }


        // if (!servicesEn) {
        //     setErrorServicesEn(true)
        //     hasError = true;
        // } else {
        //     setErrorServicesEn(false)
        // }

        // ---Ru

        if (!nameRu) {
            setErrorNameRu(true);
            hasError = true;
        } else {
            setErrorNameRu(false)
        }

        if (!professionRu) {
            setErrorProfessionRu(true);
            hasError = true;
        } else {
            setErrorProfessionRu(false)
        }

        if (!educationRu) {
            setErrorEducationRu(true);
            hasError = true
        } else {
            setErrorEducationRu(false)
        }

        if (!specializationRu) {
            setErrorSpecializationRu(true);
            hasError = true
        } else {
            setErrorSpecializationRu(false)
        }
        // if (!additionalRu) {
        //     setErrorAdditionalRu(true);
        //     hasError = true;
        // } else {
        //     setErrorAdditionalRu(false)
        // }

        if (!aboutRu) {
            setErrorAboutRu(true)
        } else {
            setErrorAboutRu(false)
        }

        // if (!experienceRu) {
        //     setErrorExperienceRu(true);
        //     hasError = true;
        // } else {
        //     setErrorExperienceRu(false)
        // }
        // if (!servicesRu) {
        //     setErrorServicesRu(true)
        //     hasError = true;
        // } else {
        //     setErrorServicesRu(false)
        // }

        // -------
        // if (!days) {
        //     setErrorDays(true);
        //     hasError = true;
        // } else {
        //     setErrorDays(false)
        // }

        if (!starTime) {
            setErrorStartTime(true);
            hasError = true;
        } else {
            setErrorStartTime(false);
        }

        if (!end) {
            setErrorEndTime(true);
            hasError = true;
        } else {
            setErrorEndTime(false)
        }
        if (!phone) {
            setErrorPhone(true)
            hasError = true
        } else {
            setErrorPhone(false)
        }
        if (!gmail) {
            setErrorEmail(true)
            hasError = true
        } else {
            setErrorEmail(false)
        }


        if (!photoPath) {
            setErrorPhoto(true);
            hasError = true
        } else {
            setErrorPhoto(false)
        }

        if (hasError) {
            return;
        }

        const newPartner = {
            Photo: base64File,
            phone: phone,
            "time": {
                days_of_week: week,
                start_time: starTime,
                end_time: end
            }
            ,
            gmail: gmail,
            "ru": {
                full_name: nameRu,
                education: educationRu,
                specialization: specializationRu,
                additional_information: InfoRu,
                expirence: expInfoRu,
                services: servicesInfoRu,
                profession: professionRu,
                about_specialist: aboutRu

            },
            "en": {
                full_name: nameEn,
                education: educationEn,
                specialization: specializationEn,
                additional_information: InfoEn,
                expirence: expInfoEn,
                services: servicesInfoEn,
                profession: professionEn,
                about_specialist: aboutEn
            },


        };

        // POST request
        fetch("http://127.0.0.1:2020/add/team", {
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
                    setError(false)
                } else {
                    setModalActive(false)
                    setError(true)
                }

            })
            .catch(error => {
                console.error("Error:", error);
            });
    };


    const addEn = () => {
        let hasError = false
        if (!additionalEn) {
            setErrorAdditionalEn(true);
            hasError = true;
        } else {
            setErrorAdditionalEn(false)
        }

        if (hasError) {
            return;
        }

        if (additionalEn.trim() !== '') {
            setInfoEn([...InfoEn, additionalEn]); // Добавляем новое значение в массив
            setAdditionalEn(''); // Очищаем поле ввода после добавления
        }
    };

    const removeInfoEn = (indexToRemove) => {
        setInfoEn(InfoEn.filter((_, index) => index !== indexToRemove));
    };
    // ---Exp List En
    const addExEn = () => {
        let hasError = false;

        if (!experienceEn) {
            setErrorExperienceEn(true);
            hasError = true;
        } else {
            setErrorExperienceEn(false)
        }
        if (hasError) {
            return;
        }
        if (experienceEn.trim() !== '') {
            setExpInfoEn([...expInfoEn, experienceEn]); // Добавляем новое значение в массив
            setExperienceEn(''); // Очищаем поле ввода после добавления
        }
    };

    const removeExInfoEn = (indexToRemove) => {
        setExpInfoEn(expInfoEn.filter((_, index) => index !== indexToRemove));
    };
    // -------------


    // --- services List --- 
    const addSerEn = () => {
        let hasError = false;
        if (!servicesEn) {
            setErrorServicesEn(true)
            hasError = true;
        } else {
            setErrorServicesEn(false)
        }
        if (hasError) {
            return;
        }

        if (servicesEn.trim() !== '') {
            setServicesInfoEn([...servicesInfoEn, servicesEn]); // Добавляем новое значение в массив
            setServicesEn(''); // Очищаем поле ввода после добавления
        }
    };

    const removeSerEn = (indexToRemove) => {
        setServicesInfoEn(servicesInfoEn.filter((_, index) => index !== indexToRemove));
    };

    // -----------
    // ---------- Ru ---
    const addRu = () => {

        let hasError = false
        if (!additionalRu) {
            setErrorAdditionalRu(true)
        } else {
            setErrorAdditionalRu(false)
        }
        if (hasError) {
            return;
        }
        if (additionalRu.trim() !== '') {
            setInfoRu([...InfoRu, additionalRu]); // Добавляем новое значение в массив
            setAdditionalRu(''); // Очищаем поле ввода после добавления
        }
    };

    const removeInfoRu = (indexToRemove) => {
        setInfoRu(InfoRu.filter((_, index) => index !== indexToRemove));
    };


    // ---Exp_LIst

    const addExRu = () => {
        let hasError = false;
        if (!experienceRu) {
            setErrorExperienceRu(true);
            hasError = true;
        } else {
            setErrorExperienceRu(false)
        }
        if (hasError) {
            return;
        }

        if (experienceRu.trim() !== '') {
            setExpInfoRu([...expInfoRu, experienceRu]); // Добавляем новое значение в массив
            setExperienceRu(''); // Очищаем поле ввода после добавления
        }
    };

    const removeExpInfoRu = (indexToRemove) => {
        setExpInfoRu(InfoRu.filter((_, index) => index !== indexToRemove));
    };

    // --- Services List Ru
    const addSerRu = () => {

        let hasError = false;
        if (!servicesRu) {
            setErrorServicesRu(true)
            hasError = true;
        } else {
            setErrorServicesRu(false)
        }
        if (hasError) {
            return;
        }

        if (servicesRu.trim() !== '') {
            setServicesInfoRu([...servicesInfoRu, servicesRu]); // Добавляем новое значение в массив
            setServicesRu(''); // Очищаем поле ввода после добавления
        }
    };

    const removeSerRu = (indexToRemove) => {
        setServicesInfoRu(servicesInfoRu.filter((_, index) => index !== indexToRemove));
    };

    // --------------
    const addDays = () => {

        let hasError = false;
        if (!days) {
            setErrorDays(true);
            hasError = true;
        } else {
            setErrorDays(false)
        }

        if (hasError) {
            return;
        }

        if (days.trim() !== '') {
            setWeek([...week, days]); // Добавляем новое значение в массив
            setDays(''); // Очищаем поле ввода после добавления
        }
    };

    const removeDays = (indexToRemove) => {
        setWeek(week.filter((_, index) => index !== indexToRemove));
    };

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
            {!language ? (
                <div className={styles.parent} >
                    <div className={styles.boxStr} >
                        <input
                            className={styles.inputStr1}
                            placeholder="Name Surname"
                            type="text"
                            onChange={(e) => setNameEn(e.target.value)}
                            value={nameEn}
                            style={{
                                borderColor: errorNameEn ? '#FF0000' : '',
                            }}
                        />
                        {errorNameEn && <p className={styles.error}>{t("Admin.error")}</p>}
                        <input
                            className={styles.inputStr}
                            placeholder="Profession"
                            type="text"
                            onChange={(e) => setProfessionEn(e.target.value)}
                            value={professionEn}
                            style={{
                                borderColor: errorProfessionEn ? '#FF0000' : '',
                            }}
                        />
                        {errorProfessionEn && <p className={styles.error}>{t("Admin.error")}</p>}

                        <input
                            className={styles.inputStr}
                            placeholder="Education"
                            type="text"
                            onChange={(e) => setEducationEn(e.target.value)}
                            value={educationEn}
                            style={{
                                borderColor: errorEducationEn ? '#FF0000' : '',
                            }}
                        />
                        {errorEducationEn && <p className={styles.error}>{t("Admin.error")}</p>}
                        <input
                            className={styles.inputStr}
                            placeholder="Specialization"
                            type="text"
                            onChange={(e) => setSpecializationEn(e.target.value)}
                            value={specializationEn}
                            style={{
                                borderColor: errorSpecializationEn ? '#FF0000' : '',
                            }}
                        />
                        {errorSpecializationEn && <p className={styles.error}>{t("Admin.error")}</p>}
                        <div className={styles.list}
                            style={{
                                borderColor: errorAdditionalEn ? '#FF0000' : '',
                            }}
                        >
                            <div>
                                <h3 className={styles.textList}>Additional information</h3>
                                <input
                                    className={styles.inputMain}

                                    type="text"
                                    onChange={(e) => setAdditionalEn(e.target.value)}
                                    value={additionalEn}
                                />
                            </div>

                            <img onClick={addEn} src={Plus} alt="" className={styles.plus} />

                        </div>
                        {errorAdditionalEn && <p className={styles.error}>{t("Admin.error")}</p>}
                        <ul className={styles.lsDOCTORS}>
                            {InfoEn.map((serviceEn, index) => (
                                <div className={styles.main}>
                                    <li key={index} className={styles.mainText}>
                                        {serviceEn}
                                    </li>
                                    <img src={X} className={styles.x} onClick={() => removeInfoEn(index)} alt="" />
                                </div>
                            ))}
                        </ul>
                        <input
                            className={styles.inputStr}
                            placeholder="About the specialist"
                            type="text"
                            onChange={(e) => setAboutEn(e.target.value)}
                            value={aboutEn}
                            style={{
                                borderColor: errorAboutEn ? '#FF0000' : '',
                            }}
                        />
                        {errorAboutEn && <p className={styles.error}>{t("Admin.error")}</p>}
                        <div className={styles.list}
                            style={{
                                borderColor: errorExperienceEn ? '#FF0000' : '',
                            }}
                        >
                            <div>
                                <h3 className={styles.textList}>Experienc</h3>
                                <input
                                    className={styles.inputMain}

                                    type="text"
                                    onChange={(e) => setExperienceEn(e.target.value)}
                                    value={experienceEn}
                                />
                            </div>

                            <img onClick={addExEn} src={Plus} alt="" className={styles.plus} />

                        </div>
                        {errorExperienceEn && <p className={styles.error}>{t("Admin.error")}</p>}
                        <ul className={styles.lsDOCTORS}>
                            {expInfoEn.map((children, index) => (
                                <div className={styles.main}>
                                    <li key={index} className={styles.mainText}>
                                        {children}
                                    </li>
                                    <img src={X} className={styles.x} onClick={() => removeExInfoEn(index)} alt="" />
                                </div>
                            ))}
                        </ul>

                        <div className={styles.list}
                            style={{
                                borderColor: errorServicesEn ? '#FF0000' : '',
                            }}
                        >
                            <div>
                                <h3 className={styles.textList}>Services</h3>
                                <input
                                    className={styles.inputMain}

                                    type="text"
                                    onChange={(e) => setServicesEn(e.target.value)}
                                    value={servicesEn}
                                />
                            </div>

                            <img onClick={addSerEn} src={Plus} alt="" className={styles.plus} />

                        </div>
                        {errorServicesEn && <p className={styles.error}>{t("Admin.error")}</p>}
                        <ul className={styles.lsDOCTORS}>
                            {servicesInfoEn.map((serviceEn, index) => (
                                <div className={styles.main}>
                                    <li key={index} className={styles.mainText}>
                                        {serviceEn}
                                    </li>
                                    <img src={X}
                                        className={styles.x}
                                        onClick={() => removeSerEn(index)}
                                        alt="" />
                                </div>
                            ))}
                        </ul>

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
                            placeholder="Имя Фамилия "
                            type="text"
                            onChange={(e) => setNameRu(e.target.value)}
                            value={nameRu}
                            style={{
                                borderColor: errorNameRu ? '#FF0000' : '',
                            }}
                        />
                        {errorNameRu && <p className={styles.error}>{t("Admin.error")}</p>}
                        <input
                            className={styles.inputStr}
                            placeholder="Профессия "
                            type="text"
                            onChange={(e) => setProfessionRu(e.target.value)}
                            value={professionRu}
                            style={{
                                borderColor: errorProfessionRu ? '#FF0000' : '',
                            }}
                        />
                        {errorProfessionRu && <p className={styles.error}>{t("Admin.error")}</p>}

                        <input
                            className={styles.inputStr}
                            placeholder="Образование "
                            type="text"
                            onChange={(e) => setEducationRu(e.target.value)}
                            value={educationRu}
                            style={{
                                borderColor: errorEducationRu ? '#FF0000' : '',
                            }}
                        />
                        {errorEducationRu && <p className={styles.error}>{t("Admin.error")}</p>}

                        <input
                            className={styles.inputStr}
                            placeholder="Специализация "
                            type="text"
                            onChange={(e) => setSpecializationRu(e.target.value)}
                            value={specializationRu}
                            style={{
                                borderColor: errorSpecializationRu ? '#FF0000' : '',
                            }}
                        />
                        {errorSpecializationRu && <p className={styles.error}>{t("Admin.error")}</p>}

                        <div className={styles.list}
                            style={{
                                borderColor: errorAdditionalRu ? '#FF0000' : '',
                            }}
                        >
                            <div>
                                <h3 className={styles.textList}>Дополнительная информация</h3>
                                <input
                                    className={styles.inputMain}

                                    type="text"
                                    onChange={(e) => setAdditionalRu(e.target.value)}
                                    value={additionalRu}
                                />
                            </div>
                            <img onClick={addRu} src={Plus} alt="" className={styles.plus} />
                        </div>
                        {errorAdditionalRu && <p className={styles.error}>{t("Admin.error")}</p>}
                        <ul className={styles.lsDOCTORS}>
                            {InfoRu.map((serviceRu, index) => (
                                <div className={styles.main}>
                                    <li key={index} className={styles.mainText}>
                                        {serviceRu}
                                    </li>
                                    <img src={X} className={styles.x} onClick={() => removeInfoRu(index)} alt="" />
                                </div>
                            ))}
                        </ul>
                        <input
                            className={styles.inputStr}
                            placeholder="О специалисте"
                            type="text"
                            onChange={(e) => setAboutRu(e.target.value)}
                            value={aboutRu}
                            style={{
                                borderColor: errorAboutRu ? '#FF0000' : '',
                            }}
                        />
                        {errorAboutRu && <p className={styles.error}>{t("Admin.error")}</p>}
                        <div className={styles.list}
                            style={{
                                borderColor: errorExperienceRu ? '#FF0000' : '',
                            }}
                        >
                            <div>
                                <h3 className={styles.textList}>Опыт работы :</h3>
                                <input
                                    className={styles.inputMain}

                                    type="text"
                                    onChange={(e) => setExperienceRu(e.target.value)}
                                    value={experienceRu}
                                />
                            </div>

                            <img onClick={addExRu} src={Plus} alt="" className={styles.plus} />

                        </div>
                        {errorExperienceRu && <p className={styles.error}>{t("Admin.error")}</p>}
                        <ul className={styles.lsDOCTORS}>
                            {expInfoRu.map((children, index) => (
                                <div className={styles.main}>
                                    <li key={index} className={styles.mainText}>
                                        {children}
                                    </li>
                                    <img src={X} className={styles.x} onClick={() => removeExpInfoRu(index)} alt="" />
                                </div>
                            ))}
                        </ul>
                        <div className={styles.list}
                            style={{
                                borderColor: errorServicesRu ? '#FF0000' : '',
                            }}
                        >
                            <div>
                                <h3 className={styles.textList}>Услуги </h3>
                                <input
                                    className={styles.inputMain}

                                    type="text"
                                    onChange={(e) => setServicesRu(e.target.value)}
                                    value={servicesRu}
                                />
                            </div>

                            <img onClick={addSerRu} src={Plus} alt="" className={styles.plus} />

                        </div>
                        {errorServicesRu && <p className={styles.error}>{t("Admin.error")}</p>}
                        <ul className={styles.lsDOCTORS}>
                            {servicesInfoRu.map((serviceEn, index) => (
                                <div className={styles.main}>
                                    <li key={index} className={styles.mainText}>
                                        {serviceEn}
                                    </li>
                                    <img src={X}
                                        className={styles.x}
                                        onClick={() => removeSerRu(index)}
                                        alt="" />
                                </div>
                            ))}
                        </ul>


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

            <div className={styles.submit} >

                <div className={styles.BoxPhone}
                    style={{
                        borderColor: errorPhone ? '#FF0000' : '',
                    }}
                >
                    <p className={styles.text}>+992</p>
                    <input
                        className={styles.inputPhone}
                        placeholder={t("Admin.phone")}
                        type="text"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                    />
                </div>
                {errorPhone && <p className={styles.errorPhoto}>{t("Admin.enter")}</p>}
                <input
                    className={styles.inputPro}
                    placeholder={t("Admin.email")}
                    type="text"
                    onChange={(e) => setGmail(e.target.value)}
                    value={gmail}
                    style={{
                        borderColor: errorEmail ? '#FF0000' : '',
                    }}
                />
                {errorPhone && <p className={styles.errorPhoto}>{t("Admin.error")}</p>}
                <div className={styles.list1}
                    style={{
                        borderColor: errorDays ? '#FF0000' : '',
                    }}
                >
                    <div>
                        <h3 className={styles.textList}>{t("Admin.days")}</h3>
                        <input
                            className={styles.inputMain1}
                            type="text"
                            onChange={(e) => setDays(e.target.value)}
                            value={days}
                        />
                    </div>

                    <img onClick={addDays} src={Plus} alt="" className={styles.plus} />

                </div>
                {errorDays && <p className={styles.errorPhoto}>{t("Admin.error")}</p>}
                <ul className={styles.lsDOCTORS1}>
                    {week.map((children, index) => (
                        <div className={styles.main}>
                            <li key={index} className={styles.mainText}>
                                {children}
                            </li>
                            <img src={X}
                                className={styles.x}
                                onClick={() => removeDays(index)}
                                alt="" />
                        </div>
                    ))}
                </ul>

                <div className={styles.StartEndTime}>
                    <div>

                        <div className={styles.start}
                            style={{
                                borderColor: errorStartTime ? '#FF0000' : '',
                            }}
                        >


                            <input
                                className={styles.time}
                                type="text"
                                placeholder={t("Admin.start")}
                                value={starTime}
                                readOnly

                            />

                            <input
                                type="time"
                                onChange={(e) => setStartTime(e.target.value)}
                                value={starTime}
                                ref={timeRef}
                                style={{ opacity: "0", width: "0px" }}
                            />
                            <p><RxTimer
                                className={styles.timeStyle}
                                onClick={() => { timeRef.current.showPicker() }}
                            /></p>

                        </div>
                        {errorDays && <p className={styles.errorTime}>{t("Admin.enterTime")}</p>}

                    </div>
                       <div>
                        <div className={styles.start} 
                          style={{
                            borderColor: errorEndTime ? '#FF0000' : '',
                        }}
                        >
                            <input
                                className={styles.time}
                                type="text"
                                placeholder={t("Admin.end")}
                                value={end}
                                readOnly
                            />
                            <input
                                type='time'
                                onChange={(e) => setEnd(e.target.value)}
                                value={end}
                                ref={timeRefEnd}
                                style={{ opacity: "0", width: "0px" }}
                            />
                            <p>< RxTimer className={styles.timeStyle}
                                onClick={() => { timeRefEnd.current.showPicker() }}
                            /></p>
                        </div>
                        {errorEndTime && <p className={styles.errorTime}>{t("Admin.enterTime")}</p>}
                    </div>
                </div>


                <div className={styles.b}>
                    <div className={styles.parentPhoto}
                      style={{
                        borderColor: errorPhoto ? '#FF0000' : '',
                    }}
                    >
                        <input
                            className={styles.photo}
                            type="text"
                            placeholder={t("Admin.photo")}
                            value={photoPath}
                            readOnly
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            id="photo-upload"
                        />
                        <label className={styles.buttonPhoto} htmlFor="photo-upload">
                            {t("Admin.choose")}
                        </label>
                    </div>
                    <button
                        className={styles.buttonSubmit}
                        onClick={handleSubmit}
                    >
                        {t("Admin.submit")}</button>
                </div>
            </div>
            {errorEndTime && <p className={styles.errorPhoto}>{t("Admin.select")}</p>}
        </div>
    )
}
