import React, {createContext, Dispatch, useReducer, useContext} from 'react';

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type TodosState = Todo[];

const TodosStateContext = createContext<TodosState | undefined>(undefined);

// 액션을 위한 타입 설정하기
type Action = 
  | {type: 'CREATE'; text: string}
  | {type: 'TOGGLE'; id: number}
  | {type: 'REMOVE'; id: number};

type TodosDispatch = Dispatch<Action>;
const TodosDispatchContext = createContext<TodosDispatch | undefined>(undefined);

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

export function TodosContextProvider({children}: {children: React.ReactNode}){
  const [todos, dispatch] = useReducer(todosReducer, [
    {
      id: 1,
      text: 'Context API learning',
      done: true
    },
    {
      id: 2,
      text: 'Typescript learning',
      done: true
    },
    {
      id: 3,
      text: 'using Typescript and Context API',
      done: false,
    }
  ]);

  return (
    <TodosDispatchContext.Provider value={dispatch}>
      <TodosStateContext.Provider value={todos}>
        {children}
      </TodosStateContext.Provider>
    </TodosDispatchContext.Provider>
  )
}

export function useTodosState() {
  const state = useContext(TodosStateContext);
  if(!state) throw new Error('TodosProvider not found');
  return state;
}

export function useTodosDispatch(){
  const dispatch = useContext(TodosDispatchContext);
  if(!dispatch) throw new Error('TodosProvider not found');
  return dispatch;
}