import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../../data/useFetch'
import styles from './doctor.module.css'
import del from '../../assets/Vector (3).png'
import del2 from '../../assets/Admin botton (1).png'
export default function Doctors() {

  const [deleteShow, setDeleteShow] = useState({});
  const lng = localStorage.getItem("i18nextLng")
  const { data, loading, error,setData } = useFetch("http://127.0.0.1:2020/get/team")
  if (loading) return <p>Loadind ...!</p>
  if (error) return <p>Error:{error.message}</p>


  const handleFirstButtonClick = (id) => {
    setDeleteShow((prevState) => ({ ...prevState, [id]: true }));
  };

  // Обработчик для возврата первой кнопки
  const handleSecondButtonClick = (id) => {
    setDeleteShow((prevState) => ({ ...prevState, [id]: false }));
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
    fetch(`http://127.0.0.1:2020/delete/team?id=${id}&Path=${Logo}`, requestOptions)
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
    <div style={{
     borderTop:"2px solid black"
    }}>
      {data.map((item) => (
        <div key={item.Id} className={styles.parentDoctorGet}>
          <Link
          
          style={{
            textDecoration :"none",
            color:"black"
          }}
           to={`/admin/doctorAdmin/${item.Id}`}>

              <div className={styles.getNAmeImg}>
                <img
                  className={styles.getImg}
                  src={`http://127.0.0.1:2020/read/photo?Path=${item.photo}`} alt="" />
                <h2 className={styles.textGet}>{lng == "ru" ? item.ru.full_name : item.en.full_name}</h2>
                <h4 className={styles.TitleGet}>{lng == "ru" ? item.ru.profession : item.en.profession}</h4>
              </div>
                    </Link>
            <div >

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
                      onClick={() => handleDelete(item.Id, item.Logo)}
                      className={styles.delete}>
                      Delete
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

