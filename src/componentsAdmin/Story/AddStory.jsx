import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './story.module.css'
import classNames from 'classnames';
import MyModal from '../../modal/MyModal';
import ErrorModal from '../../modal/ErrorModal';
export default function AddStory() {
  const { t } = useTranslation()
  const [titleRu, setTitleRu] = useState("")
  const [nameRu, setNameRu] = useState("")
  const [surnameRu, setSurnameRu] = useState("")
  const [descriptionRu, setDescriptionRu] = useState("")
  const [quoteRu, setQuoteRu] = useState("")
  // ------- English ---
  const [titleEn, setTitleEn] = useState("")
  const [nameEn, setNameEn] = useState("")
  const [surnameEn, setSurnameEn] = useState("")
  const [descriptionEn, setDescriptionEn] = useState("")
  const [quoteEn, setQuoteEn] = useState("")
  //--------
  const [language, setLanguage] = useState(false);

  // ---- Photo ------

  const [photoPath, setPhotoPath] = useState(""); // Путь к фото (имя файла)


  const clickButton = (e) => {
    setLanguage(e)
  }


  const [modalActive, setModalActive] = useState(false)
  const [errorM, setError] = useState(false)

  const [base64File, setBase64File] = useState("");


  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setPhotoPath(file.name);

      const reader = new FileReader();

      reader.onloadend = function () {
        const rawData = reader.result;


        const chunkSize = 100536;
        let offset = 0;
        let base64String = "";

        while (offset < rawData.byteLength) {
          const chunk = rawData.slice(offset, offset + chunkSize);
          base64String += btoa(String.fromCharCode.apply(null, new Uint8Array(chunk)));
          offset += chunkSize;
        }


        setBase64File(base64String);
      };


      reader.readAsArrayBuffer(file);
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();


    const newPartner = {
      Photo: base64File,
      "ru": {
        name: nameRu,
        surname: surnameRu,
        problemName: titleRu,
        information: descriptionRu,
        citata: quoteRu
      },
      "en": {
        name: nameEn,
        surname: surnameEn,
        problemName: titleEn,
        information: descriptionEn,
        citata: quoteEn
      },


    };
    fetch("http://127.0.0.1:2020/add/pationt/story", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPartner),
      credentials: 'include',
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

        <div className={styles.add}>
          <div className={styles.divEN_RU}>
            <input
              type="text"
              className={styles.inputDescription}
              onChange={(e) => setTitleEn(e.target.value)}
              value={titleEn}
              placeholder='Title'
            />
            <input
              type="text"
              className={styles.inputDescription}
              onChange={(e) => setNameEn(e.target.value)}
              value={nameEn}
              placeholder='Name'
            />
            <input
              type="text"
              className={styles.inputDescription}
              onChange={(e) => setSurnameEn(e.target.value)}
              value={surnameEn}
              placeholder='Surname'
            />
            <input
              type="text"
              className={styles.inputDescription}
              onChange={(e) => setDescriptionEn(e.target.value)}
              value={descriptionEn}
              placeholder='Description'
            />
            <input
              type="text"
              className={styles.inputDescription}
              onChange={(e) => setQuoteEn(e.target.value)}
              value={quoteEn}
              placeholder='Quote'
            />
          </div>

          <div className={styles.En_RU}>
            <button
              className={classNames(styles.button,
                { [styles.activeB]: language === false })}
              onClick={() => clickButton(false)}
            >{t("Admin.en")}</button>
            <button
              className={classNames(styles.button,
                { [styles.activeB]: language === true })}
              onClick={() => clickButton(true)}
            >{t("Admin.ru")}</button>
          </div>
        </div>

      ) :
        (

          <div className={styles.add}>
            <div className={styles.divEN_RU}>
              <input
                type="text"
                className={styles.inputDescription}
                onChange={(e) => setTitleRu(e.target.value)}
                value={titleRu}
                placeholder='Заголовок'
              />
              <input
                type="text"
                className={styles.inputDescription}
                onChange={(e) => setNameRu(e.target.value)}
                value={nameRu}
                placeholder='Name'
              />
              <input
                type="text"
                className={styles.inputDescription}
                onChange={(e) => setSurnameRu(e.target.value)}
                value={surnameRu}
                placeholder='Surname'
              />
              <input
                type="text"
                className={styles.inputDescription}
                onChange={(e) => setDescriptionRu(e.target.value)}
                value={descriptionRu}
                placeholder='Description'
              />
              <input
                type="text"
                className={styles.inputDescription}
                onChange={(e) => setQuoteRu(e.target.value)}
                value={quoteRu}
                placeholder='Quote'
              />
            </div>

            <div className={styles.En_RU}>
              <button
                className={classNames(styles.button,
                  { [styles.activeB]: language === false })}
                onClick={() => clickButton(false)}
              >{t("Admin.en")}</button>
              <button
                className={classNames(styles.button,
                  { [styles.activeB]: language === true })}
                onClick={() => clickButton(true)}
              >{t("Admin.ru")}</button>
            </div>
          </div>

        )}

      {/* ------ */}

      <div className={styles.submit}>
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
      <div className={styles.divSubmit}>
        <button
          type="submit"
          onClick={handleSubmit}
          className={styles.buttonSubmit}>
          {t("Admin.submit")}
        </button>
      </div>
    </div>
  )
}
