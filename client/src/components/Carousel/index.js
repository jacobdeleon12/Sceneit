import React from "react";

function Carousel({children}) {
    return (
        <div id="carouselVideo" className="carousel slide" data-ride="carousel" style={{width: "300px", height: "300px"}}>
            <div className="carousel-inner">
                {children}
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    )
};

export default Carousel;