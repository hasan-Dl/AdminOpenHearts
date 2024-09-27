import React, { useState } from 'react'
import styles from './report.module.css'
import { useTranslation } from 'react-i18next'
import AddReport from './AddReport'
import Reports from './Reports'

export default function ButtonReport() {
    const { t } = useTranslation()
    const [active, setActive] = useState(false)
    const handleButtonClick = (buttonType) => {
        setActive(buttonType);
    }
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
