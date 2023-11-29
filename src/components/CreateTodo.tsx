import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, customState, todoListState } from '../atom';
import { useForm } from 'react-hook-form';

interface IForm {
  todo: string;
  custom: string;
}

export default function CreateTodo() {
  const setTodolist = useSetRecoilState(todoListState);
  const setCustomCate = useSetRecoilState(customState);
  const category = useRecoilValue(categoryState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>();
  const onValid = ({ todo, custom }: IForm) => {
    setTodolist((curr_todos) => [
      ...curr_todos,
      { id: Date.now(), text: todo, category },
    ]);
    setValue('todo', '');
    setCustomCate((prev) => {
      return { ...prev, [custom]: [] };
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register('custom')} placeholder="카테고리를 추가하세요" />
        <input
          {...register('todo', { required: 'write your todo' })}
          placeholder="해야 할 일을 입력하세요"
        />
        <span>{errors?.todo?.message}</span>
        <button>등록</button>
      </form>
    </>
  );
}
