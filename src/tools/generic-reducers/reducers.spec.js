/* global describe it */
/* eslint no-underscore-dangle: ["error", { "allow": ["__get__"] }] */

import { expect } from 'chai';
import { upsert, update, insert, remove, sync, breakRelation } from './reducers';

// consts for upsert, insert, update, remove testing
const id = Symbol('id');
const alternateId = Symbol('alternateId');

const originalValue = Symbol('originalValue');
const alternateValue = Symbol('alternateValue');
const updatedValue = Symbol('updatedValue');

const originalData = { property1: originalValue };
const alternateData = { property2: alternateValue };
const payload = { property1: updatedValue };
const action = { id, payload };
const removeAction = { id };

const emptyState = {};
const originalState = { [id]: originalData };
const alternateState = { [alternateId]: alternateData };
const updatedState = { [id]: payload };
const extendedState = { [id]: { ...originalData, ...alternateData } };
const extendedUpdatedState = { [id]: { ...payload, ...alternateData } };

// consts for sync, breakRelation
const containerId = Symbol('containerId');
const containedId = Symbol('containedId');
const containerFieldName = ('containerFieldName');
const containedFieldNamePlural = ('containedFieldNamePlural');

// Here state is out of scope. Only relations is considered
// backgroundPayload and backgroundData is irrelevant to relations,
// first simulated contained objects state modifications, second simulate container state.
const backgroundPayload = payload;
const backgroundData = alternateData;
const emptyContainerData = { [containedFieldNamePlural]: [], ...backgroundData };
const syncedContainerData = { [containedFieldNamePlural]: [containedId], ...backgroundData };
const payloadWithRelation = { [containerFieldName]: containerId, ...backgroundPayload };
const syncAction = { id: containedId, payload: payloadWithRelation };
const breakRelationAction = { id: containedId };

const emptyContainerState = { [containerId]: emptyContainerData };
const syncedContainerState = { [containerId]: syncedContainerData };


describe('Reducers', () => {
  describe('Upsert', () => {
    it('should insert payload as item into state. Item key equals to action id', () => {
      expect(
        upsert(emptyState, action),
      ).to.deep.equal(updatedState);
    });

    it('should update state item by payload. State key equals to action id', () => {
      expect(
        upsert(originalState, action),
      ).to.deep.equal(updatedState);
    });

    it('should throw an error if payload is not provided', () => {
      expect(
        () => upsert(emptyState, { id }),
      ).to.throw(Error, 'Could not upsert an item. Payload is not specified');
    });
  });


  describe('Insert', () => {
    it('should insert payload as item into state. Item key should be equal to action id', () => {
      expect(
        insert(emptyState, action),
      ).to.deep.equal(updatedState);
    });

    it('should throw an error if action id is already present in state keys', () => {
      expect(
        () => insert(updatedState, action),
      ).to.throw(Error, 'Could not insert an item. There is already exist an item with same id');
    });
  });


  describe('Update', () => {
    it('should update state item properties by payload properties', () => {
      expect(
        update({ ...originalState, ...alternateState }, action),
      ).to.deep.equal({ ...updatedState, ...alternateState });
    });

    it('should retain state item properties which is not overridden by payload properties', () => {
      expect(
        update(extendedState, action),
      ).to.deep.equal(extendedUpdatedState);
    });

    it('should throw an error if item with corresponding id is not present in the state', () => {
      expect(
        () => update(emptyState, action),
      ).to.throw(Error, 'Could not update nonexistent item. Id is not present in state keys');
    });
  });

  describe('Remove', () => {
    it('should remove item with corresponding id from state', () => {
      expect(
        remove(originalState, removeAction),
      ).to.deep.equal(emptyState);
    });

    it('should ignore action if item with corresponding id is not present in the state', () => {
      expect(
        () => remove(emptyState, removeAction),
      ).to.not.throw(Error).and.to.deep.equal(alternateState);
    });
  });

  describe('Sync', () => {
    const boundSync = sync(containerFieldName, containedFieldNamePlural);

    it('should insert containedId into reflecting container list', () => {
      expect(
        boundSync(emptyContainerState, syncAction),
      ).to.deep.equal(syncedContainerState);
    });

    it('should ignore containedId if it already present in reflecting container list', () => {
      expect(
        boundSync(syncedContainerState, syncAction),
      ).to.deep.equal(syncedContainerState);
    });

    it('should throw an error if action id is already present in state keys', () => {
      expect(
        () => boundSync(emptyContainerState, syncAction),
      ).to.throw(Error, 'Could not perform sync operation. Missing container reference in payload');
    });
  });

  describe('BreakRelation', () => {
    // noinspection JSUnresolvedFunction
    const boundBreakRelation = breakRelation(containedFieldNamePlural);

    it('should remove containedId from reflecting container list', () => {
      expect(
        boundBreakRelation(syncedContainerState, breakRelationAction),
      ).to.deep.equal(emptyContainerState);
    });

    it('should ignore action if containedId it not present in reflecting container list', () => {
      expect(
        boundBreakRelation(emptyContainerState, syncAction),
      ).to.deep.equal(emptyContainerState);
    });
  });
});
