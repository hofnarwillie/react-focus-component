import React from 'react';
import ReactDOM from 'react-dom';
import FocusBlock from '../src/index';

const BasicExample = () => (
    <div>
        <p>As a site administrator,</p> 
        <FocusBlock><p>I want this component to be visibly brought to the user's attention</p></FocusBlock>
        <p>When the user clicks this <button type="button">button</button></p>
        <p>So that they can be guided through my website's complex features.</p>
    </div>
);

export default BasicExample;