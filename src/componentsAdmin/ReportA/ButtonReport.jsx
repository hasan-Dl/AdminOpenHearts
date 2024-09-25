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
                    className={`${styles.buttonAdd} ${active === false ? styles.active : ''}`}
                    onClick={() => handleButtonClick(false)}
                >    {t("Admin.addRe")}
                </button>
                <button
                    className={`${styles.buttonAdd} ${active === true ? styles.active : ''}`}
                    onClick={() => handleButtonClick(true)}
                > {t("Admin.report")}
                </button>
            </div>
            {active === false && <AddReport />}
            {active === true && <Reports />}
        </div>
    )
}
