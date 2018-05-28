import React from 'react';
import ReactDOM from 'react-dom';
import BasicExample from './basic';
import Transition from './transition';
import ChildrenExample from './children';
import Multiple from './multiple';
import CustomExample from './custom';

const styles = {
    main: {
        border: '1px solid #eee',
        margin: '10% 15%',
        padding: '2em',
        boxShadow: '1px 1px 5px #333',
        fontFamily: 'monospace'
    },
    footer: {
        textAlign: 'center',
        marginTop: '4em',
        fontStyle: 'italic'
    }
};

ReactDOM.render(
    <div style={styles.main}>
        <h1>Examples for react-focus-component</h1>

        <p>More details on <a href="https://www.npmjs.com/package/react-focus-component">https://www.npmjs.com/package/react-focus-component</a>. Please contribute <a href="https://github.com/hofnarwillie/react-focus-component">on github</a>.</p>

        <p>A react component that brings other components into visual focus/highlight by placing an overlay over all other elements on the page.</p>

        <hr />

        <h2>Example 1: Basic usage</h2>
        <BasicExample />

        <hr />

        <h2>Example 2: Transition between 2 focus points</h2>
        <Transition />

        <hr />

        <h2>Example 3: Layering children above the overlay</h2>
        <ChildrenExample />

        <hr />

        <h2>Example 4: Spanning the highlight over multiple refs</h2>
        <Multiple />

        <hr />

        <h2>Example 5: Customise the focus coordinates</h2>
        <CustomExample />

        <hr />

        <p style={styles.footer}>
            Developed by<br/>
            Willem Le Roux a.k.a <a href="https://github.com/hofnarwillie">hofnarwillie</a><br /><br />
            <img src="https://avatars1.githubusercontent.com/u/8123799?s=100&v=4" />
        </p>
    </div>,
    document.getElementById('root')
);