import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "../SortableItem";
import { User } from "src/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCrown, faGripVertical } from "@fortawesome/free-solid-svg-icons";

import styles from "./DraggableUserList.module.css";

interface DraggableUserListProps {
  users: User[];
  onSubmitVote: (users: User[]) => void;
}

export const DraggableUserList = ({
  users,
  onSubmitVote,
}: DraggableUserListProps) => {
  const [orderedUsers, setOrderedUsers] = useState(users);

  useEffect(() => {
    setOrderedUsers(users);
  }, [users]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = orderedUsers.findIndex((u) => u.id === active.id);
      const newIndex = orderedUsers.findIndex((u) => u.id === over.id);

      const updatedUsers = [...orderedUsers];
      const [movedUser] = updatedUsers.splice(oldIndex, 1);
      updatedUsers.splice(newIndex, 0, movedUser);

      setOrderedUsers(updatedUsers);
    }
  };

  return (
    <div>
      <h2>Classez en fonction de la pimpinerie</h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={orderedUsers.map((user) => user.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className={styles.sortableList}>
            {orderedUsers.map((user) => (
              <div key={user.id} className={styles.sortableItem}>
                <p className={styles.sortableItemRank}>
                    {(() => {
                    const rank =
                      orderedUsers.findIndex((u) => u.id === user.id) + 1;
                    if (rank === 1) {
                      return <FontAwesomeIcon icon={faCrown} className={styles.iconFirst} />;
                    } else if (rank === 2) {
                      return <FontAwesomeIcon icon={faCrown} className={styles.iconSecond} />;
                    } else if (rank === 3) {
                      return <FontAwesomeIcon icon={faCrown} className={styles.iconThird} />;
                    }
                    return `${rank}.`;
                    })()}
                </p>
                <SortableItem id={user.id}>
                  {user.username}
                  <FontAwesomeIcon
                    icon={faGripVertical}
                    className={styles.dragIcon}
                  />
                </SortableItem>
              </div>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <div className={styles.buttonContainer}>
        <button onClick={() => onSubmitVote(orderedUsers)} disabled={orderedUsers.length === 0} className={styles.submitButton}>
          <FontAwesomeIcon icon={faCheck} />
        </button>
      </div>
    </div>
  );
};