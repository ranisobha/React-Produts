import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  UPDATE_ITEM
} from '../actions/types';
import { IAction, IItem } from '../../types/interfaces';

const initialState = {
  items: [],
  loading: false
};

interface IState {
  items: IItem[];
}

export default function(state: IState = initialState, action: IAction) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    case UPDATE_ITEM:
      return {
      items : state.items.map(e => {
        if(e._id === action.payload._id){
          e.desc = action.payload.desc;
          e.name = action.payload.name;
          e.prize = action.payload.prize;
        }
        return e;
      })
    }
    default:
      return state;
  }
}
