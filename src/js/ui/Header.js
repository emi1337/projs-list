import HeaderLogo from "../../assets/imgs/ThunkableBeaver.png";
import "../../css/Header.css";

/**
 * This guy is pretty small because there isn't much functionality, but we could
 * add a lot of things as needed. Either way, it makes sense for it to be separate.
 */
const Header = () => {
    return (
        <div className="headerBar">
            <img
                alt="thunkable beaver logo"
                className="headerLogo"
                src={HeaderLogo}
            />
            <div className="headerTitle">My Projects</div>
        </div>
    );
};

export default Header;
