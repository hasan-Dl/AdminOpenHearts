import React, { useState } from 'react'
import styles from './partner.module.css'
import AddPartner from './AddPartner'
import Partners from './Partners'
import { useTranslation } from 'react-i18next'
export default function ButtonPartner() {
    const { t } = useTranslation()
    const [activeStatistic, setActiveStatistic] = useState(false)
    const handleButtonClick = (buttonType) => {
        setActiveStatistic(buttonType);
    }
  return (
    <div>
       <div className={styles.styleBox}>
            <div className={styles.boxButton}>
                <button
                    className={`${styles.buttonAdd} ${activeStatistic === false ? styles.active : ''}`}
                    onClick={() => handleButtonClick(false)}
                > {t("Admin.addP")}
                </button>
                <button
                    className={`${styles.buttonAdd} ${activeStatistic === true ? styles.active : ''}`}
                    onClick={() => handleButtonClick(true)}
                >    {t("Admin.partner")}
                </button>
            </div>
            {activeStatistic === false && <AddPartner />}
            {activeStatistic === true && <Partners />}
        </div>
    </div>
  )
}
