import React, { useState } from 'react'
import OtpInput from 'react-otp-input';
import styles from './login.module.css'
import LanguageSelector from '../../Languages/LanguageSelector';
import logo from '../../assets/openHearts.png'
export default function Code() {
    const [otp, setOtp] = useState('');
    const [otpError , setOtpError] = useState(false);
    const [codeE, setCodeE] = useState([])

    const Submit = (e) => {
        e.preventDefault();
        
        let hasError = false;

        if (!otp) {
            setOtpError(true);
            hasError = true;
        } else {
            setOtpError(false);
        }
        if (hasError) {
            return;
        }
    
        const codeUpdate = {
            id: Date.now(),
            code: Number(otp)
        }
        setCodeE([...codeE, codeUpdate])
        setOtp('')
    }

    return (
        <div>
            <div className={styles.parent}>
                <img src={logo} className={styles.img} alt="" />
                <LanguageSelector />
            </div>
            <h1 className={styles.text}>Enter the code</h1>
            <div className={styles.DivCode}>
                <OtpInput
                    onChange={setOtp}
                    value={otp}
                    numInputs={6}
                    renderInput={(props) => <input  {...props} className={styles.code} placeholder='-' 
                    style={{
                        borderColor: otpError ? 'red' : '',
                    }}
                    />}
                />
            </div>
                 {otpError && <p style={{ color: 'red' }}>Code </p>}
            <button onClick={Submit} className={styles.submitEmail}>Submit</button>
            {codeE.map((item) => (
                <div key={item.id}>
                    <p>{item.code}</p>
                </div>
            ))}
        </div>
    )
}
