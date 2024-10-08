import React, { useEffect, useState } from 'react'
import styles from './services.module.css'
import { useTranslation } from 'react-i18next'
import AddServices from './AddServices'
import ServicesA from './ServicesA'
export default function ButtonServices() {
  const { t } = useTranslation()
//   const [active, setActive] = useState(false)
//   const handleButtonClick = (buttonType) => {
//       setActive(buttonType);
//   }

const getInitialActive = () => {
    const storedValue = localStorage.getItem('active');
    return storedValue ? JSON.parse(storedValue) : false; 
};

const [active, setActive] = useState(getInitialActive);

// Обновляем localStorage при изменении activeStatistic
useEffect(() => {
    localStorage.setItem('active', JSON.stringify(active));
}, [active]);

const handleButtonClick = (buttonType) => {
    setActive(buttonType);
};
return (
  
     <div className={styles.styleBox}>
          <div className={styles.boxButton}>
              <button
                  className={`${styles.buttonOne} ${active === false ? styles.activeOne : ''}`}
                  onClick={() => handleButtonClick(false)}
              >    {t("Admin.addSer")}
              </button>
              <button
                  className={`${styles.buttonTwo} ${active === true ? styles.activeTwo : ''}`}
                  onClick={() => handleButtonClick(true)}
              > {t("Admin.services")}
              </button>
          </div>
          {active === false && <AddServices setActive1={setActive}  />}
          {active === true && <ServicesA />}
      </div>

)
}
