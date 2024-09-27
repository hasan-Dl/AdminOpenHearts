import React, { useState } from 'react'
import styles from './doctor.module.css'
import { useTranslation } from 'react-i18next'
import AddDoctor from './AddDoctor'
import Doctors from './Doctors'
export default function ButtonDoctor() {

    const { t } = useTranslation()

    const [active,setActive]= useState(false)
    const handleButtonClick = (buttonType) => {
        setActive(buttonType);
    }

  return (
    <div className={styles.styleBox}>
          <div className={styles.boxButton}>
              <button
                  className={`${styles.buttonOne} ${active === false ? styles.activeOne : ''}`}
                  onClick={() => handleButtonClick(false)}
              >    {t("Admin.addDoc")}
              </button>
              <button
                  className={`${styles.buttonTwo} ${active === true ? styles.activeTwo : ''}`}
                  onClick={() => handleButtonClick(true)}
              > {t("Admin.doctor")}
              </button>
          </div>
          {active === false && <AddDoctor />}
          {active === true && <Doctors />}
      </div>
  )
}
