
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import styles from './statistic.module.css'
import AddStatistic from './AddStatistic';
import StatisticS from './StatisticS';

export default function ButtonsStatistic() {

  const { t } = useTranslation()
  const [activeStatistic, setActiveStatistic] = useState(false)

  const handleButtonClick = (buttonType) => {
    setActiveStatistic(buttonType);
  };

  return (
    <div className={styles.styleBox}>
      <div className={styles.boxButton}>
        <button
          className={`${styles.buttonAdd} ${activeStatistic === false ? styles.active : ''}`}
          onClick={() => handleButtonClick(false)}
        >{t("Admin.addSta")}
        </button>
        <button
          className={`${styles.buttonAdd} ${activeStatistic === true ? styles.active : ''}`}
          onClick={() => handleButtonClick(true)}
        >{t("Admin.statistic")}
        </button>
      </div>
      {activeStatistic === false && <AddStatistic />}
      {activeStatistic === true && <StatisticS />}
    </div>
  )
}
