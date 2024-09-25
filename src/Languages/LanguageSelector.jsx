import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const language = [
    { code: "ru", lang: "EN" },
    { code: "en", lang: "RU" },
]
const LanguageSelector = () => {
    const [Languages, setLanguages] = useState(false)

    const { i18n } = useTranslation()
    const changeLanguage = (lng, ln) => {
        i18n.changeLanguage(lng)
        setLanguages(ln)
    }

    return (
        <div className='box'>

            <div className='lang'>

                {Languages == true ? <button className='button'
                    onClick={() => changeLanguage(language[0].code, false)}
                >
                    {language[0].lang}
                </button> : <button className='button'
                    onClick={() => changeLanguage(language[1].code, true)}
                >
                    {language[1].lang}
                </button>}
            </div>
        </div>
    )
}

export default LanguageSelector