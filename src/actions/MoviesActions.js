import * as Types from './types';

export const fetchMovies = () => ({
    type: Types.FETCH_MOVIES,
});

export const fetchComments = ({ title }) => ({
    type: Types.FETCH_COMMENTS,
    payload: title,
});

export const editCommentText = ({ text }) => ({
    type: Types.EDIT_COMMENT_TEXT,
    payload: text,
});

export const addComment = ({ comment, title }) => ({
    type: Types.ADD_COMMENT,
    payload: { comment, title },
});
