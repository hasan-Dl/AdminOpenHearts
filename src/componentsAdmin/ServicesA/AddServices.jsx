import React, { useState } from 'react'
import classNames from 'classnames';
import styles from './services.module.css'
import { useTranslation } from 'react-i18next';
import Plus from '../../assets/Admin botton.png'
import X from '../../assets/Group 110@2x.png'
import MyModal from '../../modal/MyModal';
import ErrorModal from '../../modal/ErrorModal';
export default function AddServices() {

  const { t } = useTranslation()
  // En ------
  const [titleEn, setTitleEn] = useState("")
  const [descriptionEn, setDescriptionEn] = useState("")

  // list En -------
  const [mainEn, setMainEn] = useState("")
  const [servicesEn, setServicesEn] = useState([]);

  // ---- Ru  ---
  const [titleRu, setTitleRu] = useState("")
  const [descriptionRu, setDescriptionRu] = useState("")

  // --List Ru -----

  const [mainRu, setMainRu] = useState("")
  const [servicesRu, setServicesRu] = useState([]);

  // --Phone and photo


  const [phone, setPhone] = useState("")
  const [photoPath, setPhotoPath] = useState(""); // Путь к фото (имя файла)

  // ----lang
  const [language, setLanguage] = useState(false);



  const [modalActive, setModalActive] = useState(false)
  const [errorM, setError] = useState(false)

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

    // Prepare the payload with the base64-encoded file
    const newPartner = {
      Photo: base64File,
      phone: phone,
      "ru": {
        title: titleRu,
        description: descriptionRu,
        mainServeses: servicesEn
      },
      "en": {
        title: titleEn,
        description: descriptionEn,
        mainServeses: servicesRu
      },
    };

    // POST request
    fetch("http://127.0.0.1:2020/add/main/diraction", {
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


  const addServiceEn = () => {
    if (mainEn.trim() !== '') {
      setServicesEn([...servicesEn, mainEn]); // Добавляем новое значение в массив
      setMainEn(''); // Очищаем поле ввода после добавления
    }
  };

  const removeServiceEn = (indexToRemove) => {
    setServicesEn(servicesEn.filter((_, index) => index !== indexToRemove));
  };
  // ============

  const addServiceRu = () => {
    if (mainRu.trim() !== '') {
      setServicesRu([...servicesRu, mainRu]); // Добавляем новое значение в массив
      setMainRu(''); // Очищаем поле ввода после добавления
    }
  };

  const removeServiceRu = (indexToRemove) => {
    setServicesRu(servicesRu.filter((_, index) => index !== indexToRemove));
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
              className={styles.inputStr}
              placeholder="Title"
              type="text"
              onChange={(e) => setTitleEn(e.target.value)}
              value={titleEn}
            />

            <input
              className={styles.inputStr}
              placeholder="Description"
              type="text"
              onChange={(e) => setDescriptionEn(e.target.value)}
              value={descriptionEn}
            />

            <div className={styles.list}>
              <div>
                <h3 className={styles.textList}>Main services</h3>
                <input
                  className={styles.inputMain}
                  type="text"
                  onChange={(e) => setMainEn(e.target.value)}
                  value={mainEn}
                />
              </div>
              <img src={Plus} alt="" onClick={addServiceEn} className={styles.plus} />

            </div>
            <ul className={styles.lsDOCTORS}>
              {servicesEn.map((children, item) => (
                <div className={styles.main}>
                  <li key={item} className={styles.mainText}>
                    {children}
                  </li>
                  <img className={styles.x}
                    src={X} alt="" onClick={() => removeServiceEn(item)} />
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
              placeholder="Заголовок"
              type="text"
              onChange={(e) => setTitleRu(e.target.value)}
              value={titleRu}
            />

            <input
              className={styles.inputStr}
              placeholder="Описания"
              type="text"
              onChange={(e) => setDescriptionRu(e.target.value)}
              value={descriptionRu}
            />

            <div className={styles.list}>
              <div>
                <h3 className={styles.textList}>Глание услиги</h3>
                <input
                  className={styles.inputMain}
                  type="text"
                  onChange={(e) => setMainRu(e.target.value)}
                  value={mainRu}
                />

              </div>

              <img onClick={addServiceRu} className={styles.plus} src={Plus} alt="" />

            </div>
            <ul className={styles.lsDOCTORS}>
              {servicesRu.map((children, index) => (
                <div className={styles.main}>
                  <li key={index} className={styles.mainText}>
                    {children}
                  </li>
                  <span
                    style={{ color: '#FF6262', marginLeft: '10px', cursor: 'pointer', width: "14.16px", height: "14.26px", fontWeight: "600" }}
                    onClick={() => removeServiceRu(index)}
                  >
                    X
                  </span>
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

      <div className={styles.submit}>
        <div>
          <div className={styles.BoxPhone}>
            <p className={styles.text}>+992</p>
            <input
              className={styles.inputPhone}
              placeholder={t("Admin.phone")}
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </div>
          {/* ---- */}
          <div className={styles.parentPhoto}>
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
        </div>
      </div>
      <div className={styles.b}>
        <button
          className={styles.buttonSubmit}
          onClick={handleSubmit}
        >
          {t("Admin.submit")}</button>
      </div>
    </div>
  )
}
