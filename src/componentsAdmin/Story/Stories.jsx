import React, { useState } from 'react'
import styles from './story.module.css'
import useFetch from '../../data/useFetch'
import del from '../../assets/Vector (3).png'
import del2 from '../../assets/Admin botton (1).png'
import MyModal from '../../modal/MyModal'
import ErrorModal from '../../modal/ErrorModal'
export default function Stories() {

  const [deleteShow, setDeleteShow] = useState({});
  const [modalActive, setModalActive] = useState(false)
  const [errorM, setErrorM] = useState(false)


  const lng = localStorage.getItem("i18nextLng")
  
  const { data, loading, error, setData } = useFetch("http://127.0.0.1:2020/get/pationt/story")
  if (loading) return <p>Loadind ...!</p>
  if (error) return <p>Error:{error.message}</p>


  


  const handleFirstButtonClick = (id) => {
    setDeleteShow((prevState) => {
      // Закрываем все кнопки перед открытием новой
      const updatedState = Object.keys(prevState).reduce((acc, currId) => {
        acc[currId] = false; // Все кнопки закрываем
        return acc;
      }, {});

      // Активируем только ту, на которую нажали
      return { ...updatedState, [id]: true };
    });
  };

  
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
    fetch(`http://127.0.0.1:2020/delete/pationt/story?id=${id}&Path=${Logo}`, requestOptions)
    .then(response => {
      if (response.ok) {
        setModalActive(true)
        const updatedData = data.filter(item => item.Id !== id);
        setData(updatedData);
        setErrorM(false)
      } else {
        setModalActive(false)
        setErrorM(true)
      }

    })    
      .catch((error) => console.error(error));
  };

  return (
    <div >

      <MyModal
        active={modalActive}
        setActive={setModalActive}
      />
      <ErrorModal
        error={errorM}
        setError={setErrorM}
      />

      <div className={styles.getDiv}>
        {data.map((item) => (
          <div className={styles.getParent} key={item.Id}>
            <div className={styles.boxGet}>
              <img className={styles.getImg} src={`http://127.0.0.1:2020/read/photo?Path=${item.Photo}`} />
              <h1 className={styles.textGet}>{lng == "ru" ? item.ru.name : item.en.name}</h1>
              <p className={styles.TitleGet}>{lng == "ru" ? item.ru.problemName : item.en.problemName}</p>
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
                    src={del} alt="delete icon" />
                  <button
                    onClick={() => handleDelete(item.Id, item.Photo)}
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
