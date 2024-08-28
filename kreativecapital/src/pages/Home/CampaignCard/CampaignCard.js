import React, { useState } from 'react';
import './CampaignCard.css';

const CampaignCard = ({ campaign }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const toggleCard = () => {
        setIsOpen((prev) => !prev);
    };

    const handleClose = (e) => {
        e.stopPropagation();
        setIsOpen(false);
    };

    const handleInputClick = (e) => {
        e.stopPropagation(); // Prevent card from closing when input is clicked
    };

    const handleContribute = (e) => {
        e.stopPropagation();
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className={`campaign-card ${isOpen ? 'open' : 'closed'}`} onClick={toggleCard}>
            <h4>{campaign.name}</h4>
            <p className="description">
                {isOpen ? campaign.description : `${campaign.description.substring(0, 100)}...`}
            </p>
            <div className="campaign-info">
                <span className="goal">Goal: {campaign.goal}</span>
                <span className="percentage">{campaign.percentage}</span>
                <span className="time-left">{campaign.timeLeft}</span>
            </div>
            {isOpen && (
                <div className="expanded-content">
                    <input type="text" placeholder="Amount of KT" onClick={handleInputClick} />
                    <button className="contribute-button" onClick={handleContribute}>Contribute</button>
                    <button className="close-button" onClick={handleClose}>&times;</button>
                </div>
            )}
            {showPopup && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup">
                        <p>Thank You for Your Contribution!</p>
                        <button className="close-popup-button" onClick={closePopup}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CampaignCard;