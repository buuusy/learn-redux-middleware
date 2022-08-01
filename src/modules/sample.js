import { createAction, handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../library/api';
import { startLoading, finishLoading } from './loading';

//액션타입 정의
//한 요청당 3개를 만들어야함.
const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';

//thunk 함수(미들웨어)생성. thunk 함수 내부에서는 시작할때, 성공했을때, 실패했을때 다른 액션을 디스패치함

export const getPost = createAction(GET_POST, (id) => id);
export const getUsers = createAction(GET_USERS);

function* getPostSaga(action) {
  yield put(startLoading(GET_POST));
  try {
    //call을 사용하면 Promise를 반환하는 함수를 호출하고, 기다릴 수 있습니다.
    //첫번째 파라미터 함수, 나머지 파라미터는 해당 함ㅅ우에 넣을 인수입니다.
    const post = yield call(api.getPost, action.payload);
    yield put({
      type: GET_POST_SUCCESS,
      payload: post.data,
    });
  } catch (e) {
    yield put({
      type: GET_POST_FAILURE,
      payload: e,
      error: true,
    });
  }
  yield put(finishLoading(GET_POST));
}

const initailaState = {
  post: null,
  users: null,
};

//리듀서
const sample = handleActions(
  {
    [GET_POST]: (state) => ({
      ...state,
      loadnig: {
        ...state.loading,
        GET_POST: true, //요청시작
      },
    }),
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loadning,
        GET_POST: false, // 요청완료
      },
      post: action.payload,
    }),
    [GET_POST_FAILURE]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false,
      },
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loadning,
        GET_USER: false, //요청완료
      },
      users: action.payload,
    }),

    [GET_USERS_FAILURE]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: false, //요청완료
      },
    }),
  },
  initailaState
);

export default sample;
