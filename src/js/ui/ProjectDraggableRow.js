import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { DraggableTypes } from "../enums/DraggableTypes";
import ProjectPreview from "./ProjectPreview";

/**
 * This handles only the drag/drop reorder behavior using the react-dnd library
 * DND handles a lot of would-be browser issues and quirks and gives us a simpler API.
 * This doesn't handle any layout. For layout, see the child, ProjectPreview.
 *
 * TODO: Right now, when you start/end dragging, the row ghost "comes from" the
 * top of the screen, which looks weird. Reordering still works fine, but is
 * unideal visually and probably requires some deeper react-dnd docs/code diving
 */
const ProjectDraggableRow = ({
    canDrag,
    currentIdx,
    project,
    deleteProject,
    editProject,
    moveProjectRow,
}) => {
    const ref = useRef(null);

    // 1. Handle the item as a space where items can be dropped
    // NOTE: if we wanted to cancel the drop if it was outside the list,
    // move the handling to endDrag() instead See:
    // https://react-dnd.github.io/react-dnd/examples/sortable/cancel-on-drop-outside
    const [{ handlerId }, drop] = useDrop({
        accept: DraggableTypes.PROJECT_ROW,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) return;

            const fromIdx = item.currentIdx;
            const toIdx = currentIdx;
            // 1. Don't replace items with themselves
            if (fromIdx === toIdx) return;

            // 2. Calculate the mouse position vs. dragging area and whether
            // this counts as passing the row
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // The midpoint of the row is the threshold for dragging
            const hoverMidThreshold =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientMouseRelPos = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientMouseRelPos.y - hoverBoundingRect.top;

            // 3. Exit early if haven't crossed half of the item's height
            // Dragging downwards, cursor must be below 50%; Upwards: above 50%
            if (fromIdx < toIdx && hoverClientY < hoverMidThreshold) return;
            if (fromIdx > toIdx && hoverClientY > hoverMidThreshold) return;

            moveProjectRow(fromIdx, toIdx, item.id);
            // NOTE: (from dnd docs) "we're mutating the monitor item here!
            // Generallyit's better to avoid mutations, but it's good here for
            // the sake of performance to avoid expensive index searches."
            item.currentIdx = toIdx;
        },
    });

    // 2. Handle the item as one that can be dragged
    const [{ isDragging }, drag] = useDrag({
        type: DraggableTypes.PROJECT_ROW, // the type that can drag
        item: () => {
            return { id: project.id, currentIdx };
        },
        // monitor if dragging, to hide that row
        collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    });
    if (canDrag) {
        drag(drop(ref));
    }

    return (
        <div
            ref={ref}
            className={isDragging ? "projectBeingDragged" : null}
            data-handler-id={handlerId}
        >
            <ProjectPreview
                canDrag={canDrag}
                project={project}
                key={project.id}
                deleteProject={deleteProject}
                editProject={editProject}
            />
        </div>
    );
};

export default ProjectDraggableRow;
