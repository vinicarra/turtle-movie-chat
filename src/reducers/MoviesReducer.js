import * as Types from '../actions/types';

const INITIAL_STATE = {
    // Movies
    movies: [],
    fetchingMovies: false,
    fetchMoviesError: null,
    // Comments
    comments: [],
    fetchingComments: false,
    fetchCommentsError: null,
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
        case Types.FETCH_COMMENTS: {
            return { ...state, fetchingComments: true };
        }
        case Types.FETCH_COMMENTS_SUCCEEDED: {
            return { ...state, fetchingComments: false, comments: action.payload };
        }
        case Types.FETCH_COMMENTS_FAILED: {
            return { ...state, fetchingComments: false, fetchCommentsError: action.payload };
        }
        default: {
            return state;
        }
    }
}
