import React from 'react';
import { FocusOverlay } from '../src';

class BasicExample extends React.Component {
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
                <p>GIVEN I <strong>want to highlight 2 individual important components</strong>,</p>
                <p>WHEN I click this <button type="button" onClick={() => this.setActiveHighlight(this.component1.current)}>button</button></p>
                <div ref={this.component1}>
                    <p>THEN I want this component to be visibly brought to the user's attention</p>
                </div>

                <p>WHEN I click <em>this</em> <button type="button" onClick={() => this.setActiveHighlight(this.component2.current)}>button</button></p>
                <div ref={this.component2}>
                    <p>THEN <em>this</em> component should be highlighted.</p>
                </div>

                <FocusOverlay focusComponent={this.state.focusComponent} onExit={() => this.setActiveHighlight(null)} />
            </div>
        );
    }
}

export default BasicExample;