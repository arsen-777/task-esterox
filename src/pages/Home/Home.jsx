import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';
import logo from '../../asets/images/logo.png';
export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} alt="" />
        </div>
        <div className={styles.nav}>
          <Link className={styles.link} to="signUp">
            Sign Up
          </Link>
          <Link className={styles.link} to="login">
            Login
          </Link>
        </div>
      </div>
      <div className={styles.bgBlock}></div>
    </div>
  );
}
