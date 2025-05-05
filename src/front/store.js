export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      },
    ],
    planets: [
      {
        uid: "1",
        name: "Tatooine",
        url: "https://www.swapi.tech/api/planets/1",
      },
      {
        uid: "2",
        name: "Alderaan",
        url: "https://www.swapi.tech/api/planets/2",
      },
      {
        uid: "3",
        name: "Yavin IV",
        url: "https://www.swapi.tech/api/planets/3",
      },
      { uid: "4", name: "Hoth", url: "https://www.swapi.tech/api/planets/4" },
      {
        uid: "5",
        name: "Dagobah",
        url: "https://www.swapi.tech/api/planets/5",
      },
      { uid: "6", name: "Bespin", url: "https://www.swapi.tech/api/planets/6" },
      { uid: "7", name: "Endor", url: "https://www.swapi.tech/api/planets/7" },
      { uid: "8", name: "Naboo", url: "https://www.swapi.tech/api/planets/8" },
      {
        uid: "9",
        name: "Coruscant",
        url: "https://www.swapi.tech/api/planets/9",
      },
      {
        uid: "10",
        name: "Kamino",
        url: "https://www.swapi.tech/api/planets/10",
      },
    ],
  };
};

// aqui mas o menos iria tu flux
export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    case "add_task":
      const { id, color } = action.payload;

      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };

    case "login":
      return {
        ...store,
        token: action.payload.token,
        user: action.payload.user,
      };
    case "logout":
      return {
        ...store,
        token: null,
        user: null,
      };
    default:
      throw Error("Unknown action.");
  }
}
