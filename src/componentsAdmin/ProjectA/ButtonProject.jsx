import React, { useEffect, useState } from 'react'
import AddProject from './AddProject';
import Projects from './Projects';
import { useTranslation } from 'react-i18next';
import styles from './project.module.css'
export default function ButtonProject() {
  const { t } = useTranslation()




  const getInitialActiveStatistic = () => {
    const storedValue = localStorage.getItem('activeStatistic');
    return storedValue ? JSON.parse(storedValue) : false;
  };

  const [activeStatistic, setActiveStatistic] = useState(getInitialActiveStatistic);

  // Обновляем localStorage при изменении activeStatistic
  useEffect(() => {
    localStorage.setItem('activeStatistic', JSON.stringify(activeStatistic));
  }, [activeStatistic]);

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