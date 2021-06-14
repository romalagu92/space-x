import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import "./card.scss";

export const SpaceXCard = ({ mission_name, mission_id, launch_year, launch_success, launch_landing, links, index }) => {
    return (
        <>
            <div className="card__image-container">
                {links.mission_patch && (
                    <img
                        className="card__image"
                        src={
                            links.mission_patch_small ||
                            "https://cdn.pocket-lint.com/r/s/1200x/assets/images/142413-apps-feature-art-and-science-collide-the-best-in-modern-space-art-image1-iha6vzu3wk.jpg"
                        }
                    />
                )}
            </div>
            {mission_name && <div className="card__name--blue">{`${mission_name} #${index}`}</div>}
            {mission_id && mission_id.length ? (
                <ul className="card__id">
                    {mission_id.map((item, index) => {
                        return (
                            <li key={`${item}${index}`} className="">
                                {item}
                            </li>
                        );
                    })}
                </ul>
            ) : null}
            {launch_year && (
                <div className="card__label">
                    <span>Launch Year:</span> {launch_year}
                </div>
            )}
            <div className="card__label">
                <span>Successful Launch:</span> {`${launch_success}`}
            </div>
            {launch_landing && (
                <div className="card__label">
                    <span>Successful Landing:</span> {launch_landing}
                </div>
            )}
        </>
    );
};
const Card = ({ children, className }) => {
    const classnames = (className && className.split(" ")) || [];
    return <div className={cx("card", ...classnames)}>{children}</div>;
};

SpaceXCard.propTypes = {
    onClick: PropTypes.func,
    mission_name: PropTypes.string.isRequired,
    launch_year: PropTypes.string.isRequired,
    launch_landing: PropTypes.string,
    index: PropTypes.number.isRequired,
    launch_success: PropTypes.bool,
    mission_id: PropTypes.array.isRequired,
    links: PropTypes.object.isRequired,
};
export default Card;
