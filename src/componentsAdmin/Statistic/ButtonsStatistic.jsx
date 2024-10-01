
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import styles from './statistic.module.css'
import AddStatistic from './AddStatistic';
import StatisticS from './StatisticS';

export default function ButtonsStatistic() {

  const { t } = useTranslation()

  // const [activeStatistic, setActiveStatistic] = useState(false)

  // const handleButtonClick = (buttonType) => {
  //   setActiveStatistic(buttonType);
  // };
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
        >{t("Admin.addSta")}
        </button>
        <button
          className={`${styles.buttonTwo} ${activeStatistic === true ? styles.activeTwo : ''}`}
          onClick={() => handleButtonClick(true)}
        >{t("Admin.statistic")}
        </button>
      </div>
      {activeStatistic === false && <AddStatistic />}
      {activeStatistic === true && <StatisticS />}
    </div>
  )
}
