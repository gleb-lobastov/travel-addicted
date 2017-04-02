/* global describe it */

import { expect } from 'chai';
import idGenerator from './idGenerator';

const KEY = Symbol('KEY');

describe('idGenerator', () => {
  it('should produce different output value on each invoke', () => {
    expect(idGenerator(KEY)).not.to.equal(idGenerator(KEY));
  });

  // Use strings, because numbers transformed to it in object keys and Symbols is not serializable
  it('should produce strings', () => {
    expect(idGenerator(KEY)).to.be.a('string');
  });
});
