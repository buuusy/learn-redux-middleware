import { handleActions } from 'redux-actions';
import * as api from '../library/api';

//액션타입 정의
//한 요청당 3개를 만들어야함.
const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';

//thunk 함수(미들웨어)생성. thunk 함수 내부에서는 시작할때, 성공했을때, 실패했을때 다른 액션을 디스패치함

export const getPost = (id) => async (dispatch) => {
  dispatch({ type: GET_POST }); //요청을 시작한것을 알림
  try {
    const response = await api.getPost(id);
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: response.data,
    }); // 요청성공
  } catch (e) {
    dispatch({
      type: GET_POST_FAILURE,
      payload: e,
      error: true,
    }); //에러발생
    throw e; //나중에 컴포넌트단에서 에러를 조회할 수 있게 해 줌.
  }
};

export const getUsers = () => async (dispatch) => {
  dispatch({ type: GET_USERS }); //요청을 시작한것을 알림
  try {
    const response = await api.getUsers();
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({ type: GET_USERS_FAILURE, payload: e, error: true });
    throw e;
  }
};

const initailaState = {
  loading: {
    GET_POST: false,
    GET_USERS: false,
  },
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
