export default function BookReducer(state: any, action: any) {
  switch (action.type) {
    case "add-book":
      return { ...state, books: [...state.books, action.payload] };
    case "delete-book":
      return {
        ...state,
        books: state.books.filter((book: any) => book.id !== action.payload),
      };
    case "register-user":
      return { ...state, users: [...state.users, action.payload] };
    case "login-user":
      return { ...state, activeUser: action.payload };
    case "logout-user":
      return { ...state, activeUser: null };
    default:
      return state;
  }
}
