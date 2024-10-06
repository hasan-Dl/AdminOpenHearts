import React, { useState } from 'react'
import useFetch from '../../data/useFetch';
import del from '../../assets/Vector (3).png'
import del2 from '../../assets/Admin botton (1).png'
import styles from './services.module.css'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MyModal from '../../modal/MyModal';
import ErrorModal from '../../modal/ErrorModal';
export default function ServicesA() {

  const [modalActive, setModalActive] = useState(false)
  const [errorM, setError] = useState(false)

  const [deleteShow, setDeleteShow] = useState({});
  const lng = localStorage.getItem("i18nextLng")
  const { t } = useTranslation()
  const { data, loading, error, setData } = useFetch("http://127.0.0.1:2020/get/main/diraction")
  if (loading) return <p>Loadind ...!</p>
  if (error) return <p>Error:{error.message}</p>

 

  const handleFirstButtonClick = (id) => {
    setDeleteShow((prevState) => {
      
      const updatedState = Object.keys(prevState).reduce((acc, currId) => {
        acc[currId] = false; // Все кнопки закрываем
        return acc;
      }, {});

     
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
    fetch(`http://127.0.0.1:2020/delete/main/diraction?id=${id}&Path=${Logo}`, requestOptions)
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


        ))}
      </div>
    </div>
  )
}
