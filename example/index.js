import React from 'react';
import ReactDOM from 'react-dom';
import BasicExample from './basic';
import Transition from './transition';

ReactDOM.render(
    <div>
        <h1>react-focus-component</h1>
        <h2>Basic Example</h2>
        <BasicExample />
        <h2>Transition between 2 focus points</h2>
        <Transition />
    </div>,
    document.getElementById('root')
);