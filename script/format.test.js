import { test } from 'vitest';
import { strict as assert } from 'assert';
import { formatTransaction } from './format.js';

test('formatTransaction should return a string with the transaction details', () => {
  const transaction = {
    from: '0x123',
    to: '0x456',
    value: '1000000000000000000',
    gas: '21000',
    gasPrice: '20000000000',
  };

  const result = formatTransaction(transaction);

  assert.equal(
    result,
    'From: 0x123\n' +
      'To: 0x456\n' +
      'Value: 1000000000000000000\n' +
      'Gas: 21000\n' +
      'GasPrice: 20000000000',
  );
});
