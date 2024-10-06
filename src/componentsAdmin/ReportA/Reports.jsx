import React, { useState,useEffect } from 'react'
import useFetch from '../../data/useFetch'
import styles from './report.module.css'
import { useTranslation } from 'react-i18next';
import del from '../../assets/Vector (3).png'
import del2 from '../../assets/Admin botton (1).png'
import PDF from "../../assets/pGF.png"
import MyModal from '../../modal/MyModal';
import ErrorModal from '../../modal/ErrorModal';
export default function Reports() {


  const [modalActive, setModalActive] = useState(false)
  const [errorM, setError] = useState(false)

  const [deleteShow, setDeleteShow] = useState({});
  const lng = localStorage.getItem("i18nextLng")
  const { t } = useTranslation()

  const { data, loading, error,setData } = useFetch("http://127.0.0.1:2020/get/report")
  if (loading) return <p>Loadind ...!</p>
  if (error) return <p>Error:{error.message}</p>



 
  const handleDelete = (id, Logo) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
      credentials: 'include',
    };
  
    // Исправлено: используем обратные кавычки для интерполяции переменных
    fetch(`http://127.0.0.1:2020/delete/report?id=${id}&Path=${Logo}`, requestOptions)
    .then(response => {
      if (response.ok) {
        setModalActive(true)
        const updatedData = data.filter(item => item.Id !== id);
        setData(updatedData);
        setError(false)
      } else {
        setModalActive(false)
        setError(true)
      }

    })
       

      .catch((error) => console.error(error));
  };


  const handleFirstButtonClick = (id) => {
    setDeleteShow((prevState) => {
      // Закрываем все кнопки перед открытием новой
      const updatedState = Object.keys(prevState).reduce((acc, currId) => {
        acc[currId] = false; // Все кнопки закрываем
        return acc;
      }, {});

      return { ...updatedState, [id]: true };
    });
  };


  return (
    <div className={styles.reportParent}>
        <MyModal
                active={modalActive}
                setActive={setModalActive}
            />
            <ErrorModal
                error={errorM}
                setError={setError}
            />
      {data.map((item) => (
        <div key={item.Id} className={styles.reportD}>
          <div>
            <div 
             style={{display:"flex",
              alignItems:"center"
             }}
            >
              <h1 className={styles.date_Time}>{item.date}</h1>
              <h1 className={styles.titleReport}>{lng == "ru" ? item.ru.title : item.en.title}</h1>
            </div>
          </div>
          <div style={{
            display:"flex",
            alignItems:"center",
            gap:"30px"
          }}>
            <a href={`http://127.0.0.1:2020/read/photo?Path=${item.file}`} >
             <img 
             style={{
              paddingTop:"6.5px"
             }} src={PDF} alt="" />
            </a>

            <div>
              {!deleteShow[item.Id] && (
                <button
                  className={`${styles.del} ${styles.fadeOut}`}
                  onClick={() => handleFirstButtonClick(item.Id)}
                >
                  <img src={del2} alt="delete icon" />
                </button>
              )}

              {deleteShow[item.Id] && (
                <div
                  className={`${styles.getButton} ${styles.fadeIn}`}
                >
                  <img
                    src={del} alt="delete icon" />
                  <button
                    onClick={() => handleDelete(item.Id, item.file)}
                    className={styles.delete}>
                    {t("Admin.delete")}
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      ))}

    </div>
  )
}

// 