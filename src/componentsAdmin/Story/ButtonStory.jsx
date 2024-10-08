import React, { useEffect, useState } from 'react'
import AddStory from './AddStory'
import Stories from './Stories'
import styles from './story.module.css'
import { useTranslation } from 'react-i18next'

export default function ButtonStory() {
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
                > {t("Admin.addSto")}
                </button>
                <button
                    className={`${styles.buttonTwo} ${active === true ? styles.activeTwo : ''}`}
                    onClick={() => handleButtonClick(true)}
                > {t("Admin.story")}
                </button>
            </div>
            {active === false && <AddStory   setActive={setActive}/>}
            {active === true && <Stories />}
        </div>
    )
}
