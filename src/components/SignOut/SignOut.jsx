import React from 'react';
import styles from './SignOut.module.scss'
import {getAuth} from 'firebase/auth';

function SignOut() {
    const auth = getAuth()
    const signOut = async () => {
        await  auth.signOut()
    }
    return (
        <div onClick={signOut} className={styles.signOut}>
           <p> Sign Out</p>
        </div>
    );
}

export default SignOut;