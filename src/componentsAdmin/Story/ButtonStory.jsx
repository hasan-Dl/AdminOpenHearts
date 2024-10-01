import React, { useEffect, useState } from 'react'
import AddStory from './AddStory'
import Stories from './Stories'
import styles from './story.module.css'
import { useTranslation } from 'react-i18next'

export default function ButtonStory() {
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
                > {t("Admin.addSto")}
                </button>
                <button
                    className={`${styles.buttonTwo} ${activeStatistic === true ? styles.activeTwo : ''}`}
                    onClick={() => handleButtonClick(true)}
                > {t("Admin.story")}
                </button>
            </div>
            {activeStatistic === false && <AddStory />}
            {activeStatistic === true && <Stories />}
        </div>
    )
}
