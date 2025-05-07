export const initialStore = () => {
  return {
   
  };
};

// aqui mas o menos iria tu flux
export default function storeReducer(store, action = {}) {
  switch (action.type) {
    
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
