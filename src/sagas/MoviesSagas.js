import { takeLatest, call, put, select } from 'redux-saga/effects';
import { Toast } from 'native-base';
import firebase from 'react-native-firebase';
import * as Types from '../actions/types';

const moviesURL = 'https://tender-mclean-00a2bd.netlify.com/mobile/movies.json';

function* fetchMovies() {
    try {
        const response = yield call(fetch, moviesURL);
        const data = yield call([response, 'json']);
        yield put({ type: Types.FETCH_MOVIES_SUCCEEDED, payload: data });
    } catch (err) {
        yield put({ type: Types.FETCH_MOVIES_FAILED, payload: 'Could not fetch movies' });
    }
}

export function* watchFetchMovies() {
    yield takeLatest(Types.FETCH_MOVIES, fetchMovies);
}

function* fetchComments({ payload }) {
    try {
        // Get comments
        const movieTitle = payload.toLowerCase().replace(/\s/g, '');
        const ref = firebase.firestore().collection('movies').doc(movieTitle).collection('comments').orderBy('timestamp', 'DESC');
        const snapshot = yield call([ref, 'get']);
        // Format comments
        const comments = [];
        snapshot.forEach(doc => { comments.push(doc.data()) });
        yield put({ type: Types.FETCH_COMMENTS_SUCCEEDED, payload: comments });
    } catch (err) {
        yield put({ type: Types.FETCH_COMMENTS_FAILED, payload: 'Could not fetch comments' });
    }
}

export function* watchFetchComments() {
    yield takeLatest(Types.FETCH_COMMENTS, fetchComments);
}

function* addComment(param) {
    try {
        const { comment, title } = param.payload;

        // Get comments from state
        const { comments } = yield select(state => state.MoviesReducer);
        const commentsBuffer = comments.slice();
        
        const movieTitle = title.toLowerCase().replace(/\s/g, '');
        const ref = firebase.firestore().collection('movies').doc(movieTitle).collection('comments');
        
        const commentObj = {
            author: 'Developer account',
            comment,
            timestamp: Date.now(),
            profilePic: 'https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg',
        };
        yield call([ref, 'add'], commentObj);
        commentsBuffer.unshift(commentObj);
        yield put({ type: Types.ADD_COMMENT_SUCCEEDED, payload: commentsBuffer });
    } catch (err) {
        console.log(err.message);
        yield put({ type: Types.ADD_COMMENT_FAILED, payload: 'Could not add comment, try again.' });
        Toast.show({
            text: 'Could not add comment, try again.',
            buttonText: 'Okay',
            duration: 3000,
        });
    }
}

export function* watchAddComment() {
    yield takeLatest(Types.ADD_COMMENT, addComment);
}
