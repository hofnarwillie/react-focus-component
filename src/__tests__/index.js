import React from 'react';

import { shallow } from 'enzyme';
import { assert } from 'chai';
import sinon from 'sinon';

import FocusBlock from '../index';

describe('FocusBlock', () => {

    it('renders children', () => {
        const wrapper = shallow(<FocusBlock><span>test</span></FocusBlock>);
        assert(wrapper.contains(<span>test</span>));
    });

});
