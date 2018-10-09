import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  updateJsCode,
  updateXmlCode,
  changeExecutionState,
  changeName,
  changeId,
  fetchProgram,
  EXECUTION_RUN,
} from '../code';


describe('Code actions', () => {
  test('updateJsCode', () => {
    const action = updateJsCode('test code');
    const { type, payload } = action;

    expect(type).toEqual('UPDATE_JSCODE');
    expect(payload).toEqual('test code');
  });

  test('updateXmlCode', () => {
    const action = updateXmlCode('test code');
    const { type, payload } = action;

    expect(type).toEqual('UPDATE_XMLCODE');
    expect(payload).toEqual('test code');
  });

  test('changeExecutionState', () => {
    const action = changeExecutionState(EXECUTION_RUN);
    const { type, payload } = action;

    expect(type).toEqual('CHANGE_EXECUTION_STATE');
    expect(payload).toEqual(EXECUTION_RUN);
  });

  test('changeName', () => {
    const action = changeName('test name');
    const { type, payload } = action;

    expect(type).toEqual('CHANGE_NAME');
    expect(payload).toEqual('test name');
  });

  test('changeId', () => {
    const action = changeId(123);
    const { type, payload } = action;

    expect(type).toEqual('CHANGE_ID');
    expect(payload).toEqual(123);
  });

  test('fetch program', async () => {
    const mock = new MockAdapter(axios);
    const program = {
      id: 1,
      name: 'mybd',
      content: '<xml></xml>',
      user: 1,
    };

    mock.onGet('/api/v1/block-diagrams/1/').reply(200, program);

    const action = fetchProgram(1);
    const { type } = action;
    const payload = await action.payload;

    expect(type).toEqual('FETCH_PROGRAM');
    expect(payload).toEqual(program);
    mock.restore();
  });
});
