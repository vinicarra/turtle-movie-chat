import { all } from 'redux-saga/effects';

import { watchFetchMovies, watchFetchComments, watchAddComment } from './MoviesSagas';

export default function* rootSaga() {
    yield all([
        watchFetchMovies(),
        watchFetchComments(),
        watchAddComment(),
    ]);
}