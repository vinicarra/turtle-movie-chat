import { all } from 'redux-saga/effects';

import { watchFetchMovies } from './MoviesSagas';

export default function* rootSaga() {
    yield all([
        watchFetchMovies(),
    ]);
}