import React, { useState } from 'react'
import classNames from 'classnames';
import styles from './doctor.module.css'
import { useTranslation } from 'react-i18next';
import Plus from '../../assets/Admin botton.png'
import X from '../../assets/Group 110@2x.png'
export default function AddDoctor() {

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

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(week);
        console.log(starTime);
  
  
        // Prepare the payload with the base64-encoded file
        const newPartner = {
            Photo: base64File,
            phone: phone,
            "time":{
                days_of_week: week,
                start_time:starTime,
                end_time:starTime
            }
            ,
            gmail:gmail,
            "ru": {
                full_name :nameRu,
                education:educationRu,
                specialization:specializationRu,
                additional_information:InfoRu,
                expirence:expInfoRu,
                services:servicesInfoRu,
                profession: professionRu,
                about_specialist:aboutRu
                
            },
            "en": {
                full_name :nameEn,
                education:educationEn,
                specialization:specializationEn,
                additional_information:InfoEn,
                expirence:expInfoEn,
                services:servicesInfoEn,
                profession: professionEn,
                about_specialist:aboutEn
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
                    alert("Success");
                } else {
                    alert("Error");
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };


    const addEn = () => {
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

            {!language ? (
                <div className={styles.parent} >
                    <div className={styles.boxStr} >
                        <input
                            className={styles.inputStr}
                            placeholder="Name Surname"
                            type="text"
                            onChange={(e) => setNameEn(e.target.value)}
                            value={nameEn}
                        />

                        <input
                            className={styles.inputStr}
                            placeholder="Profession"
                            type="text"
                            onChange={(e) => setProfessionEn(e.target.value)}
                            value={professionEn}
                        />

                        <input
                            className={styles.inputStr}
                            placeholder="Education"
                            type="text"
                            onChange={(e) => setEducationEn(e.target.value)}
                            value={educationEn}
                        />
                        <input
                            className={styles.inputStr}
                            placeholder="Specialization"
                            type="text"
                            onChange={(e) => setSpecializationEn(e.target.value)}
                            value={specializationEn}
                        />
                        <div className={styles.list}>
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
                        />
                        <div className={styles.list}>
                            <div>
                                <h3 className={styles.textList}>Expirence</h3>
                                <input
                                    className={styles.inputMain}

                                    type="text"
                                    onChange={(e) => setExperienceEn(e.target.value)}
                                    value={experienceEn}
                                />
                            </div>

                            <img onClick={addExEn} src={Plus} alt="" className={styles.plus} />

                        </div>
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

                        <div className={styles.list}>
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
                    <div className={styles.En_Ru}>
                        <button
                            className={classNames(styles.button,
                                { [styles.activeB]: language === false })}
                            onClick={() => handleLanguageChange(false)}>{t("Admin.en")}</button>

                        <button className={classNames(styles.button,
                            { [styles.activeB]: language === true })}
                            onClick={() => handleLanguageChange(true)}>{t("Admin.ru")}</button>
                    </div>
                </div>
            ) : (
                <div className={styles.parent} >
                    <div className={styles.boxStr}>

                        <input
                            className={styles.inputStr}
                            placeholder="Заголовок"
                            type="text"
                            onChange={(e) => setNameRu(e.target.value)}
                            value={nameRu}
                        />

                        <input
                            className={styles.inputStr}
                            placeholder="Имя"
                            type="text"
                            onChange={(e) => setProfessionRu(e.target.value)}
                            value={professionRu}
                        />

                        <input
                            className={styles.inputStr}
                            placeholder="Главные услуги"
                            type="text"
                            onChange={(e) => setEducationRu(e.target.value)}
                            value={educationRu}
                        />

                        <input
                            className={styles.inputStr}
                            placeholder="Specialization"
                            type="text"
                            onChange={(e) => setSpecializationRu(e.target.value)}
                            value={specializationRu}
                        />

                        <div className={styles.list}>
                            <div>
                                <h3 className={styles.textList}>Additional </h3>
                                <input
                                    className={styles.inputMain}

                                    type="text"
                                    onChange={(e) => setAdditionalRu(e.target.value)}
                                    value={additionalRu}
                                />
                            </div>
                            <img onClick={addRu} src={Plus} alt="" className={styles.plus} />
                        </div>
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
                            placeholder="About the specialist"
                            type="text"
                            onChange={(e) => setAboutRu(e.target.value)}
                            value={aboutRu}
                        />
                        <div className={styles.list}>
                            <div>
                                <h3 className={styles.textList}>Expirence</h3>
                                <input
                                    className={styles.inputMain}

                                    type="text"
                                    onChange={(e) => setExperienceRu(e.target.value)}
                                    value={experienceRu}
                                />
                            </div>

                            <img onClick={addExRu} src={Plus} alt="" className={styles.plus} />

                        </div>
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
                        <div className={styles.list}>
                            <div>
                                <h3 className={styles.textList}>Services</h3>
                                <input
                                    className={styles.inputMain}

                                    type="text"
                                    onChange={(e) => setServicesRu(e.target.value)}
                                    value={servicesRu}
                                />
                            </div>

                            <img onClick={addSerRu} src={Plus} alt="" className={styles.plus} />

                        </div>
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
                    <div className={styles.En_Ru}>
                        <button
                            className={classNames(styles.button,
                                { [styles.activeB]: language === false })}
                            onClick={() => handleLanguageChange(false)}>{t("Admin.en")}</button>

                        <button className={classNames(styles.button,
                            { [styles.activeB]: language === true })}
                            onClick={() => handleLanguageChange(true)}>{t("Admin.ru")}</button>
                    </div>
                </div>
            )}

            <div className={styles.submit} >

                <div className={styles.BoxPhone}>
                    <p className={styles.text}>+992</p>
                    <input
                        className={styles.inputPhone}
                        placeholder="Phone"
                        type="text"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                    />
                </div>
                <input
                    className={styles.inputPro}
                    placeholder="Email"
                    type="text"
                    onChange={(e) => setGmail(e.target.value)}
                    value={gmail}
                />
                <div className={styles.list1}>
                    <div>
                        <h3 className={styles.textList}>Days of the week</h3>
                        <input
                            className={styles.inputMain}
                            type="text"
                            onChange={(e) => setDays(e.target.value)}
                            value={days}
                        />
                    </div>

                    <img onClick={addDays} src={Plus} alt="" className={styles.plus} />

                </div>
                <ul className={styles.lsDOCTORS}>
                    {week.map((serviceEn, index) => (
                        <div className={styles.main}>
                            <li key={index} className={styles.mainText}>
                                {serviceEn}
                            </li>
                            <img src={X}
                                className={styles.x}
                                onClick={() => removeDays(index)}
                                alt="" />
                        </div>
                    ))}
                </ul>

                <div className={styles.StartEndTime}>
                    <input
                     className={styles.start} 
                     type="time"
                     onChange={(e)=>setStartTime(e.target.value)}
                     value={starTime}
                     />

                      <input
                     className={styles.start} 
                     type='time'
                     onChange={(e)=>setEnd(e.target.value)}
                     value={end}
                     />
                </div>


                <div className={styles.parentPhoto}>
                    <input
                        className={styles.photo}
                        type="text"
                        placeholder="Photo"
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
                        Choose photo
                    </label>
                </div>
                <div className={styles.b}>
                    <button
                        className={styles.buttonSubmit}
                    onClick={handleSubmit}
                    >
                        {t("Admin.submit")}</button>
                </div>
            </div>
        </div>
    )
}
