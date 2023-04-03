import FloatButtonIcon from "../../../assets/imgs/PlusSign.svg";

import "../../../css/FloatingActionButton.css";

/**
 * I'm keeping this button reusable a generic event handler
 * We could have used the AntD FloatingButton, but I would have had to
 * override too many of the classes and design aspects. At that point
 * it made a lot more sense to just build the simple button from scratch
 */
const FloatingActionButton = ({ onClick }) => {
    return (
        <div className="headerFloatingCentered" onClick={onClick}>
            <div className="floatingButton">
                <img
                    alt="plus icon"
                    className="floatButtonLogo"
                    src={FloatButtonIcon}
                />
            </div>
        </div>
    );
};

export default FloatingActionButton;
