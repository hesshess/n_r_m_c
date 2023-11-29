import { useRecoilState, useRecoilValue } from 'recoil';
import { Category, categoryState, customState, toDoSelector } from '../atom';
import CreateTodo from './CreateTodo';
import Todo from './Todo';

export default function TodoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const customcate = useRecoilValue(customState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  console.log(customcate);
  return (
    <>
      <h1>To Do List</h1>
      <hr />
      {Object.keys(customcate).map((v) => (
        <div>
          <label>{v}</label>
          <select key={v}></select>
        </div>
      ))}
      <select value={category} onInput={onInput}>
        <option value={Category.TODO}>To Do</option>
        <option value={Category.DOING}>Doing</option>
        <option value={Category.DONE}>Done</option>
      </select>
      <CreateTodo />
      <ul>
        {toDos?.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  );
}
