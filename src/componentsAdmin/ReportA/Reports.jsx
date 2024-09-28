import React, { useState } from 'react'
import useFetch from '../../data/useFetch'

export default function Reports() {
 
  // const [deleteShow, setDeleteShow] = useState({});
  const lng = localStorage.getItem("i18nextLng")
  const { data, loading, error } = useFetch("http://127.0.0.1:2020/get/report")
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
    fetch(`http://127.0.0.1:2020/delete/report?id=${id}&Path=${Logo}`, {
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
      {data.map((item)=>(
        <div key={item.Id}>
       
         <a href={`http://127.0.0.1:2020/read/photo?Path=${item.file}`} >PGF</a>

         <button
                  onClick={() => handleDelete(item.Id,item.file)}
                  // className={styles.delete}
                  >
                  Delete
                </button>
        </div>
      ))}
       
    </div>
  )
}
