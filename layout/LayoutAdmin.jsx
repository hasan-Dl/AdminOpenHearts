import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from '../src/componentsAdmin/headerAdmin/AdminHeader'
import AdminNavbar from '../src/componentsAdmin/AdminNavbar/adminNavbar'
import styles from  './layout.module.css'
export default function LayoutAdmin() {
    return (
        <div className={styles.parentC}>
            <div>
            <AdminHeader />
            <div className={styles.hrBox}>
   <hr className={styles.hr} />
    </div>
            <div className={styles.parent}>
                <AdminNavbar/>
                <Outlet />
            </div>
            </div>
        </div>
    )
}
