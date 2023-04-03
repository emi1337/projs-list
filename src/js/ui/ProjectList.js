import { Empty } from "antd";

import ProjectPreview from "./ProjectPreview";
import "../../css/ProjectList.css";

const ProjectList = ({ deleteProjectAtIdx, editProjectAtIdx, projectList }) => {
    if (!projectList.length) {
        return (
            <div className="content">
                <div className="noProjectsList">
                    <Empty />
                </div>
            </div>
        );
    }

    const projectItems = new Array(projectList.length);
    // Build all the project rows, keep track of order in list for easy
    // editing/deleting access
    for (let i = 0; i < projectList.length; i++) {
        // Project-specific callbacks
        const project = projectList[i];
        const editProject = (name) => {
            editProjectAtIdx(i, project, name);
        };
        const deleteProject = () => {
            deleteProjectAtIdx(i, project);
        };

        projectItems[i] = (
            <ProjectPreview
                project={project}
                key={project.id}
                deleteProject={deleteProject}
                editProject={editProject}
            />
        );
    }

    return (
        <div className="content">
            <div className="projectList">{projectItems}</div>
        </div>
    );
};

export default ProjectList;
