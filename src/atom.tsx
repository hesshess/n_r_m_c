import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export enum Category {
  'TODO' = 'TODO',
  'DOING' = 'DOING',
  'DONE' = 'DONE',
}

export interface ITodo {
  id: number;
  category: Category;
  text: string;
}
export interface ICustom {
  [key: string]: string;
}

const { persistAtom } = recoilPersist({
  key: 'todos',
  storage: localStorage,
});

export const todoListState = atom<ITodo[]>({
  key: 'TodoList',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const categoryState = atom<Category>({
  key: 'category',
  default: Category.TODO,
});

export const customState = atom<ICustom[]>({
  key: 'custom',
  default: [],
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(todoListState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
