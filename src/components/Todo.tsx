import { useSetRecoilState } from 'recoil';
import { Category, ITodo, todoListState } from '../atom';

export default function Todo({ text, category, id }: ITodo) {
  const setToDos = useSetRecoilState(todoListState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <>
      <li>
        <span>{text}</span>
        {category !== Category.DOING && (
          <button name={Category.DOING} onClick={onClick}>
            Doing
          </button>
        )}
        {category !== Category.TODO && (
          <button name={Category.TODO} onClick={onClick}>
            To Do
          </button>
        )}
        {category !== Category.DONE && (
          <button name={Category.DONE} onClick={onClick}>
            Done
          </button>
        )}
      </li>
    </>
  );
}
