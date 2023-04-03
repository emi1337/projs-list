import dayjs from "dayjs";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";

import IconButton from "./components/IconButton";
import ProjectRowLayout from "./components/ProjectRowLayout";

import DeleteIcon from "../../assets/imgs/DeleteIcon.svg";
import DeleteIconHover from "../../assets/imgs/DeleteIcon_Hover.svg";
import "../../css/ProjectPreview.css";

const { confirm } = Modal;

const ProjectPreview = ({ project, deleteProject, editProject }) => {
    // This method opens an out-of-the-box modal view with these contents.
    // NOTE: This UI is slightly off-spec, but free from antd! And it looks nice :)
    const onClickDelete = () => {
        confirm({
            title: "Are you sure you want to delete this project?",
            icon: <ExclamationCircleFilled />,
            content: "This action can\t be undone.",
            okText: "Yes",
            okType: "primary",
            cancelText: "No",
            onOk() {
                deleteProject();
            },
        });
    };

    // TODO: this could go into some reusable utils
    // NOTE: adding seconds because for testing it's just a bunch of the same time
    const formattedCreationTime = dayjs(project.creationTime).format(
        "MMM D, YYYY  h:mm:ssa"
    );

    return (
        <>
            <ProjectRowLayout
                project={project}
                saveProject={editProject}
                middleComponent={
                    <div className="projectCreationTime">
                        {formattedCreationTime}
                    </div>
                }
                rightComponent={
                    <IconButton
                        iconForDefault={DeleteIcon}
                        iconForHover={DeleteIconHover}
                        onClick={onClickDelete}
                    />
                }
            />
        </>
    );
};

export default ProjectPreview;
