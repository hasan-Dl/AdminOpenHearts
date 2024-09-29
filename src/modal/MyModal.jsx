
import React from 'react'
import { useTranslation } from 'react-i18next'
import susses from '../assets/susses.png'
export default function MyModal({ active, setActive, }) {
  const { t } = useTranslation()
  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
      <div className={active ? 'modal-content active' : 'modal-content'} onClick={e => e.stopPropagation()}>
        <div className='susses-error'>
          <img src={susses} alt="" />
        </div>
        <h1>{t("Admin.susses")}</h1>
      </div>
    </div>
  )
}
