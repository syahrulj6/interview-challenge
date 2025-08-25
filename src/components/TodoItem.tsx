import { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className={`flex items-center p-4 rounded-lg border border-neutral-700 transition-all ${todo.completed ? 'bg-neutral-700/50' : 'bg-neutral-800 hover:bg-neutral-750'}`}>
      <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} className="h-5 w-5 rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
      <div className="ml-4 flex-1">
        <h3 className={`font-medium ${todo.completed ? 'line-through text-neutral-500' : 'text-white'}`}>{todo.title}</h3>
        {todo.body && <p className="text-sm text-neutral-400 mt-1">{todo.body}</p>}
      </div>
      <button onClick={() => onDelete(todo.id)} className="ml-4 p-2 text-neutral-400 cursor-pointer hover:text-red-400 rounded-full hover:bg-neutral-700 transition-colors" aria-label="Delete todo">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}
