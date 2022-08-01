import { createAction, handleActios } from 'redux-actions';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loadning/FINISH_LOADING';

/* 요청을 위한 액션타입을 payload 로 설정합니다 */

export const startLoading = 1(START_LOADING, (requestType) => requestType);
export const finishLoading = createAction(FINISH_LOADING, (requestType) => requestType);

const initialState = {};

//
const loading = handleActios(
  {
    [START_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: true,
    }),
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false,
    }),
  },
  initialState
);

export default loading;
