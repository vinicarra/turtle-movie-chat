import { takeLatest, call, put } from 'redux-saga/effects';
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
        const movieTitle = payload.toLowerCase().replace(/\s/g, '');
        const ref = firebase.firestore().collection('movies').doc(movieTitle);
        const res = yield call([ref, 'get']);
        yield put({ type: Types.FETCH_COMMENTS_SUCCEEDED, payload: res.data().comments });
    } catch (err) {
        yield put({ type: Types.FETCH_COMMENTS_FAILED, payload: 'Could not fetch comments' });
    }
}

export function* watchFetchComments() {
    yield takeLatest(Types.FETCH_COMMENTS, fetchComments);
}
