import {createContext, Dispatch} from 'react';

// 나중에 다른 컴포넌트에서 타입을 불러와서 쓸 수 있도록 내보내기
export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type TodosState = Todo[];

const TodoStateContext = createContext<TodosState | undefined>(undefined);

// 액션을 위한 타입 설정하기
type Action = 
  | {type: 'CREATE'; text: string}
  | {type: 'TOGGLE'; id: number}
  | {type: 'REMOVE'; id: number};

type TodosDispatch = Dispatch<Action>;
const TodoDispatchContext = createContext<TodosDispatch | undefined>(undefined);

function todosReducer(state: TodosState, action: Action): TodosState {
  switch (action.type) {
    case 'CREATE':
      const nextId = Math.max(...state.map(todo => todo.id)) + 1;
      return state.concat({
        id: nextId,
        text: action.text,
        done: false
      });
    case 'TOGGLE':
      return state.map(todo =>
          todo.id === action.id ? {...todo, done: !todo.done}: todo  
        );
    case 'REMOVE':
      return state.filter(todo => todo.id !== action.id);
    default:
      throw new Error('Unhandled action');
  }
}

