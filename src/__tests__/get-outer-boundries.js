
import { assert } from 'chai';
import getOuterBoundries from '../get-outer-boundries';


describe('get-outer-boundries.js', () => {

    describe('is stable', () => {
        const emptyResult = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
        it('on null', () => {
            assert.deepEqual(getOuterBoundries(null), emptyResult);
        });

        it('on undefined', () => {
            assert.deepEqual(getOuterBoundries(), emptyResult);
        });
    });

    describe('single component', () => {
        it('gets the bounding box', () => {
            const boundries = {
                width: 100,
                height: 50,
                x: 10,
                y: 20
            };
            const result = getOuterBoundries({
                getBoundingClientRect: () => boundries
            });
            assert.deepEqual(result, boundries);
        });
    });

    describe('multiple components', () => {
        it('gets the outer bounding box', () => {
            const boundries1 = {
                width: 100,
                height: 50,
                x: 10,
                y: 20
            };
            const boundries2 = {
                width: 150,
                height: 100,
                x: 120,
                y: 80
            };
            const result = getOuterBoundries([
                {
                    getBoundingClientRect: () => boundries1
                },
                {
                    getBoundingClientRect: () => boundries2
                }
            ]);
            assert.deepEqual(result, {
                width: 260,
                height: 160,
                x: 10,
                y: 20
            });
        });
    });

});