import React from "react";
import "./composition.scss";

const ImageComposition = () => {
    return (
        <div>
            <div className="composition">
                {/* photo --> element modifier->  */}
                {/* actual image size of nat-1 300px, without downloading browser will know
                    and based on screen width it will apply, pixel ratio change will not affect...
                    sizes: browser identifies which image to display at which resolution also,
                     for large small switching based on pixel ratio
                */}
                <img
                    srcSet="/img/nat-1.jpg 300w, /img/nat-1-large.jpg 1000w"
                    sizes="(max-width:900px) 20vw, (max-width:600px) 30vw, 300px"
                    src="/img/nat-1-large.jpg"
                    alt="1"
                    className="composition__photo composition__photo--p1"
                />
                <img
                    srcSet="/img/nat-2.jpg 300w, /img/nat-2-large.jpg 1000w"
                    sizes="(max-width:900px) 20vw, (max-width:600px) 30vw, 300px"
                    src="/img/nat-2-large.jpg"
                    alt="2"
                    className="composition__photo composition__photo--p2"
                />
                <img
                    srcSet="/img/nat-3.jpg 300w, /img/nat-3-large.jpg 1000w"
                    sizes="(max-width:900px) 20vw, (max-width:600px) 30vw, 300px"
                    src="/img/nat-3-large.jpg"
                    alt="3"
                    className="composition__photo composition__photo--p3"
                />
                {/* <img src="/img/nat-1-large.jpg" alt="1" className="composition__photo composition__photo--p1" />
                <img src="/img/nat-2-large.jpg" alt="2" className="composition__photo composition__photo--p2" />
                <img src="/img/nat-3-large.jpg" alt="3" className="composition__photo composition__photo--p3" /> */}
            </div>
        </div>
    );
};

export default ImageComposition;
