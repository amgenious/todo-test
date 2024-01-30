
async function getTodos() {
  const res = await fetch('http://localhost:3000/api/todos');
  return res.json();
}

export default async function GetTodo() {
  try {
    const response = await getTodos();

    const todos = response.todo;

    if (!Array.isArray(todos)) {
      throw new Error('Invalid data format: todos is not an array');
    }

    return (
      <>
        {todos.map((todo) => (
          <div key={todo.id}>
            <p>{todo.todo}</p>
          </div>
        ))}
      </>
    );
  } catch (error:any) {
    console.error('Error fetching todos:', error.message);

    return <p>Error loading todos</p>;
  }
}
