import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import "./button.scss";

const Button = (props) => {
    const { style, text, color, disabled, className, onClick, href } = props;
    const classnames = (className && className.split(" ")) || [];
    switch (style) {
        case "button":
            return (
                <button disabled={disabled} className={cx(...classnames)} onClick={onClick}>
                    {`${text}`}
                </button>
            );
        case "flat":
            return (
                <a href="" onClick={onClick} className="btn-text">
                    {`${text}`} &rarr;
                </a>
            );
        default:
            return (
                <a
                    href={href}
                    onClick={onClick}
                    className={cx(...classnames, "btn", "btn--animated", { [`btn--${color || `white`}`]: true })}
                >
                    {text}
                </a>
            );
    }
};

Button.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string,
    color: PropTypes.string,
    style: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};

export default Button;
