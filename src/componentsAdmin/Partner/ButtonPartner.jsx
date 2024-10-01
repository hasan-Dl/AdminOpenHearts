import React, { useState } from 'react'
import styles from './partner.module.css'
import AddPartner from './AddPartner'
import Partners from './Partners'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
export default function ButtonPartner() {
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
        <div>
            <div className={styles.styleBox}>
                <div className={styles.boxButton}>
                    <button
                        className={`${styles.buttonOne} ${activeStatistic === false ? styles.activeOne : ''}`}
                        onClick={() => handleButtonClick(false)}
                    > {t("Admin.addP")}
                    </button>
                    <button
                        className={`${styles.buttonTwo} ${activeStatistic === true ? styles.activeTwo : ''}`}
                        onClick={() => handleButtonClick(true)}
                    >    {t("Admin.partner")}
                    </button>
                </div>
                {activeStatistic === false && <AddPartner />}
                {activeStatistic === true && <Partners />}
            </div>
        </div>
    )
}
