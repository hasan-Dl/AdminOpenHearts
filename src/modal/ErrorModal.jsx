import React from 'react'
import { useTranslation } from 'react-i18next'
import errorIcon from '../assets/!.png' 
export default function ErrorModal({ errorM, setError, }) {
    const { t } = useTranslation()
    return (
      <div className={errorM ? 'modal-error error' : 'modal-error'} onClick={() => setError(false)}>
        <div className={errorM ? 'modal-content-error error' : 'modal-content-error'} onClick={e => e.stopPropagation()}>
          <div className='er'>
            <img src={errorIcon} alt="" />
          </div>
          <h1>{t("Admin.send")}</h1>
        </div>
      </div>
    )
  }
