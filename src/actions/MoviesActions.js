import * as Types from './types';

export const fetchMovies = () => ({
    type: Types.FETCH_MOVIES,
});

export const fetchComments = ({ title }) => ({
    type: Types.FETCH_COMMENTS,
    payload: title,
})
