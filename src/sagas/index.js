import { all } from 'redux-saga/effects';

import { watchFetchMovies, watchFetchComments } from './MoviesSagas';

export default function* rootSaga() {
    yield all([
        watchFetchMovies(),
        watchFetchComments(),
    ]);
}