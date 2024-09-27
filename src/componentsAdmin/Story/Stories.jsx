import React, { useState } from 'react'
import styles from './story.module.css'
import useFetch from '../../data/useFetch'
import del from '../../assets/Vector (3).png'
import del2 from '../../assets/Vector (4).png'
export default function Stories() {
  const [deleteShow, setDeleteShow] = useState({});
  const lng = localStorage.getItem("i18nextLng")
  const { data, loading, error } = useFetch("http://127.0.0.1:2020/get/pationt/story")
  if (loading) return <p>Loadind ...!</p>
  if (error) return <p>Error:{error.message}</p>

  const handleFirstButtonClick = (id) => {
    setDeleteShow((prevState) => ({ ...prevState, [id]: true }));
  };

  // Обработчик для возврата первой кнопки
  const handleSecondButtonClick = (id) => {
    setDeleteShow((prevState) => ({ ...prevState, [id]: false }));
  };

  return (
    <div >
      <div className={styles.getDiv}>
      {data.map((item) => (

        <div className={styles.getParent} key={item.Id}>
          <div className={styles.boxGet}>
            <img className={styles.getImg} src={`http://127.0.0.1:2020/read/photo?Path=PatientData${item.Photo}`} />
            <h1 className={styles.textGet}>{lng == "ru" ? item.ru.name : item.en.name}</h1>
            <p  className={styles.TitleGet}>{lng == "ru" ? item.ru.problemName : item.en.problemName}</p>
          </div>
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
                  onClick={() => handleSecondButtonClick(item.Id)}
                  src={del} alt="delete icon" />
                <button
                  onClick={() => handleDelete()}
                  className={styles.delete}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

))}
</div>
    </div>
  )
}
