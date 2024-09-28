import React, { useEffect, useRef, useState } from 'react'
import useFetch from '../../data/useFetch'
import styles from './statistic.module.css'
import del from '../../assets/Vector (3).png'
import del2 from '../../assets/Vector (4).png'

export default function StatisticS() {

  const [deleteShow, setDeleteShow] = useState({});

  const lng = localStorage.getItem("i18nextLng")
  const { data, loading, error } = useFetch("http://127.0.0.1:2020/get/statistic")
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

    fetch(`http://127.0.0.1:2020/delete/statistic?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Если нужно передавать cookie
    })
      .then(response => {
        if (response.ok) {
          alert("Susses")
        } else {
          alert("Error")
        }

      })
      fetch(`http://127.0.0.1:2020/get/statistic`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
      })
  }


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
