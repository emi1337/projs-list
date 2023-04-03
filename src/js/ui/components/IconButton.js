import "../../../css/IconButton.css";

/**
 * This uses icon hiding for switching between the icon colors. However another
 * way we could do this would be with SVG's that use "currentColor" attributes
 * and dynamic colors set from JS instead.
 *
 * TODO: take alt props from parent for accessibility
 */
const IconButton = ({ iconForDefault, iconForHover, onClick }) => {
    return (
        <div className="iconButtonContainer" onClick={onClick}>
            <img
                className="iconButton iconButtonDefault"
                src={iconForDefault}
            />
            <img className="iconButton iconButtonHover" src={iconForHover} />
        </div>
    );
};

export default IconButton;
