"use client";
import React, { Component } from 'react';
import Link from 'next/link';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import styles from './carousel.module.css'

export default class NextJsCarousel extends Component {
    render() {
        return (
            <div className={styles.container}>
                <Carousel autoPlay infiniteLoop interval="7000" showThumbs={false} showStatus={false} >
                    <Link href="/catalog">
                        <img src="/Nvidia.jpg" alt="image1"/> 
                    </Link>
                    <Link href="/catalog">
                        <img src="/XSTRM.jpg" alt="image2" /> 
                    </Link>
                </Carousel>
            </div>
        );
    }
};