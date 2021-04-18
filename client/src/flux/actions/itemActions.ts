import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { IItem } from '../../types/interfaces';

export const getItems = () => (dispatch: Function) => {
  dispatch(setItemsLoading());
  axios
    .get('/api/items')
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const editItem = (item: IItem) => (
  dispatch: Function,
  getState: Function
) => {
  axios
    .put(`/api/items/${item._id}`, item, tokenConfig(getState))
    .then(res => {
      if (res.status == 200) {
        dispatch({
          type: UPDATE_ITEM,
          payload: item
        })
      }
    }
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = (item: IItem) => (
  dispatch: Function,
  getState: Function
) => {
  axios
    .post('/api/items', item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteItem = (id: string) => (
  dispatch: Function,
  getState: Function
) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
