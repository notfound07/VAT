import React, { useState } from 'react';
import './Review.css'; // Import CSS file for styling

const Review = () => {
    const [rating, setRating] = useState(0);
    const [ratingMessage, setRatingMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [complimentsVisible, setComplimentsVisible] = useState(false);

    const starMessages = [
        "Poor",
        "Too bad",
        "Average quality",
        "Nice",
        "Very good quality"
    ];

    const handleStarClick = (value) => {
        setRating(value);
        setRatingMessage(starMessages[value - 1]);
    };

    const handleComplimentClick = () => {
        setComplimentsVisible(true);
    };

    const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1500);
    };

    return (
        <div className="wrapper">
            <div className="master">
                <h1>Review And Rating</h1>
                <h2>How was your experience with our product?</h2>
                <div className="rating-component">
                    <div className="status-msg">
                        <label>
                            <input className="rating_msg" type="hidden" name="rating_msg" value={ratingMessage} />
                        </label>
                        <strong>{ratingMessage}</strong>
                    </div>
                    <div className="stars-box">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <i
                                key={value}
                                className={`star fa fa-star ${rating >= value ? 'selected' : ''}`}
                                title={`${value} star${value > 1 ? 's' : ''}`}
                                data-message={starMessages[value - 1]}
                                data-value={value}
                                onMouseOver={() => handleStarClick(value)}
                                onClick={() => handleStarClick(value)}
                            ></i>
                        ))}
                    </div>
                    <div className="starrate">
                        <label>
                            <input className="ratevalue" type="hidden" name="rate_value" value={rating} />
                        </label>
                    </div>
                </div>

                {rating > 0 && (
                    <div className="feedback-tags">
                        <div className={`tags-container`} data-tag-set={rating}>
                            <div className="question-tag">
                                {rating < 3 ? "Why was your experience so bad?" : rating === 3 ? "Why was your average rating experience?" : "Why was your experience good?"}
                            </div>
                        </div>

                        {rating === 5 && (
                            <div className="make-compliment">
                                <div className="compliment-container">
                                    Give a compliment
                                    <i className="far fa-smile-wink" onClick={handleComplimentClick}></i>
                                </div>
                                {complimentsVisible && (
                                    <div className="list-of-compliment">
                                        <ul>
                                            {/* Add your compliment options here */}
                                            <li>
                                                <div className="icon-compliment">
                                                    <i className="far fa-thumbs-up"></i>
                                                </div>
                                                Compliment 1
                                            </li>
                                            <li>
                                                <div className="icon-compliment">
                                                    <i className="far fa-smile"></i>
                                                </div>
                                                Compliment 2
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="tags-box">
                            <input type="text" className="tag form-control" name="comment" id="inlineFormInputName" placeholder="Please enter your review" />
                            <input type="hidden" name="product_id" value="1" />
                        </div>
                    </div>
                )}
                <div className="button-box">
                    <input
                        type="submit"
                        className="done-btn-warning"
                        disabled={rating <= 0}
                        value="Add review"
                        onClick={handleSubmit}
                    />
                </div>

                {submitted && (
                    <div className="submited-box">
                        {loading ? (
                            <div className="loader"></div>
                        ) : (
                            <div className="success-message">Thank you!</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Review;