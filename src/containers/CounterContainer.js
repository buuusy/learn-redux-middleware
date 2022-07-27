import { connect } from 'react-redux';
import { increase, decrease } from '../modules/counter';
import Counter from '../components/Counter';

const CounterContainer = ({ number, increase, decrease }) => {
  return <Counter number={number} onIncrease={increase} onDecrease={decrease} />;
};

export default connect(
  // store에서 state를 받아오는 함수
  (state) => ({
    number: state.counter,
  }),
  {
    // 액션함수를 가져오는 함수
    increase,
    decrease,
  }
)(CounterContainer);
