import React, {useState} from 'react';
import { useTodosDispatch } from '../contexts/TodosProvider';

function TodoForm() {
  const [value, setValue] = useState('');
  const dispatch = useTodosDispatch();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Todo : create new todo
    dispatch({
      type: 'CREATE',
      text: value,
    });
    setValue('');
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        value={value}
        placeholder="무엇을 하실 건가요?"
        onChange={e => setValue(e.target.value)}
      />
      <button>등록</button>
    </form>
  )
}

export default TodoForm;