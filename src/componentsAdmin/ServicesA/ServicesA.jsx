import React, { useState } from 'react'
import useFetch from '../../data/useFetch';
import del from '../../assets/Vector (3).png'
import del2 from '../../assets/Vector (4).png'
import styles from './services.module.css'
import { Link } from 'react-router-dom';
export default function ServicesA() {

  const [deleteShow, setDeleteShow] = useState({});
  const lng = localStorage.getItem("i18nextLng")
  const { data, loading, error } = useFetch("http://127.0.0.1:2020/get/main/diraction")
  if (loading) return <p>Loadind ...!</p>
  if (error) return <p>Error:{error.message}</p>

  const handleFirstButtonClick = (id) => {
    setDeleteShow((prevState) => ({ ...prevState, [id]: true }));
  };

  // Обработчик для возврата первой кнопки
  const handleSecondButtonClick = (id) => {
    setDeleteShow((prevState) => ({ ...prevState, [id]: false }));
  };
  
  const handleDelete = (id,Logo) => {
    fetch(`http://127.0.0.1:2020/delete/main/diraction?id=${id}&Path=${Logo}`, {
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
  }


  return (
    <div className={styles.getDiv}>
      {data.map((item) => (

        <div className={styles.getParent} key={item.Id} >
          <div className={styles.boxGet}>
            <img className={styles.getImg} src={`http://127.0.0.1:2020/read/photo?Path=${item.photo}`} />
            <Link to={`/admin/servicesAdmin/${item.Id}`} className={styles.texGet}>{lng == "ru" ? item.ru.title : item.en.title}</Link>
          </div>
          <div>
            {!deleteShow[item.Id] && (
              <button
                className={`${styles.del} ${styles.fadeIn}`}
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
                onClick={() => handleDelete(item.Id,item.Logo)}
                  className={styles.delete}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>


      ))}
    </div>
  )
}
