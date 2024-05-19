import React from 'react';
import css from './loading.module.css';
import loadWheel from '@/public/image/loading.gif'
import Image from 'next/image';

const LoadingScreen = () => {
    return (
        <div className={css.loadingContainer}>
            <Image src={loadWheel} alt="Loading" className={css.loadingImage} />
            <h1 className={css.loadingText}>Loading...</h1>
        </div>
    );
};

export default LoadingScreen;