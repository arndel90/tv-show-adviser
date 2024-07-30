import s from './style.module.css';
import {StarFill,  Star as StarEmpty, StarHalf } from "react-bootstrap-icons"
import PropTypes from "prop-types";

FiveStarRating.prototype = {
    rating: PropTypes.number.isRequired
}

export default function FiveStarRating({rating}) {
    
    const starList = [];
    
    const fullStar = Math.floor(rating);
    const halfStar = rating - fullStar >= 0.5;
    const emptyStar = 5 - fullStar - (halfStar ? 1 : 0);
    
    for (let i = 1 ; i <= fullStar ; i++) {
        starList.push(<StarFill key={"star-fill" + i} /> )
    }
    
    halfStar ? starList.push(<StarHalf key={"star-half"} />) : null;
    
    for (let i = 1 ; i <= emptyStar ; i++) {
        starList.push(<StarEmpty key={"star-empty" + i} /> )
    }
    
    return (
        <>
            {starList}
        </>
    )
}