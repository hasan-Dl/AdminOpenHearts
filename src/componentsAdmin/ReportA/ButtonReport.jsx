import React, { useEffect, useState } from 'react'
import styles from './report.module.css'
import { useTranslation } from 'react-i18next'
import AddReport from './AddReport'
import Reports from './Reports'

export default function ButtonReport() {
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
                >    {t("Admin.addRe")}
                </button>
                <button
                    className={`${styles.buttonTwo} ${active === true ? styles.activeTwo : ''}`}
                    onClick={() => handleButtonClick(true)}
                > {t("Admin.report")}
                </button>
            </div>
            {active === false && <AddReport />}
            {active === true && <Reports />}
        </div>
    )
}
