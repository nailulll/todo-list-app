const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
import Container from "./Container.js";

function App() {
  const [activity, setActivity] = React.useState("");
  const [todos, setTodos] = React.useState([]);
  const [edit, setEdit] = React.useState({});
  const [message, setMessage] = React.useState("");

  function generateId() {
    return Date.now();
  }

  function saveTodoHandler(e) {
    e.preventDefault();

    if (!activity) {
      return setMessage("Nama Aktivitas jangan kosong");
    }

    setMessage("");

    if (edit.id) {
      const updateTodo = { ...edit,
        activity
      };
      const editTodoIndex = todos.findIndex(todo => {
        return todo.id == edit.id;
      });
      const updatesTodos = [...todos];
      updatesTodos[editTodoIndex] = updateTodo;
      setTodos(updatesTodos);
      setActivity("");
      cancelTodoHandler();
      return;
    }

    setTodos([...todos, {
      id: generateId(),
      activity,
      done: false
    }]);
    setActivity("");
  }

  function removeTodoHandler(id) {
    if (confirm("Yakin ingin menghapus!")) {
      const filteredTodos = todos.filter(todo => {
        return todo.id !== id;
      });
      setTodos(filteredTodos);
      if (edit.id) cancelTodoHandler();
    }
  }

  function editTodoHandler(todo) {
    setActivity(todo.activity);
    setEdit(todo);
  }

  function cancelTodoHandler() {
    setEdit({});
    setActivity("");
  }

  function doneTodoHandler(todo) {
    const updateTodo = { ...todo,
      done: todo.done ? false : true
    };
    const editTodoIndex = todos.findIndex(currentTodo => {
      return currentTodo.id == todo.id;
    });
    const updatesTodos = [...todos];
    updatesTodos[editTodoIndex] = updateTodo;
    setTodos(updatesTodos);
  }

  return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    className: "pt-24 text-center"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-5xl font-bold text-accent"
  }, "To-Do List")), /*#__PURE__*/React.createElement("form", {
    onSubmit: saveTodoHandler,
    className: "flex justify-center py-5 gap-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Nama Kegiatan",
    className: "input input-bordered input-accent input-md w-full max-w-xs rounded-sm",
    value: activity,
    onChange: e => {
      setActivity(e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary btn-md rounded-sm"
  }, edit.id ? "Simpan Perubahan" : "Tambah"), edit.id && /*#__PURE__*/React.createElement("button", {
    onClick: cancelTodoHandler,
    className: "btn btn-secondary btn-md rounded-sm"
  }, "Batal Edit"))), message && /*#__PURE__*/React.createElement("div", {
    className: "flex justify-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-semibold badge badge-error"
  }, "Isi dulu bos...")), todos.length > 0 ? /*#__PURE__*/React.createElement("ul", null, todos.map(todo => {
    return /*#__PURE__*/React.createElement("li", {
      key: todo.id,
      className: "flex items-center justify-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between bg-neutral/20 py-5 px-10 w-1/2"
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "checkbox checkbox-primary",
      value: todo.done,
      onChange: doneTodoHandler.bind(this, todo)
    }), todo.done ? /*#__PURE__*/React.createElement("s", {
      className: "text-xl font-semibold"
    }, todo.activity) : /*#__PURE__*/React.createElement("p", {
      className: "text-xl font-semibold"
    }, todo.activity), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary btn-sm rounded-sm",
      onClick: editTodoHandler.bind(this, todo)
    }, "Edit"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-error btn-sm rounded-sm",
      onClick: removeTodoHandler.bind(this, todo.id)
    }, "Hapus"))));
  })) : /*#__PURE__*/React.createElement("div", {
    className: "flex justify-center pt-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "alert alert-info w-64 rounded-sm"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    className: "stroke-current flex-shrink-0 w-6 h-6"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  })), /*#__PURE__*/React.createElement("span", null, "Tidak ada kegiatan hari ini.")))));
}

root.render( /*#__PURE__*/React.createElement(App, null));