import { useCallback } from "react";
import { Empty } from "antd";

import ProjectDraggableRow from "./ProjectDraggableRow";
import "../../css/ProjectList.css";

/**
 * Handle the list: empty state for no items, and the linear list
 */
const ProjectList = ({
    deleteProjectAtIdx,
    editProjectAtIdx,
    moveProjectRow,
    projectList,
}) => {
    const renderProjectRow = useCallback(
        (project, idx) => {
            // Project-specific callbacks
            const editProject = (name) => {
                editProjectAtIdx(idx, project, name);
            };
            const deleteProject = () => {
                deleteProjectAtIdx(idx, project);
            };
            return (
                <ProjectDraggableRow
                    key={project.id}
                    canDrag={projectList.length > 1}
                    currentIdx={idx}
                    project={project}
                    deleteProject={deleteProject}
                    editProject={editProject}
                    moveProjectRow={moveProjectRow}
                />
            );
        },
        [
            editProjectAtIdx,
            deleteProjectAtIdx,
            moveProjectRow,
            projectList.length,
        ]
    );

    if (!projectList.length) {
        return (
            <div className="content">
                <div className="noProjectsList">
                    <Empty />
                </div>
            </div>
        );
    }

    // Build all the project rows, keep track of idx for reordering
    return (
        <div className="content">
            <div className="projectList">
                {projectList.map((project, idx) =>
                    renderProjectRow(project, idx)
                )}
            </div>
        </div>
    );
};

export default ProjectList;
