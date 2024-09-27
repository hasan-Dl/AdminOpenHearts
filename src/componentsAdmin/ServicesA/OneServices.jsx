import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './services.module.css'
import useFetch from '../../data/useFetch'
import del from '../../assets/Vector (3).png'
import logo from '../../assets/openHearts.png'
import del2 from '../../assets/Admin botton (2).png'
import surat from '../../assets/ос-10.png'
import LanguageSelector from '../../Languages/LanguageSelector'
export default function OneServices() {

    const [deleteShow, setDeleteShow] = useState({});
    const { data, loading, error } = useFetch("http://127.0.0.1:2020/get/main/diraction")
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

    return (
        <div className={styles.oneParent}>
            <div className={styles.parent}>
                <div className={styles.img}>
                    <img src={logo} alt="" />
                </div>
                <div className={styles.box}>
                    <LanguageSelector />
                </div>
            </div>
            <h1 className={styles.line}></h1>
            
            <div key={item.Id} className={styles.boxBody}>
                <div className={styles.oneBox}>
                    <Link to={"/admin/servicesAdmin"} className={styles.back}>Back</Link>
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
                                    onClick={() => handleDelete(item.Id)}
                                    className={styles.deleteOne}>
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.divBody}>
                    <img className={styles.oneImg} src={surat} alt="" />
                    {/* <img className={styles.oneImg} src={`http://127.0.0.1:2020/read/photo?Path=${item.Photo}`} /> */}
                    <div className={styles.divText}>
                        <h1 className={styles.TitleText}>Психологическая поддержка</h1>
                        <h4 className={styles.NuberOne}>+992 90 900 90 90</h4>
                        <p className={styles.TitleServices}>Описание направления:</p>
                        <p className={styles.descriptionText}>Психологическая поддержка – это важнейшее направление нашего центра, направленное на помощь людям с ограниченными возможностями в преодолении эмоциональных и психологических трудностей. Наши квалифицированные психологи работают как с индивидуальными клиентами, так и с семьями, помогая справляться с депрессией, тревогой, стрессом и посттравматическими расстройствами.</p>
                        <p className={styles.TitleServices}>Основные услуги:</p>
                        <h4 className={styles.textContent}>Индивидуальные консультации.</h4>
                        <h4 className={styles.textContent}> Групповые сеансы психотерапии.</h4>
                        <h4 className={styles.textContent}>Арт-терапия.</h4>
                        <h4 className={styles.textContent}>Поддержка семей.</h4>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
}
