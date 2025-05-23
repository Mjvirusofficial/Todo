
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [Todos, setTodos] = useState([]);
  const [NewTodo, setNewTodo] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');
    const [newEditIndex, setnewEditIndex] = useState(null);


  const BASE_URL = 'http://localhost:5000/tododb/';


  const fetchTodo = async () => {
    const fetch = await axios.get(BASE_URL)
    const fetchTodoArray = []

    fetch.data.map((i) => {
      fetchTodoArray.push(i)
    })

    setTodos(fetchTodoArray)
  }
  useEffect(() => {
    fetchTodo()
  }, [])

  const addTodo = async () => {
    await axios.post(BASE_URL, { data: NewTodo.trim() })
    setNewTodo('')
    fetchTodo()

  }

  const deleteTodo = async (id) => {
    await axios.delete(BASE_URL + id)
    fetchTodo()
  }



  function edit(id) {
    setEditIndex(id)
    const edit = [...Todos]
    setEditText(edit[id].data)
    console.log(edit[id]._id)
    setnewEditIndex(edit[id]._id)

  }


  const updateTodo = async (_,editText) => {
    await axios.put(BASE_URL + newEditIndex, { data: editText.trim() })
    setEditIndex(null)
    setEditText('')
    fetchTodo()
    setnewEditIndex(null)
  }

 
// function addSomething(){

// }


  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-300 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-2xl p-6">
        <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-6">🌟 Stylish Todo App</h1>

        <div className="flex items-center gap-4 mb-6">
          <input
            value={NewTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-1 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="📝 Add your new todo..."
            type="text"
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md transition duration-200"
          >
            Add
          </button>
        </div>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">🗂️ Your Todo List</h2>
        
        <ul className="space-y-3">
          {
            Todos.length == 0 ? 
                        <li className="flex items-center justify-between bg-gray-100 rounded-lg p-3 shadow-sm">No record add something 😉
                         {/* <button
                    onClick={() => addSomething()}
                    className="cursor-pointer px-3 py-1 bg-green-500 text-white rounded-md hover:bg-red-600"
                  >
                    Add Something 😉
                  </button> */}
                        </li>
            :

            
            Todos.map((item, id) => (
            <li key={id} className="flex items-center justify-between bg-gray-100 rounded-lg p-3 shadow-sm">
              {editIndex === id ? (
                <>
                  <input
                    type="text"
                    value={editText}

                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 p-2 border rounded-md mr-2 focus:outline-none"
                  />
                  <button
                    onClick={() => updateTodo(id, editText)}
                    className="cursor-pointer px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditIndex(null)}
                    className=" cursor-pointer px-3 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1 text-gray-800 font-medium">{item.data}</span>
                  <button
                    onClick={() => edit(id)}
                    className="cursor-pointer px-3 py-1 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(item._id)}
                    className="cursor-pointer px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>

                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
