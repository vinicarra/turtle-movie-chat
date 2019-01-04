import * as Types from '../actions/types';

const INITIAL_STATE = {
    movies: [],
    fetchingMovies: false,
    fetchMoviesError: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.FETCH_MOVIES: {
            return { ...state, fetchingMovies: true };
        }
        case Types.FETCH_MOVIES_SUCCEEDED: {
            return { ...state, fetchingMovies: false, movies: action.payload };
        }
        case Types.FETCH_MOVIES_FAILED: {
            return { ...state, fetchingMovies: false, fetchMoviesError: action.payload };
        }
        default: {
            return state;
        }
    }
}
