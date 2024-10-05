import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './project.module.css'
import classNames from 'classnames';
import MyModal from '../../modal/MyModal';
import ErrorModal from '../../modal/ErrorModal';
export default function AddProject() {

  const { t } = useTranslation()
  //  ---- Russia ---
  const [titleRu, setTitleRu] = useState("")
  const [descriptionRu, setDescriptionRu] = useState("")
  const [addressRu, setAddressRu] = useState("")
  // ------- English ---
  const [titleEn, setTitleEn] = useState("")
  const [descriptionEn, setDescriptionEn] = useState("")
  const [addressEn, setAddressEn] = useState("")

  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  // ---------------Photo  useState --- 

  const [photoPath, setPhotoPath] = useState("");
  // ----
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


  // ----  Error Ru ----
  const [errorTitleRu, setErrorTitleRu] = useState(false)
  const [errorDescriptionRu, setErrorDescriptionRu] = useState(false)
  const [errorAddressRu, setErrorAddressRu] = useState(false)

  // Error En ---
  const [errorTitleEn, setErrorTitleEn] = useState(false)
  const [errorDescriptionEn, setErrorDescriptionEn] = useState(false)
  const [errorAddressEn, setErrorAddressEn] = useState(false)

  const [errorPhone, setErrorPhone] = useState(false)
  const [errorEmail, setErrorEmail] = useState(false)

  // ---  error photo--
  const [errorPhoto, setErrorPhoto] = useState(false)


  const handleSubmit = (event) => {
    event.preventDefault();

    let hasError = false;

    if (!titleEn) {
      setErrorTitleEn(true);
      hasError = true;
    } else {
      setErrorTitleEn(false)
    }

    if (!descriptionEn) {
      setErrorDescriptionEn(true);
      hasError = true
    } else {
      setErrorDescriptionEn(false)
    }
    if (!addressEn) {
      setErrorAddressEn(true);
      hasError = true
    } else {
      setErrorAddressEn(false)
    }


    if (!titleRu) {
      setErrorTitleRu(true);
      hasError = true;
    } else {
      setErrorTitleRu(false)
    }

    if (!descriptionRu) {
      setErrorDescriptionRu(true);
      hasError = true
    } else {
      setErrorDescriptionRu(false)
    }
    if (!addressRu) {
      setErrorAddressRu(true);
      hasError = true
    } else {
      setErrorAddressRu(false)
    }


    if (!phone) {
      setErrorPhone(true)
      hasError = true
    } else {
      setErrorPhone(false)
    }

    if (!email) {
      setErrorEmail(true)
      hasError = true
    } else {
      setErrorEmail(false)
    }

    if (!photoPath) {
      setErrorPhoto(true);
      hasError=true
    }else{
      setErrorPhoto(false)
    }

    if (hasError) {
      return;
    }

    const newPartner = {
      Photo: base64File,
      phone:Number(phone),
      email: email,
      "ru": {
        name: titleRu,
        description: descriptionRu,
        adress: addressRu
      },
      "en": {
        name: titleEn,
        description: descriptionEn,
        adress: addressEn
      },


    };

    // POST request
    fetch("http://127.0.0.1:2020/add/project", {
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
              className={styles.inputStr}
              placeholder="Description"
              type="text"
              onChange={(e) => setDescriptionEn(e.target.value)}
              value={descriptionEn}
              style={{
                borderColor: errorDescriptionEn ? '#FF0000' : '',
              }}
            />
            {errorDescriptionEn && <p className={styles.error}>{t("Admin.error")}</p>}

            <input
              className={styles.inputStr}
              placeholder="Address"
              type="text"
              onChange={(e) => setAddressEn(e.target.value)}
              value={addressEn}
              style={{
                borderColor: errorAddressEn ? '#FF0000' : '',
              }}
            />
            {errorAddressEn && <p className={styles.error}>{t("Admin.error")}</p>}

            {/* -------- */}
          </div>
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
              className={styles.inputStr}
              placeholder="Описания"
              type="text"
              onChange={(e) => setDescriptionRu(e.target.value)}
              value={descriptionRu}
              style={{
                borderColor: errorDescriptionRu ? '#FF0000' : '',
              }}
            />
            {errorDescriptionRu && <p className={styles.error}>{t("Admin.error")}</p>}

            <input
              className={styles.inputStr}
              placeholder="Адресс"
              type="text"
              onChange={(e) => setAddressRu(e.target.value)}
              value={addressRu}
              style={{
                borderColor: errorAddressRu ? '#FF0000' : '',
              }}
            />
            {errorAddressRu && <p className={styles.error}>{t("Admin.error")}</p>}


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
        <div>

          <input
            className={styles.inputPro}
            placeholder={t('Admin.email')}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            style={{
              borderColor: errorEmail? '#FF0000' : '',
            }}
          />
          {errorEmail && <p className={styles.errorPhoto}>{t("Admin.error")}</p>}
          {/* ---- */}
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
            {errorPhone && <p className={styles.errorPhoto}>{t("Admin.error")}</p>}

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
      <div className={styles.boxSub}>
        <button
          className={styles.buttonSubmit}
          onClick={handleSubmit}
        >
          {t("Admin.submit")}</button>
      </div>

    </div>
  )
}


