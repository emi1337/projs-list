import { useCallback, useEffect, useState } from "react";
import { Input } from "antd";

import IconButton from "./components/IconButton";
import EditIcon from "../../assets/imgs/EditIcon.svg";
import EditIconHover from "../../assets/imgs/EditIcon_Hover.svg";
import "../../css/ProjectNameSection.css";

// Keeping this button agnostic of use case for now with a generic event handler
const ProjectNameSection = ({ project, onSave }) => {
    // Initialize with data if project exists (null if it's the adding form)
    // Also default to showing the edit form if project is null
    const [name, setName] = useState(project ? project.name : null);
    const [isEditingName, setIsEditingName] = useState(project ? false : true);

    // useCallback helps prevent needless rerenders
    const onChangeName = useCallback((event) => {
        setName(event.target.value);
    }, []);
    const onClickEditName = useCallback((event) => {
        setIsEditingName(true);
    }, []);

    // Right now we only save when we press enter. Register the listener
    useEffect(() => {
        if (isEditingName) {
            const keyDownHandler = (event) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    onSave(name, project?.id);
                    setIsEditingName(false);
                }
            };

            document.addEventListener("keydown", keyDownHandler);
            // Clean up listener to make sure we update the right one
            return () => {
                document.removeEventListener("keydown", keyDownHandler);
            };
        }
    }, [name, project, onSave, isEditingName]);

    // If we're editing the name, show the input form, otherwise
    // just display the text. The edit button will also show alongside (see below)
    let nameSection = isEditingName ? (
        <Input
            value={name}
            onChange={onChangeName}
            placeholder="Name your project"
        />
    ) : (
        <div className="projectNameText">{name}</div>
    );

    return (
        <div className="projectNameSection">
            {nameSection}
            {!isEditingName && (
                <IconButton
                    iconsForSwitching={{
                        iconForDefault: EditIcon,
                        iconForHover: EditIconHover,
                    }}
                    onClick={onClickEditName}
                />
            )}
        </div>
    );
};

export default ProjectNameSection;
