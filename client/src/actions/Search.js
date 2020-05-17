import axios from 'axios';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';
import { SET_SEARCH_LIST, ADD_SEARCH, SET_TOP_TEN } from './types';

export const findBestResults = (value) => dispatch => {
    value == "" || value == null || value == " " ?

        dispatch({
            type: SET_SEARCH_LIST,
            payload: []
        })
        :
        axios.post('https://itunes.apple.com/search?term=' + value + '&limit=25')
            .then(res =>
                dispatch({
                    type: SET_SEARCH_LIST,
                    payload: res.data.results
                }))
            .catch(err => {

            });
}


export const addToTopSearches = (value, user) => dispatch => {
    console.log(value)
    axios.post('/api/users/addSearch', { value, user })
}

export const getFavorite = (user) => dispatch => {
    axios.post('/api/users/getTopTen', { user }).then(res =>
        dispatch({
            type: SET_TOP_TEN,
            payload: res.data
        }))
        .catch(err => {

        });
}

