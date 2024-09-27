import React, { useState } from 'react'
import useFetch from '../../data/useFetch';
import { Link, useParams } from 'react-router-dom';
import del from '../../assets/Vector (3).png'
import logo from '../../assets/openHearts.png'
import del2 from '../../assets/Admin botton (2).png'
import surat from '../../assets/Artboard 5.png'
import styles from './doctor.module.css'
import LanguageSelector from '../../Languages/LanguageSelector';
import { data } from '../../data/data';
export default function OneDoctor() {
    const [deleteShow, setDeleteShow] = useState({});
    // const { data, loading, error } = useFetch("http://127.0.0.1:2020/get/main/diraction")

    const { idDoctor } = useParams()
    const item = data.find((each) => each.Id === idDoctor)
    // if (loading) return <p>Loading ...!</p>
    // if (error) return <p>Error:{error.message}</p>


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
                    <Link to={"/admin/doctorAdmin"} className={styles.back}>Back</Link>
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
                    <div className={styles.divText}>
                        <h1 className={styles.TitleText}>Саидов Саид</h1>
                        <h1 className={styles.TitleText1}>Психолог</h1>
                        <p className={styles.TitleServices}>Образование:</p>
                        <h4 className={styles.textContent}>Московский государственный университет, факультет психологии, 2010 год
                            Специализация: Клиническая психология</h4>
                        <p className={styles.TitleServices}>Дополнительные курсы и сертификаты:</p>
                        <ol className={styles.ol}>
                            <li>Курс "Когнитивно-поведенческая терапия", 2015 год</li>
                            <li>Сертификат "Работа с травмой и стрессом", 2018 год</li>
                        </ol>
                        <p className={styles.TitleServices}>Контактная информация:</p>
                        <p className={styles.Info}>Электронная почта: my.accaunt@gmail.com</p>
                        <p className={styles.Info}> Телефон: +992 90 900 90 90</p>
                        <p className={styles.Info}>Часы приема: Пн | Ср | Пт - с 8:00 ло 16:00</p>
                    </div>
                </div>

                <div className={styles.Doctor}>
                    <p className={styles.TitleServices}>О специалисте:</p>
                    <p className={styles.doctorTitle}>Саид Саидов – это высококвалифицированный психолог с более чем 10-летним опытом работы в области психологии. Он является сертифицированным специалистом в области клинической психологии, что позволяет ему профессионально и эффективно оказывать психологическую поддержку людям с ограниченными возможностями. Саид известен своим индивидуальным подходом к каждому клиенту, глубокой эмпатией и стремлением помочь людям справиться с психологическими трудностями и обрести внутреннюю гармонию.</p>
                    <p className={styles.TitleServices}>Опыт работы:</p>
                    <ol className={styles.ol}>
                        <li>Центр психологической помощи, психолог-консультант, 2011-2015 годы</li>
                        <li> Клиника психологической поддержки, ведущий психолог, 2016-2021 годы</li>
                        <li>Центр поддержки людей с ограниченными возможностями, психолог, с 2021 года по настоящее время</li>
                        <li>    Проекты: Руководитель проекта по оказанию психологической помощи ветеранам, участие в разработке программы психологической поддержки людей с инвалидностью</li>
                    </ol>

                    <p className={styles.TitleServices}>Услуги, предоставляемые специалистом:</p>

                    <ol className={styles.ol}>
                        <li>Психологическая поддержка: Саид Саидов предоставляет индивидуальные консультации, помогает справиться с тревогой, депрессией, стрессом и другими психологическими проблемами. Он специализируется на работе с людьми, пережившими травмы, и тех, кто испытывает сложности в социальной адаптации.</li>
                        <li>Когнитивно-поведенческая терапия: Использует методы когнитивно-поведенческой терапии для изменения негативных мыслей и моделей поведения.</li>
                        <li>Консультирование семей: Оказывает помощь семьям в улучшении внутрисемейных отношений, решении конфликтов и создании поддерживающей среды для людей с ограниченными возможностями.</li>
                    </ol>
                   
                    </div>
            </div>


        </div>
    )
}
