import { useCallback } from "react";

import IconButton from "./components/IconButton";
import ProjectRowLayout from "./components/ProjectRowLayout";

// TODO: replace with X icons for canceling
import DeleteIcon from "../../assets/imgs/DeleteIcon.svg";
import DeleteIconHover from "../../assets/imgs/DeleteIcon_Hover.svg";

const ProjectAddRow = ({ onCancel, saveNewProject }) => {
    // Parent's saveNewProject() handles the state changes, but we handle
    // All of the related logic for initializing a new project here
    const addNewProject = useCallback(
        (name) => {
            // TODO: could put this into a /data/ file
            const creationTime = Date.now();
            const newProject = {
                // NOTE: the name may change but that will not update the id
                // This is just to make a unique ID so we don't get messy conflicts
                id: name + creationTime,
                name,
                creationTime,
            };
            saveNewProject(newProject);
        },
        [saveNewProject]
    );

    return (
        <ProjectRowLayout
            project={null}
            saveProject={addNewProject}
            rightComponent={
                <IconButton
                    iconForDefault={DeleteIcon}
                    iconForHover={DeleteIconHover}
                    onClick={onCancel}
                />
            }
        />
    );
};

export default ProjectAddRow;
