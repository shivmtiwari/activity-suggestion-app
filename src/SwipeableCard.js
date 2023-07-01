import React, { useState } from 'react';

const SwipeableCard = ({ onSwipeRight, onSwipeLeft, activity, backgroundColor }) => {
    const [startX, setStartX] = useState(0);
    const [translateX, setTranslateX] = useState(0);

// Touch event handlers
    const handleTouchStart = (event) => {
        setStartX(event.touches[0].clientX);
    };

    const handleTouchMove = (event) => {
        const currentX = event.touches[0].clientX;
        const diffX = currentX - startX;
        setTranslateX(diffX);
    };

    const handleTouchEnd = () => {
        if (translateX > 80) {
            onSwipeRight();
        } else if (translateX < -80) {
            onSwipeLeft();
        }
        setTranslateX(0);
    };

// Mouse event handlers:
    const handleMouseDown = (event) => {
        setStartX(event.clientX);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (event) => {
        const currentX = event.clientX;
        const diffX = currentX - startX;
        setTranslateX(diffX);
    };

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);

        if (translateX > 5) {
            onSwipeRight();
        } else if (translateX < -5) {
            onSwipeLeft();
        }
        setTranslateX(0);
    };

    return (
        <div
            className="card-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            {activity && (
                <div
                    className="card"
                    style={{
                        transform: `translateX(${translateX}px)`,
                        background: backgroundColor,
                    }}
                >
                        <h1 style={{ fontSize: '1.8rem', }}>{activity.activity}</h1>
                        <p><b>Type of activity :</b> {activity.type}</p>
                        <p><b>No. of participants :</b> {activity.participants}</p>
                </div>
            )}

        </div>
    );
};

export default SwipeableCard;
