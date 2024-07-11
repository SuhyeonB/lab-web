import React, { useCallback, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import '../../style/Contact.css';
import flyer from '../../images/flyer.jpg';

const Contact = () => {
    const da_dong = useMemo(() => ({ lat: 37.874057, lng: 127.156209 }), []);
    const lab = { lat: 37.874227, lng: 127.156411 };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });

    const onLoad = useCallback(map => {
        const bounds = new window.google.maps.LatLngBounds(da_dong);
        map.fitBounds(bounds);
        map.setZoom(17);
    }, [da_dong]);

    return (
        <div id='main' className='wrapper'>
            <div id='content' className='container'>
                <div className='contactbox'>
                    {isLoaded ? (
                        <GoogleMap
                            mapContainerStyle={{ height: "40vh", width: "100%" }}
                            center={da_dong}
                            options={{ minZoom: 14, maxZoom: 19 }}
                            onLoad={onLoad}
                        >
                            <MarkerF position={lab} />
                        </GoogleMap>
                    ) : (
                        <div>Loading....</div>
                    )}
                    <div className='contactInfo'>
                        <div className='posInfo'>
                            <i className='fas fa-map-marker-alt fa-2x location' />
                            <span>대진대학교 이공학관 다동 4층 B9-407</span>
                        </div>
                    </div>
                </div>
                <div className='contactbox'>
                    <img src={flyer} alt='flyer' className='flyer' />
                    <div className='contactInfo'>
                        <div className='posInfo'>
                            <i className='far fa-comments fa-2x' />
                            <a href='https://open.kakao.com/o/sI7zS2ze' target='_blank' rel='noopener noreferrer'>https://open.kakao.com/o/sI7zS2ze</a>
                        </div>
                        <div className='posInfo'>
                            <i className='far fa-file fa-2x' />
                            <span>신청 양식</span>
                        </div>
                        <div className='posInfo'>
                            <i className='far fa-calendar fa-2x' />
                            <span>상시 모집</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
