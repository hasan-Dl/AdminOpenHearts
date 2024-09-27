import React, { useState } from 'react'
import AddProject from './AddProject';
import Projects from './Projects';
import { useTranslation } from 'react-i18next';
import styles from './project.module.css'
export default function ButtonProject() {
    const { t } = useTranslation()
    const [activeStatistic, setActiveStatistic] = useState(false)
  
    const handleButtonClick = (buttonType) => {
      setActiveStatistic(buttonType);
    };
  
    return (
      <div className={styles.styleBox}>
        <div className={styles.boxButton}>
          <button
            className={`${styles.buttonOne} ${activeStatistic === false ? styles.activeOne : ''}`}
            onClick={() => handleButtonClick(false)}
          >{t("Admin.addPro")}
          </button>
          <button
            className={`${styles.buttonTwo} ${activeStatistic === true ? styles.activeTwo : ''}`}
            onClick={() => handleButtonClick(true)}
            >{t("Admin.project")}
          </button>
        </div>
        {activeStatistic === false && <AddProject />}
        {activeStatistic === true && <Projects />}
      </div>
    )
  }