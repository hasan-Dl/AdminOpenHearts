import React, { useEffect, useState } from 'react'
import styles from './doctor.module.css'
import { useTranslation } from 'react-i18next'
import AddDoctor from './AddDoctor'
import Doctors from './Doctors'
export default function ButtonDoctor() {

    const { t } = useTranslation()

  

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
              >    {t("Admin.addDoc")}
              </button>
              <button
                  className={`${styles.buttonTwo} ${active === true ? styles.activeTwo : ''}`}
                  onClick={() => handleButtonClick(true)}
              > {t("Admin.doctor")}
              </button>
          </div>
          {active === false && <AddDoctor  setActive={setActive}  />}
          {active === true && <Doctors />}
      </div>
  )
}
