import React from 'react';

import { shallow, mount } from 'enzyme';
import { assert } from 'chai';
import sinon from 'sinon';

import { FocusOverlay } from '../index';
import { getOverlayStyles } from '../FocusOverlay';

describe('FocusOverlay', () => {

    it('renders the overlay', () => {
        const wrapper = shallow(<FocusOverlay />);
        assert(wrapper.find('[data-selector="focus-overlay"]').length === 1);
    });

    it('hides the overlay by default', () => {
        const wrapper = mount(<FocusOverlay />);
        const overlay = wrapper.find('[data-selector="focus-overlay"]').get(0);
        assert(overlay.props.style.visibility === 'hidden');
    });

});

describe('getOverlayStyles()', () => {

    it('returns no positioning data when no coordinates are passed', () => {
        const result = getOverlayStyles();
        assert.isUndefined(result.bottom.top);
        assert.isUndefined(result.bottom.left);
        assert.isUndefined(result.top.top);
        assert.isUndefined(result.top.left);
        assert.isUndefined(result.left.top);
        assert.isUndefined(result.left.left);
        assert.isUndefined(result.right.top);
        assert.isUndefined(result.right.left);
    });

    const x = 50;
    const y = 100;
    const width = 200;
    const height = 300;

    it('calculates the top of the block', () => {
        const result = getOverlayStyles(x, y, width, height);
        assert.equal(result.top.height, '100px');
    });

    it('calculates the left of the block', () => {
        const result = getOverlayStyles(x, y, width, height);
        assert.equal(result.left.width, '50px');
    });

    it('calculates the right of the block', () => {
        const result = getOverlayStyles(x, y, width, height);
        assert.equal(result.right.left, '250px');
    });

    it('calculates the bottom of the block', () => {
        const result = getOverlayStyles(x, y, width, height);
        assert.equal(result.bottom.top, '400px');
    });

});
