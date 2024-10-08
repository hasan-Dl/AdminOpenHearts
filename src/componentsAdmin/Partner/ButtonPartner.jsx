import React, { useState } from 'react'
import styles from './partner.module.css'
import AddPartner from './AddPartner'
import Partners from './Partners'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
export default function ButtonPartner() {
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
        <div>
            <div className={styles.styleBox}>
                <div className={styles.boxButton}>
                    <button
                        className={`${styles.buttonOne} ${active === false ? styles.activeOne : ''}`}
                        onClick={() => handleButtonClick(false)}
                    > {t("Admin.addP")}
                    </button>
                    <button
                        className={`${styles.buttonTwo} ${active === true ? styles.activeTwo : ''}`}
                        onClick={() => handleButtonClick(true)}
                    >    {t("Admin.partner")}
                    </button>
                </div>
                {active === false && <AddPartner setActive={setActive} />}
                {active === true && <Partners />}
            </div>
        </div>
    )
}
