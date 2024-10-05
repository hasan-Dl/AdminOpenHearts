import React, { useState } from 'react'
import useFetch from '../../data/useFetch';
import { Link, useNavigate, useParams } from 'react-router-dom';
import del from '../../assets/Vector (3).png'
import logo from '../../assets/openHearts.png'
import del2 from '../../assets/Admin botton (2).png'
import surat from '../../assets/Artboard 5.png'
import styles from './doctor.module.css'
import LanguageSelector from '../../Languages/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { IoTennisball } from 'react-icons/io5';
import MyModal from '../../modal/MyModal';
import ErrorModal from '../../modal/ErrorModal';
// import { data } from '../../data/data';

export default function OneDoctor() {

    const lng = localStorage.getItem("i18nextLng")
    const { t } = useTranslation()
    const [deleteShow, setDeleteShow] = useState({});
    const [modalActive, setModalActive] = useState(false)
    const [errorM, setError] = useState(false)

    const { data, loading, error, setData} = useFetch("http://127.0.0.1:2020/get/team")
    const navigate = useNavigate()
    const { idDoctor } = useParams()
    const item = data.find((each) => each.Id === idDoctor)
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
        fetch(`http://127.0.0.1:2020/delete/team?id=${id}&Path=${Logo}`, {
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
                    navigate('/admin/doctorAdmin')
                    setError(false)
                } else {
                    setModalActive(false)
                    setError(true)
                }

            })
    }



    return (
        <div className={styles.oneParent} >
            <h1 className={styles.line}></h1>
            <MyModal
                active={modalActive}
                setActive={setModalActive}
            />
            <ErrorModal
                error={errorM}
                setError={setError}
            />
            <div>
                <div className={styles.parent1}>
                    <div className={styles.img}>
                        <img src={logo} alt="" />
                    </div>
                    <div className={styles.box}>
                        <LanguageSelector />
                    </div>
                </div>
                <div className={styles.boxBody}>
                    <div className={styles.oneBox}>
                        <Link to={"/admin/doctorAdmin"} className={styles.back}>{t("Home.Props.back")}</Link>
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
                        <img className={styles.oneImg}
                            src={`http://127.0.0.1:2020/read/photo?Path=${item.photo}`}
                            alt="" />
                        <div className={styles.divText}>
                            <h1 className={styles.TitleText}>{lng == "ru" ? item.ru.full_name : item.en.full_name}</h1>
                            <h1 className={styles.TitleText1}>{lng == "ru" ? item.ru.profession : item.en.profession}</h1>
                            <p className={styles.TitleServices}>{t("Admin.education")}</p>
                            <h4 className={styles.textContent}>{lng == "ru" ? item.ru.education : item.en.education}</h4>
                            <p className={styles.TitleServices}>{t("Admin.additional")}</p>
                            <ol className={styles.ol}>
                                {item[lng === "ru" ? "ru" : "en"].additional_information.map((text, index) => (
                                    <li key={index}>
                                        {index + 1}. {text}
                                    </li>
                                ))}
                            </ol>

                            <p className={styles.TitleServices}>{t("Admin.contact")}</p>
                            <p className={styles.Info}>Электронная почта: {item.gmail}</p>
                            <p className={styles.Info}> Телефон: +992 {item.phone}</p>
                            <div className={styles.Info1} key={item}> Часы приема:
                                <li
                                    style={{
                                        listStyle: "none"
                                    }}
                                >
                                    {item.time.days_of_week[0]} | {item.time.days_of_week[1]} | {item.time.days_of_week[2]} -
                                </li>
                                <h1 className={styles.StarIsEnd}>{item.time.start_time} </h1> до <h3 className={styles.StarIsEnd}>{item.time.end_time}</h3>
                            </div>
                        </div>
                    </div>

                    <div className={styles.Doctor}>
                        <p className={styles.TitleServices}>{t("Admin.about")}</p>
                        <p className={styles.doctorTitle}>{lng == "ru" ? item.ru.about_specialist : item.en.about_specialist}</p>
                        <p className={styles.TitleServices}>{t("Admin.work")}</p>
                        <ol className={styles.ol}>
                            {item[lng === "ru" ? "ru" : "en"].expirence.map((text, index) => (
                                <li key={index}>
                                    {index + 1}. {text}
                                </li>
                            ))}
                        </ol>

                        <p className={styles.TitleServices}>{t("Admin.s")}</p>

                        <ol className={styles.ol}>
                            {item[lng === "ru" ? "ru" : "en"].services.map((text, index) => (
                                <li key={index}>
                                    {index + 1}. {text}
                                </li>
                            ))}
                        </ol>

                    </div>
                </div>
            </div>
        </div>
    )
}
