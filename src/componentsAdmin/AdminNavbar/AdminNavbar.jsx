import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './navbar.module.css'
import { useTranslation } from 'react-i18next'
export default function AdminNavbar() {
  const { t } = useTranslation()
  return (
    <div className={styles.admin}>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.link}` : styles.links
        }
        to={'/admin/statisticAdmin'}
      >{t('Admin.statistic')}</NavLink>

      <NavLink
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.link}` : styles.links
        }
        to={'/admin/storyAdmin'}
      > {t("Admin.story")}</NavLink>

      <NavLink
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.link}` : styles.links
        }
        to={'/admin/partnerAdmin'}
      >{t("Admin.partner")}</NavLink>
      <NavLink
      to={'/admin/projectAdmin'}
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.link}` : styles.links
        }
      >{t("Admin.project")}
      </NavLink>

      <NavLink
      to={'/admin/servicesAdmin'}
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.link}` : styles.links
        }
      >
        {t("Admin.services")}
      </NavLink>

      <NavLink 
      to={'/admin/doctorAdmin'}
       className={({ isActive }) =>
        isActive ? `${styles.link} ${styles.link}` : styles.links
      }
      >{t("Admin.doctor")}</NavLink>

      <NavLink 
       to={'/admin/reportAdmin'}
       className={({ isActive }) =>
        isActive ? `${styles.link} ${styles.link}` : styles.links
      }
      >{t("Admin.report")}</NavLink>

    </div>
  )
}
