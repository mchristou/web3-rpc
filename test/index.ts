import * as web3 from '@solana/web3.js';
import { Rpc } from '../src/rpc'
import { expect } from 'chai';

describe('Unit tests', () => {
  const rpc = new Rpc('devnet');

  it('Is executable', async () => {
    let key = new web3.PublicKey('vines1vzrYbzLMRdu58ou5XTby4qAqVRLmqo36NKPTg');
    await rpc.isExecutable(key).then(res => expect(res).to.be.false);

    key = new web3.PublicKey('CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN');
    await rpc.isExecutable(key).then(res => expect(res).to.be.true);
  });

  it('Get balance', async () => {
    const key = new web3.PublicKey('83astBRguLMdt2h5U1Tpdq5tjFoJ6noeGwaY3mDLVcri');
    console.log(key.toString());
    await rpc.getBalance(key).then(res => expect(res > 0).to.be.true);
  });

  it('Get program accounts', async () => {
    const key = new web3.PublicKey('CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN');
    console.log(key.toString());
    await rpc.getProgramAccounts(key).then(res => expect(res.length > 1).to.be.true);
  });

});
