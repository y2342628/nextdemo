import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = ({ show, message }:{ show:boolean, message?:string }) => {
    if (!show) {
        return null;
    }

    return (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1050 }}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">{message || 'Loading...'}</span>
            </Spinner>
        </div>
    );
};

export default Loading;