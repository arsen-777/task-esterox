import React, {useEffect} from 'react';
import styles from './AdminPlays.module.scss';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Play from '../../components/Play/Play';
import AddPlay from '../../components/AddPlay/AddPlay';
import Loader from '../../components/Loader/Loader';
import {toggleIsUser} from '../../features/usersSlice';
import {fetchAllPlays} from '../../features/PlaysSlice';
import AdminNav from "../../components/AdminNav/AdminNav";

export default function AdminPlays() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllPlays());
        dispatch(toggleIsUser(false));
    }, [dispatch]);

    const {allPlays, isLoading} = useSelector((state) => state.plays);
    return (
        <div>
            <div className={styles.adminContainer}>
                <AdminNav/>
            </div>
            <div className={styles.playsBlock}>
                <div className={styles.playsContainer}>
                    {allPlays?.length > 0 &&
                        allPlays.map((play) => {
                            return <Play key={play.id} {...play} />;
                        })}
                    {isLoading && (
                        <div className={styles.loader}>
                            <div>
                                <Loader/>
                            </div>
                        </div>
                    )}
                    {!isLoading && <AddPlay/>}
                </div>
            </div>
        </div>
    );
}
