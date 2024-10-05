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


  // error Ru-----
  const [errorTitleRu, setErrorTitleRu] = useState(false)
  const [errorDescriptionRu, setErrorDescriptionRu] = useState(false)
  const [errorMainRu, setErrorMainRu] = useState(false)

  // Error En ---
  const [errorTitleEn, setErrorTitleEn] = useState(false)
  const [errorDescriptionEn, setErrorDescriptionEn] = useState(false)
  const [errorMainEn, setErrorMainEn] = useState(false)


  const [errorPhone, setErrorPhone] = useState(false)
  // ---  error photo--
  const [errorPhoto, setErrorPhoto] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();

    let hasError = false;

    if (!titleEn) {
      setErrorTitleEn(true);
      hasError = true;
    } else {
      setErrorTitleEn(false);
    }

    if (!descriptionEn) {
      setErrorDescriptionEn(true);
      hasError = true;
    } else {
      setErrorDescriptionEn(false)
    }

    // if (!mainEn) {
    //   setErrorMainEn(true);
    //   hasError = true;
    // } else {
    //   setErrorMainEn(false)
    // }
    // ----En---

    if (!titleRu) {
      setErrorTitleRu(true);
      hasError = true;
    } else {
      setErrorTitleRu(false);
    }

    if (!descriptionRu) {
      setErrorDescriptionRu(true);
      hasError = true;
    } else {
      setErrorDescriptionRu(false)
    }

    // if (!mainRu) {
    //   setErrorMainRu(true);
    //   hasError = true;
    // } else {
    //   setErrorMainRu(false)
    // }

    if (!phone) {
      setErrorPhone(true)
      hasError = true
    } else {
      setErrorPhone(false)
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
      "ru": {
        title: titleRu,
        description: descriptionRu,
        mainServices: servicesEn
      },
      "en": {
        title: titleEn,
        description: descriptionEn,
        mainServices: servicesRu
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
              style={{
                borderColor: errorTitleEn ? '#FF0000' : '',
              }}
            />
            {errorTitleEn && <p className={styles.error}>{t("Admin.error")}</p>}

            <input
              className={styles.inputDES}
              placeholder="Description"
              type="text"
              onChange={(e) => setDescriptionEn(e.target.value)}
              value={descriptionEn}
              style={{
                borderColor: errorDescriptionEn ? '#FF0000' : '',
              }}
            />
            {errorDescriptionEn && <p className={styles.error}>{t("Admin.error")}</p>}

            <div className={styles.list}
              style={{
                borderColor: errorMainEn ? "#FF0000" : "",
              }}
            >
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
            {errorMainEn && <p className={styles.error}>{t("Admin.error")}</p>}
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
              style={{
                borderColor: errorTitleRu ? '#FF0000' : '',
              }}
            />
            {errorTitleRu && <p className={styles.error}>{t("Admin.error")}</p>}

            <input
              className={styles.inputDES}
              placeholder="Описания"
              type="text"
              onChange={(e) => setDescriptionRu(e.target.value)}
              value={descriptionRu}
              style={{
                borderColor: errorDescriptionRu ? '#FF0000' : '',
              }}
            />
            {errorDescriptionRu && <p className={styles.error}>{t("Admin.error")}</p>}

            <div className={styles.list}
              style={{
                borderColor: errorMainRu ? "#FF0000" : "",
              }}
            >
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
            {errorMainRu && <p className={styles.error}>{t("Admin.error")}</p>}

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
          <div className={styles.BoxPhone}
            style={{
              borderColor: errorPhone ? '#FF0000' : '',
            }}>

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
          {/* ---- */}
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
          {errorPhoto && <p className={styles.errorPhoto}>{t("Admin.select")}</p>}
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
