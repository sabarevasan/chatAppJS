import React  from "react";

import './Loader.scss';

export default function Loader({message = 'One moment please....'}) {
    return(
        <div className="loading-screen">
            <div className="loading-view">
                <div className="loading-view-container">
                    <div className="mb-3">{message}</div>
                    <div className="spinner">
                        <div className="double-bounce1"></div>
                        <div className="double-bounce2"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}