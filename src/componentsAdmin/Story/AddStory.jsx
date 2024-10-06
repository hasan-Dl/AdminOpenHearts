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
  // ----  Error Ru ----
  const [errorTitleRu, setErrorTitleRu] = useState(false)
  const [errorNameRu, setErrorNameRu] = useState(false)
  const [errorSurnameRu, setErrorSurnameRu] = useState(false)
  const [errorDescriptionRu, setErrorDescriptionRu] = useState(false)
  const [errorQuoteRu, setErrorQuoteRu] = useState(false)
  // Error En ---
  const [errorTitleEn, setErrorTitleEn] = useState(false)
  const [errorNameEn, setErrorNameEn] = useState(false)
  const [errorSurnameEn, setErrorSurnameEn] = useState(false)
  const [errorDescriptionEn, setErrorDescriptionEn] = useState(false)
  const [errorQuoteEn, setErrorQuoteEn] = useState(false)
  // ---  error photo--
  const [errorPhoto, setErrorPhoto] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();

    let hasError = false;
    // En----
    if (!titleEn) {
      setErrorTitleEn(true);
      hasError = true;
    } else {
      setErrorTitleEn(false)
    }

    if (!nameEn) {
      setErrorNameEn(true);
      hasError = true;
    } else {
      setErrorNameEn(false)
    }

    if (!surnameEn) {
      setErrorSurnameEn(true);
      hasError = true;
    } else {
      setErrorSurnameEn(false)
    }
    if (!descriptionEn) {
      setErrorDescriptionEn(true)
      hasError = true
    } else {
      setErrorDescriptionEn(false);
    }
    if (!quoteEn) {
      setErrorQuoteEn(true);
      hasError = true
    } else {
      setErrorQuoteEn(false);
    }
    // ru////
    if (!titleRu) {
      setErrorTitleRu(true);
      hasError = true;
    } else {
      setErrorTitleRu(false)
    }
    if (!nameRu) {
      setErrorNameRu(true);
      hasError = true;
    } else {
      setErrorNameRu(false)
    }
    if (!surnameRu) {
      setErrorSurnameRu(true);
      hasError = true;
    } else {
      setErrorSurnameRu(false)
    }
    if (!descriptionRu) {
      setErrorDescriptionRu(true)
      hasError = true
    } else {
      setErrorDescriptionRu(false);
    }
    if (!quoteRu) {
      setErrorQuoteRu(true);
      hasError = true
    } else {
      setErrorQuoteRu(false);
    }
    if(!photoPath){
      setErrorPhoto(true)
      hasError=true 
    }else{
      setErrorPhoto(false)
    }

    if (hasError) {
      return;
    }

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
            <div>

              <input
                type="text"
                className={styles.inputDescription}
                onChange={(e) => setTitleEn(e.target.value)}
                value={titleEn}
                placeholder='Title'
                style={{
                  borderColor: errorTitleEn ? '#FF0000' : '',
                }}
              />
              {errorTitleEn && <p className={styles.error}>{t("Admin.error")}</p>}
            </div>
            <div>
              <input
                type="text"
                className={styles.inputDescription}
                onChange={(e) => setNameEn(e.target.value)}
                value={nameEn}
                placeholder='Name'
                style={{
                  borderColor: errorNameEn ? '#FF0000' : '',
                }}
              />
              {errorNameEn && <p className={styles.error}>{t("Admin.error")}</p>}
            </div>
            <div>
              <input
                type="text"
                className={styles.inputDescription}
                onChange={(e) => setSurnameEn(e.target.value)}
                value={surnameEn}
                placeholder='Surname'
                style={{
                  borderColor: errorSurnameEn ? '#FF0000' : '',
                }}
              />
              {errorSurnameEn && <p className={styles.error}>{t("Admin.error")}</p>}
            </div>

            <input
              type="text"
              className={styles.inputDescription}
              onChange={(e) => setDescriptionEn(e.target.value)}
              value={descriptionEn}
              placeholder='Description'
              style={{
                borderColor: errorDescriptionEn ? '#FF0000' : '',
              }}
            />
            {errorDescriptionEn && <p className={styles.error}>{t("Admin.error")}</p>}

            <input
              type="text"
              className={styles.inputDescription}
              onChange={(e) => setQuoteEn(e.target.value)}
              value={quoteEn}
              placeholder='Quote'
              style={{
                borderColor: errorQuoteEn ? '#FF0000' : '',
              }}
            />
            {errorQuoteEn && <p className={styles.error}>{t("Admin.error")}</p>}
          </div>

          {/* <div className={styles.En_RU}>
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
          </div> */}

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
                style={{
                  borderColor: errorTitleRu ? '#FF0000' : '',
                }}
              />
              {errorTitleRu && <p className={styles.error}>{t("Admin.error")}</p>}


              <div>

                <input
                  type="text"
                  className={styles.inputDescription}
                  onChange={(e) => setNameRu(e.target.value)}
                  value={nameRu}
                  placeholder='Имя'
                  style={{
                    borderColor: errorNameRu ? '#FF0000' : '',
                  }}
                />
                {errorNameRu && <p className={styles.error}>{t("Admin.error")}</p>}
              </div>
              <input
                type="text"
                className={styles.inputDescription}
                onChange={(e) => setSurnameRu(e.target.value)}
                value={surnameRu}
                placeholder='Фамилия'
                style={{
                  borderColor: errorSurnameRu ? '#FF0000' : '',
                }}
              />
              {errorSurnameRu && <p className={styles.error}>{t("Admin.error")}</p>}

              <input
                type="text"
                className={styles.inputDescription}
                onChange={(e) => setDescriptionRu(e.target.value)}
                value={descriptionRu}
                placeholder='Описание'
                style={{
                  borderColor: errorDescriptionRu ? '#FF0000' : '',
                }}
              />
              {errorDescriptionRu && <p className={styles.error}>{t("Admin.error")}</p>}

              <input
                type="text"
                className={styles.inputDescription}
                onChange={(e) => setQuoteRu(e.target.value)}
                value={quoteRu}
                placeholder='Количество'
                style={{
                  borderColor: errorQuoteRu ? '#FF0000' : '',
                }}
              />
              {errorQuoteRu && <p className={styles.error}>{t("Admin.error")}</p>}

            </div>

            {/* <div className={styles.En_RU}>
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
            </div> */}
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

        )}

      {/* ------ */}

      <div className={styles.submit}>
        <div className={styles.parentPhoto}
          style={{
            borderColor: errorPhoto ? '#FF0000' : '',
          }}>
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
            {errorPhoto && <p className={styles.errorPhoto}>{t("Admin.select")}</p>}
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
