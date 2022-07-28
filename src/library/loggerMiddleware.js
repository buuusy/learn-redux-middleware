const loggerMiddleware = (store) => (next) => (action) => {
  console.group(action && action.type); // 액션타입으로 log를 그룹화함
  console.log('이전상태', store.getState());
  console.log('액션', action);
  next(action); // 다음 미들웨어 혹은 리듀서(다음미들웨어가 없다면..)에게 전달
  console.log('다음상태', store.getState()); //업데이트된상태
  console.groupEnd(); //그룹끝
};

export default loggerMiddleware;
