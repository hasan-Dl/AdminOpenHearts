import React, { useEffect, useState } from 'react'
import AddProject from './AddProject';
import Projects from './Projects';
import { useTranslation } from 'react-i18next';
import styles from './project.module.css'
export default function ButtonProject() {
  const { t } = useTranslation()




  const getInitialActive = () => {
    const storedValue = localStorage.getItem('active');
    return storedValue ? JSON.parse(storedValue) : false;
  };

  const [active, setActive] = useState(getInitialActive);

  // Обновляем localStorage при изменении active
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
        >{t("Admin.addPro")}
        </button>
        <button
          className={`${styles.buttonTwo} ${active === true ? styles.activeTwo : ''}`}
          onClick={() => handleButtonClick(true)}
        >{t("Admin.project")}
        </button>
      </div>
      {active === false && <AddProject  setActive={setActive}  />}
      {active === true && <Projects />}
    </div>
  )
}