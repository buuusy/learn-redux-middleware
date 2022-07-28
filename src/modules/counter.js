import { createAction, handleActions } from 'redux-actions';

//액션타입
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

//액션 생성 함수
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

//thunk 함수
//increaseAsync와 decreaseAsync라는 thunk 함수를 만들었습니다. 이
//비동기: 1초 뒤에 increase 혹은 decrease 함수를 디스패치함
export const increaseAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(increase());
  }, 1000);
};

export const decreaseAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(decrease());
  }, 1000);
};

//초기값
const initialState = 0; // 상태는 꼭 객체일 필요가 없다.

//리듀서
const counter = handleActions(
  {
    [INCREASE]: (state) => state + 1,
    [DECREASE]: (state) => state - 1,
  },
  initialState
);

export default counter;
