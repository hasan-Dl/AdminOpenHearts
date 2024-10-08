import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from './services.module.css'
import useFetch from '../../data/useFetch'
import del from '../../assets/Vector (3).png'
import logo from '../../assets/openHearts.png'
import del2 from '../../assets/Admin botton (2).png'
// import surat from '../../assets/ос-10.png'
import LanguageSelector from '../../Languages/LanguageSelector'
import { useTranslation } from 'react-i18next'
import ErrorModal from '../../modal/ErrorModal'
import MyModal from '../../modal/MyModal'
export default function OneServices() {

    const [modalActive, setModalActive] = useState(false)
    const [errorM, setError] = useState(false)
    const navigate = useNavigate()

    const { t } = useTranslation()
    const lng = localStorage.getItem("i18nextLng")
    const [deleteShow, setDeleteShow] = useState({});
    const { data, loading, error,setData } = useFetch("http://127.0.0.1:2020/get/main/diraction")
    const { id } = useParams()
    const item = data.find((each) => each.Id === id)
    if (loading) return <p>Loading ...!</p>
    if (error) return <p>Error:{error.message}</p>



    const handleFirstButtonClick = (id) => {
        setDeleteShow((prevState) => ({ ...prevState, [id]: true }));
    };

    // Обработчик для возврата первой кнопки
    const handleSecondButtonClick = (id) => {
        setDeleteShow((prevState) => ({ ...prevState, [id]: false }));
    };

    const handleDelete = (id, Logo) => {
        fetch(`http://127.0.0.1:2020/delete/main/diraction?id=${id}&Path=${Logo}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },

            credentials: 'include', // Если нужно передавать cookie
        })
            .then(response => {
                if (response.ok) {
                    setModalActive(true)
                    const updatedData = data.filter(item => item.Id !== id);
                    setData(updatedData);
                    navigate('/admin/servicesAdmin')
                    setError(false)
                } else {
                    setModalActive(false)
                    setError(true)
                }
            })
  
    }


    return (

        <div className={styles.oneParent}>
                <h1 className={styles.line}></h1>
            <div>

                <MyModal
                    active={modalActive}
                    setActive={setModalActive}
                />
                <ErrorModal
                    error={errorM}
                    setError={setError}
                />
                <div className={styles.parent1}>
                    <div className={styles.img}>
                        <img src={logo} alt="" />
                    </div>
                    <div className={styles.box}>
                        <LanguageSelector />
                    </div>
                </div>

                <div key={item.Id} className={styles.boxBody}>
                    <div className={styles.oneBox}>
                        <Link to={"/admin/servicesAdmin"} className={styles.back}>{t("Home.Props.back")}</Link>
                        <div>
                            {!deleteShow[item.Id] && (

                                <img src={del2} alt="delete icon" onClick={() => handleFirstButtonClick(item.Id)} className={styles.fadeOutOne} />

                            )}

                            {deleteShow[item.Id] && (
                                <div
                                    className={`${styles.getButtonOne} ${styles.fadeInOne}`}
                                >
                                    <img
                                        onClick={() => handleSecondButtonClick(item.Id)}
                                        src={del} alt="delete icon" />
                                    <button
                                        onClick={() => handleDelete(item.Id, item.Logo)}
                                        className={styles.deleteOne}>
                                        {t("Admin.delete")}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={styles.divBody}>
                        <img className={styles.oneImg} src={`http://127.0.0.1:2020/read/photo?Path=${item.photo}`} />
                        <div className={styles.divText}>
                            <h1 className={styles.TitleText}>{lng == "ru" ? item.ru.title : item.en.title}</h1>
                            <h4 className={styles.NuberOne}>+992 {item.phone}</h4>
                            <p className={styles.TitleServices}>{t("Admin.des")}</p>
                            <p className={styles.descriptionText}>{lng == "ru" ? item.ru.description : item.en.description}</p>
                            <p className={styles.TitleServices}>{t("Admin.main")}</p>

                            <ol className={styles.textContent}>
                                {item[lng === "ru" ? "ru" : "en"].mainServices.map((text, index) => (
                                    <li key={index}>
                                        {text}
                                    </li>
                                ))}
                            </ol>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
