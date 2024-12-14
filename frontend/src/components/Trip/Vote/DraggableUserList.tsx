import { useEffect, useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { User } from 'src/types';

interface DraggableUserListProps {
    users: User[];
    onSubmitVote: (users: User[]) => void;
}

export const DraggableUserList = ({ users, onSubmitVote }: DraggableUserListProps ) => {
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
      <h2>Selected Users</h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={orderedUsers.map((user) => user.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul>
            {orderedUsers.map((user) => (
              <SortableItem key={user.id} id={user.id}>
                {`${orderedUsers.findIndex((u) => u.id === user.id) + 1}. ${user.username}`}
              </SortableItem>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <button onClick={() => onSubmitVote(orderedUsers)}>Submit Vote</button>
    </div>
  );
};