import { combineReducers } from "redux";
import recipesReducer from "./recipeReducer";
import commentsReducer from "./commentReducer";
import userReducer from "./userReducer";
import categoryReducer from "./categoryReducer";
import likeReducer from "./likeReducer";
import bookmarkReducer from "./bookmarkReducer";

const rootReducer = combineReducers({
  recipe: recipesReducer,
  comment: commentsReducer,
  user: userReducer,
  category: categoryReducer,
  like: likeReducer,
  bookmark: bookmarkReducer,
});

export default rootReducer;