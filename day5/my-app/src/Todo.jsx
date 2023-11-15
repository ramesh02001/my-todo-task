import React, { useState } from 'react';
import './Todo.css';

function Todo() {
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [myCar, setMyCar] = useState('All');

  const handleChange = (event) => {
    setMyCar(event.target.value);
  };

  const handleAddTodo = () => {
    if (!newTitle.trim() || !newDescription.trim()) {
      alert('Title and Description cannot be empty');
      return;
    }

    if (!isEditing) {
      let newTodoItem = {
        title: newTitle,
        description: newDescription,
        status: myCar,
      };

      let updatedTodoArr = [...allTodos];
      updatedTodoArr.push(newTodoItem);
      setTodos(updatedTodoArr);
      localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    } else {
      const updatedTodoArr = [...allTodos];
      updatedTodoArr[editIndex] = {
        title: newTitle,
        description: newDescription,
        status: myCar,
      };
      setTodos(updatedTodoArr);
      setIsEditing(false);
      setEditIndex(null);
      localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    }

    setNewTitle('');
    setNewDescription('');
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    setTodos(reducedTodo);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
  };

  const handleEditTodo = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    const todoToEdit = allTodos[index];
    setNewTitle(todoToEdit.title);
    setNewDescription(todoToEdit.description);
  };

  return (
    <>
      <div className="container">
        <div className="body1">
          <h1>Mytodo</h1>
          <div className="centerinput">
            <div className="todo-input-item">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Todo Name"
                id="title"
              />
            </div>
            <div className="todo-input-item">
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Todo Description"
                id="description"
              />
            </div>
           
            <div className="todo-input-item">
              <button type="button" onClick={handleAddTodo} className="primaryBtn">
                {isEditing ? 'Save' : 'Add'}
              </button>
            </div>
            <div className="select1">
              <label>Status Filter:</label>
              <select value={myCar} onChange={handleChange}>
                <option value="All">ALL</option>
                <option value="completed">Completed</option>
                <option value="non-completed">Non-completed</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    
      <div className="cardlist">
        <h5>My Todo</h5>
        <div className="container-sm">
          {allTodos.map((item, index) => (
            <div className="card" key={index}>
              <div>
                {isEditing && editIndex === index ? (
                  <div>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Edit title"
                    />
                    <input
                      type="text"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      placeholder="Edit description"
                    />
                  </div>
                ) : (
                  <div>
                    <h3>Name: {item.title}</h3>
                    <p>Description: {item.description}</p>
                    <p>Status: <span>{item.status}</span></p>

                    <div>
                      <button type="button" onClick={() => handleDeleteTodo(index)} id='del'>
                        Delete
                      </button>
                      <button type="button" onClick={() => handleEditTodo(index)} id='edit'>
                        Edit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Todo;
