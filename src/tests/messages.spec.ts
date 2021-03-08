import { NOT_ENOUGH_ARGS_NAMED_ERROR } from '../Messages';

test('Not enough args returns error string', () => {
  let args: string[] = ['arg1', 'arg2', 'arg3'];
  expect(NOT_ENOUGH_ARGS_NAMED_ERROR(...args)).toMatch(/(arg1|arg2|arg3|not enough arguments)/);
});
