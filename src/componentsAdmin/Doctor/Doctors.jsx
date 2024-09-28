import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../../data/useFetch'
import { data } from '../../data/data'
export default function Doctors() {

  // const [deleteShow, setDeleteShow] = useState({});
  const { data, loading, error } = useFetch("http://127.0.0.1:2020/get/team")
  if (loading) return <p>Loadind ...!</p>
  if (error) return <p>Error:{error.message}</p>


  // const handleFirstButtonClick = (id) => {
  //   setDeleteShow((prevState) => ({ ...prevState, [id]: true }));
  // };

  // // Обработчик для возврата первой кнопки
  // const handleSecondButtonClick = (id) => {
  //   setDeleteShow((prevState) => ({ ...prevState, [id]: false }));
  // };
  
  const handleDelete = (id,Logo) => {
    fetch(`http://127.0.0.1:2020/delete/team?id=${id}&Path=${Logo}`, {
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
    <div>
      {data.map((item) => (
        <div key={item.Id}>
          <Link to={`/admin/doctorAdmin/${item.Id}`}>One Doctor</Link>
          <img
          //  className={styles.getImg}
           src={`http://127.0.0.1:2020/read/photo?Path=${item.photo}`} alt="" />
          <button
                  onClick={() => handleDelete(item.Id,item.Logo)}
                  // className={styles.delete}
                  >
                  Delete
                </button>
        </div>
      ))}
    </div>
  )
}
