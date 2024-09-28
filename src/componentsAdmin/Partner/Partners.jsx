import React, { useState } from 'react'
import useFetch from '../../data/useFetch'
import del from '../../assets/Vector (3).png'
import del2 from '../../assets/Admin botton (1).png'
import styles from './partner.module.css';
export default function Partners() {
  const [deleteShow, setDeleteShow] = useState({});
  const { data, loading, error } = useFetch("http://127.0.0.1:2020/get/patners")
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
    fetch(`http://127.0.0.1:2020/delete/partner?id=${id}&Path=${Logo}`, {
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
    <div className={styles.grid}>
      {data.map((item) => (
        <div  key={item.Id} className={styles.getDiv}>
          <img className={styles.getImg} src={`http://127.0.0.1:2020/read/photo?Path=${item.Logo}`} alt="" />
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
