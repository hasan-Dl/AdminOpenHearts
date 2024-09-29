import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './project.module.css'
import classNames from 'classnames';
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
          alert("Success");
        } else {
          alert("Error");
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };



  return (
    <div>

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

            <input
              className={styles.inputStr}
              placeholder="Address"
              type="text"
              onChange={(e) => setAddressEn(e.target.value)}
              value={addressEn}
            />

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

            <input
              className={styles.inputStr}
              placeholder="Адресс"
              type="text"
              onChange={(e) => setAddressRu(e.target.value)}
              value={addressRu}
            />


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
        <div>

          <input
            className={styles.inputPro}
            placeholder={t('Admin.email')}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {/* ---- */}
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


