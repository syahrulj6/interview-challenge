import TodoItem from '@/components/TodoItem';
import { Todo } from '@/types/todo';
import { useEffect, useState } from 'react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim() === '') {
      alert('Please enter a valid todo item.');
    } else {
      setTodos((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          title: input,
          body: '',
          completed: false,
        },
      ]);
      setInput('');
    }
  }

  function handleToggle(id: number) {
    setTodos((prev) => prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)));
  }

  function handleDelete(id: number) {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 to-neutral-900 flex flex-col items-center py-8 px-4 md:py-16 md:px-12 text-white" style={{ fontFamily: poppins.style.fontFamily }}>
      <div className="w-full max-w-3xl">
        <div className="text-center mb-10 ">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-violet-600">Kelola Tugas Harian Anda</h1>
          <p className="mt-2 text-neutral-400">Tingkatkan produktivitas dengan mengatur tugas harian</p>
        </div>

        <form className="flex flex-col md:flex-row gap-3 mb-10 p-6 bg-neutral-800 rounded-xl shadow-lg" onSubmit={handleSubmit}>
          <input
            placeholder="Tambahkan tugas baru..."
            value={input}
            onChange={handleChange}
            className="flex-1 px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all text-sm md:text-base"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-violet-600 to-violet-700 text-white font-medium rounded-lg hover:from-violet-700 hover:to-violet-800 transition-all shadow-md hover:shadow-violet-900/30 cursor-pointer"
          >
            Tambah
          </button>
        </form>

        <div className="bg-neutral-800 rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-700">
            <h2 className="text-xl md:text-2xl font-semibold flex items-center">
              <span className="mr-2">Daftar Tugas</span>
              <span className="text-sm bg-violet-900/50 px-2 py-1 rounded-md">{todos.length} items</span>
            </h2>
          </div>

          <div className="p-6">
            {todos.length > 0 ? (
              <div className="space-y-4">
                {todos.map((item) => (
                  <TodoItem key={item.id} todo={item} onToggle={handleToggle} onDelete={handleDelete} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-neutral-400">
                <div className="text-5xl mb-4">📂</div>
                <p>Belum ada tugas. Yuk tambahkan tugas pertama!</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 text-center text-neutral-500 text-sm">
          <p>© {new Date().getFullYear()} Todo App - Kelola produktivitas harianmu</p>
        </div>
      </div>
    </div>
  );
}
