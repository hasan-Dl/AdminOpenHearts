import React, { useState } from 'react'
import AddStory from './AddStory'
import Stories from './Stories'
import styles from './story.module.css'
import { useTranslation } from 'react-i18next'

export default function ButtonStory() {
    const { t } = useTranslation()
    const [activeStatistic, setActiveStatistic] = useState(false)
    const handleButtonClick = (buttonType) => {
        setActiveStatistic(buttonType);
    }
    return (
        <div className={styles.styleBox}>
            <div className={styles.boxButton}>
                <button
                    className={`${styles.buttonAdd} ${activeStatistic === false ? styles.active : ''}`}
                    onClick={() => handleButtonClick(false)}
                > {t("Admin.addSto")}
                </button>
                <button
                    className={`${styles.buttonAdd} ${activeStatistic === true ? styles.active : ''}`}
                    onClick={() => handleButtonClick(true)}
                > {t("Admin.story")}
                </button>
            </div>
            {activeStatistic === false && <AddStory />}
            {activeStatistic === true && <Stories />}
        </div>
    )
}
