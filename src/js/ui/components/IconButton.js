import "../../../css/IconButton.css";

/**
 * This uses 2 approaches to hover-coloring icons:
 * 1) icon hiding for switching between the icon colors.
 * 2) AntD icon components with font color changes
 *
 * Another way we could do this would be with SVG's that use "currentColor"
 * attributes and dynamic colors set from JS instead.
 *
 * TODO: take alt props from parent for accessibility, Type this so the 2 uses are clear
 */
const IconButton = ({ iconClassHandler, iconsForSwitching, onClick }) => {
    let icon = null;
    if (iconClassHandler) {
        icon = iconClassHandler("iconButton iconFontButton");
    } else if (iconsForSwitching) {
        const { iconForDefault, iconForHover } = iconsForSwitching;
        icon = (
            <>
                <img
                    className="iconButton iconButtonDefault"
                    src={iconForDefault}
                />
                <img
                    className="iconButton iconButtonHover"
                    src={iconForHover}
                />
            </>
        );
    } else {
        throw new Error(
            "uh oh! this component requires either type of icon handler"
        );
    }

    return (
        <div className="iconButtonContainer" onClick={onClick}>
            {icon}
        </div>
    );
};

export default IconButton;
