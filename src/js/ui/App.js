import { useCallback, useState } from "react";

import ProjectAddRow from "./ProjectAddRow";
import FloatingActionButton from "./components/FloatingActionButton";
import Header from "./Header";
import ProjectList from "./ProjectList";

/**
 * App keeps the main project list data & state such that we can pass it to any
 * of the children that need to use and update them. We could improve this by
 * adding ReactContext so we don't have to pass this around and instead all of
 * the children can have access to these actions if they want.
 *
 * The return should be kept pretty clean: a layout of what the page looks like
 * In this case:
 * - Header
 * - Floating Action Button (to Add Project)
 * - Add Project Form [if showing]
 * - List of projects
 */
const App = () => {
    const [isAddProjectShowing, setIsAddProjectShowing] = useState(false);
    const [projectList, setProjectList] = useState([]);

    // Methods for UI to create project
    // NOTE: (don't just toggle as + button should only make true)
    const onClickAddProject = useCallback(() => {
        setIsAddProjectShowing(true);
    }, []);
    const onClickCancelProject = useCallback(() => {
        setIsAddProjectShowing(false);
    }, []);

    // Methods to update the project list. NOTE: make sure to be cloning
    // so that the state update gets correctly checked and things rerender.
    // TODO: could add immutability-helper for better state handling!
    const saveNewProject = useCallback(
        (newProject) => {
            setProjectList([newProject].concat(projectList));
            setIsAddProjectShowing(false);
        },
        [projectList]
    );

    const editProjectAtIdx = useCallback(
        (atIdx, project, name) => {
            const newList = [...projectList];
            newList[atIdx].name = name;
            setProjectList(newList);
        },
        [projectList]
    );

    const deleteProjectAtIdx = useCallback(
        (atIdx, project) => {
            const newList = projectList.filter((project, idx) => {
                return idx !== atIdx;
            });
            setProjectList(newList);
        },
        [projectList]
    );

    const moveProjectRow = useCallback(
        (fromIndex, toIndex, projectID) => {
            // First take out the item we're moving
            let newList = [...projectList];
            const movingItem = newList.splice(fromIndex, 1);
            // Then combine [0:to] + movedItem + [to:last]
            newList = newList
                .slice(0, toIndex)
                .concat(movingItem)
                .concat(newList.slice(toIndex));
            setProjectList(newList);
        },
        [projectList]
    );

    return (
        <div>
            <Header />
            <div className="pageContent">
                <FloatingActionButton onClick={onClickAddProject} />
                {isAddProjectShowing && (
                    <ProjectAddRow
                        key="row_add_project"
                        onCancel={onClickCancelProject}
                        saveNewProject={saveNewProject}
                    />
                )}
                <ProjectList
                    deleteProjectAtIdx={deleteProjectAtIdx}
                    editProjectAtIdx={editProjectAtIdx}
                    moveProjectRow={moveProjectRow}
                    projectList={projectList}
                />
            </div>
        </div>
    );
};

export default App;
