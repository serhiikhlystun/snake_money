import React, { useRef } from 'react';
import Image from 'next/image';

import 'swiper/scss';
import './SliderComponent.sass';

import buttonPrev from './img/btn-left.png';
import buttonNext from './img/btn-right.png';
import worm1 from './img/worm.svg';
import worm2 from './img/worm2.svg';
import worm3 from './img/worm3.svg';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

const SwiperComponent = () => {
    const swiperRef = useRef(null);

    const handlePrev = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    const handleNext = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };

    return (
        <div className="slider__wrapp slider-component">
            <div className="swiper-button-prev" onClick={handlePrev}>
                <Image src={buttonPrev} width={80} height={101} alt="Prev Button" />
            </div>
            <Swiper
                ref={swiperRef}
                modules={[Navigation]}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 10000, disableOnInteraction: false }}
                scrollbar={{ draggable: true }}
            >
                <SwiperSlide>
                    <Image src={worm1} alt="Slide 1" />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src={worm2} alt="Slide 2" />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src={worm3} alt="Slide 3" />
                </SwiperSlide>
            </Swiper>
            <div className="swiper-button-next" onClick={handleNext}>
                <Image src={buttonNext} width={80} height={101} alt="Next Button" />
            </div>
        </div>
    );
};

export default SwiperComponent;
