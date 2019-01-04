import { takeLatest, call, put } from 'redux-saga/effects';
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
