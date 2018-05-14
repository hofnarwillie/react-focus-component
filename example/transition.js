import React from 'react';
import ReactDOM from 'react-dom';
import { FocusOverlay } from '../src';

class Transition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focusComponent: null
        };

        this.component1 = React.createRef();
        this.component2 = React.createRef();
        this.setActiveHighlight = this.setActiveHighlight.bind(this);
    }

    setActiveHighlight(focusComponent) {
        this.setState({
            focusComponent: focusComponent
        });
    }

    render() {
        return (
            <div>
                <p>GIVEN I <strong>want to transition between 2 highlighted components</strong>,</p>
                <p>WHEN I click this <button type="button" onClick={() => this.setActiveHighlight(this.component1)}>button</button></p>
                <div ref={this.component1}>
                    <p>THEN I want this component to be visibly brought to the user's attention</p>
                    <p>WHEN I click <em>this</em> <button type="button" onClick={() => this.setActiveHighlight(this.component2)}>button</button></p>
                </div>

                <div ref={this.component2}>
                    <p>THEN <em>this</em> component should be highlighted.</p>
                    <p>WHEN I click <em>this</em> <button type="button" onClick={() => this.setActiveHighlight(this.component1)}>button</button></p>
                </div>

                <FocusOverlay focusComponent={this.state.focusComponent} onExit={() => this.setActiveHighlight(null)} />
            </div>
        );
    }
}

export default Transition;