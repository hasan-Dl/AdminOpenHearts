import React from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../../data/useFetch'
import { data } from '../../data/data'
export default function Doctors() {

  

  return (
    <div>
      {data.map((item) => (
        <div key={item.Id}>
          <Link to={`/admin/doctorAdmin/${item.Id}`}>One Doctor</Link>
        </div>
      ))}
    </div>
  )
}
