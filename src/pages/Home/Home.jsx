import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';
import logo from '../../asets/images/logo.png';
export default function Home() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="" />
      </div>
      <div className={styles.nav}>
        <div>
          <Link className={styles.link} to="signUp">
            Sign Up
          </Link>
        </div>
        <div>
          <Link className={styles.link} to="login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
