import { connect } from 'react-redux';
import { increaseAsync, decreaseAsync } from '../modules/counter';
import Counter from '../components/Counter';

const CounterContainer = ({ number, increaseAsync, decreaseAsync }) => {
  return <Counter number={number} onIncrease={increaseAsync} onDecrease={decreaseAsync} />;
};

export default connect(
  // store에서 state를 받아오는 함수
  (state) => ({
    number: state.counter,
  }),
  {
    // 액션함수를 가져오는 함수
    increaseAsync,
    decreaseAsync,
  }
)(CounterContainer);
