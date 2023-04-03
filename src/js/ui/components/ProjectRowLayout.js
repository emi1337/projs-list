import ProjectNameSection from "../ProjectNameSection";
import ProjectLogo from "../../../assets/imgs/defaultProjectIcon_2x.png";
import "../../../css/ProjectRow.css";

/**
 * This basic layout is shared by 2 main components:
 * 1. ProjectPreview, which is used for the list of projects.
 * 2. ProjectAddRow, which is the form for creating a new row.
 *
 * That way, we can change the designs in one place and don't have to rewrite
 * it in multiple places.
 */
const ProjectRow = ({
    project,
    saveProject,
    middleComponent,
    rightComponent,
}) => {
    return (
        <div className="projectRow">
            <div className="projectRowLeftSide">
                <img
                    alt="project row default img"
                    className="projectImg"
                    src={ProjectLogo}
                />
                <ProjectNameSection onSave={saveProject} project={project} />
            </div>
            {middleComponent}
            {rightComponent}
        </div>
    );
};

export default ProjectRow;
