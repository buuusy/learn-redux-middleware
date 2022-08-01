import { createAction, handleActions } from 'redux-actions';
import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects';

//액션타입
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_ASYNC = 'couter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'couter/DECREASE_ASYNC';

//액션 생성 함수
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

function* increaseSage() {
  yield delay(1000); //1초를 기다림
  yield put(increase()); //특정액션을 디스패치
}

function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
}

export function* counterSaga() {
  //takeEvery는 들어오는 모든 액션에 대해 특정 작업을 처리
  yield takeEvery(INCREASE_ASYNC, increaseSage);
  //takeLatest는 기존에 진행중이던 작업이 있다면 취소처리하고 가장 마지막으로 실행된 작업만 수행합니다.
  takeLatest(DECREASE_ASYNC, decreaseSaga);
}

const initialState = 0;

const counter = handleActions(
  {
    [INCREASE]: (state) => state + 1,
    [DECREASE]: (state) => state - 1,
  },
  initialState
);

export default counter;
