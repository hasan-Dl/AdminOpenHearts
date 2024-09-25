import React, { useState } from 'react'
import styles from './services.module.css'
import { useTranslation } from 'react-i18next'
import AddServices from './AddServices'
import ServicesA from './ServicesA'
export default function ButtonServices() {
  const { t } = useTranslation()
  const [active, setActive] = useState(false)
  const handleButtonClick = (buttonType) => {
      setActive(buttonType);
  }
return (
  
     <div className={styles.styleBox}>
          <div className={styles.boxButton}>
              <button
                  className={`${styles.buttonAdd} ${active === false ? styles.active : ''}`}
                  onClick={() => handleButtonClick(false)}
              >    {t("Admin.addSer")}
              </button>
              <button
                  className={`${styles.buttonAdd} ${active === true ? styles.active : ''}`}
                  onClick={() => handleButtonClick(true)}
              > {t("Admin.services")}
              </button>
          </div>
          {active === false && <AddServices />}
          {active === true && <ServicesA />}
      </div>

)
}
