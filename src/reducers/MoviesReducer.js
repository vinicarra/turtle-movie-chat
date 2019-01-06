import * as Types from '../actions/types';

const INITIAL_STATE = {
    // Movies
    movies: [],
    fetchingMovies: false,
    fetchMoviesError: null,
    // Comments
    comments: [],
    addingComment: false,
    addCommentError: '',
    fetchingComments: false,
    fetchCommentsError: null,
    comment: '',
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
        case Types.EDIT_COMMENT_TEXT: {
            return { ...state, comment: action.payload };
        }
        case Types.ADD_COMMENT: {
            return { ...state, addingComment: true };
        }
        case Types.ADD_COMMENT_SUCCEEDED: {
            return { ...state, addingComment: false, comments: action.payload, comment: '' };
        }
        case Types.ADD_COMMENT_FAILED: {
            return { ...state, addingComment: false, addCommentError: action.payload };
        }
        default: {
            return state;
        }
    }
}
