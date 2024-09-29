import React, { useEffect, useRef, useState } from 'react'
import useFetch from '../../data/useFetch'
import styles from './statistic.module.css'
import del from '../../assets/Vector (3).png'
import del2 from '../../assets/Admin botton (1).png'

export default function StatisticS() {

  const [deleteShow, setDeleteShow] = useState({});

  const lng = localStorage.getItem("i18nextLng")
  const { data, loading, error,setData } = useFetch("http://127.0.0.1:2020/get/statistic")
  if (loading) return <p>Loadind ...!</p>
  if (error) return <p>Error:{error.message}</p>


  const handleFirstButtonClick = (id) => {
    setDeleteShow((prevState) => ({ ...prevState, [id]: true }));
  };

  // Обработчик для возврата первой кнопки
  const handleSecondButtonClick = (id) => {
    setDeleteShow((prevState) => ({ ...prevState, [id]: false }));
  };

 
      
  
  const handleDelete = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
      credentials: 'include',
    };
  
    // Исправлено: используем обратные кавычки для интерполяции переменных
    fetch(`http://127.0.0.1:2020/delete/statistic?id=${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
  
        // Обновляем локальные данные без повторного GET-запроса
        const updatedData = data.filter(item => item.Id !== id);
        setData(updatedData);
      })
      .catch((error) => console.error(error));
  };




  return (
    <div
      className={styles.get}>
      {data.map((item) => ((
        <div key={item.Id} className={styles.GitItem}>
          <div className={styles.getBox}>
            <h1 className={styles.getText}>{item.quantity}</h1>
            <p className={styles.descriptionGet}
            >{lng == "ru" ? item.ru.description : item.en.description}</p>
          </div>
          <div>
            {!deleteShow[item.Id] && (
              <button
                className={`${styles.del} ${styles.fadeOut}`}
                onClick={() => handleFirstButtonClick(item.Id)}
              >
                <img
                 src={del2} alt="delete icon" />
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
                  onClick={() => handleDelete(item.Id)}
                  className={styles.delete}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div >
      )))}
    </div>
  )
}
