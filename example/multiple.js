import React from 'react';
import { FocusOverlay } from '../src';

class Multiple extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focusComponent: null
        };

        this.component1 = React.createRef();
        this.component2 = React.createRef();
        this.setActiveHighlight = this.setActiveHighlight.bind(this);
        this.clearActiveHighlight = this.clearActiveHighlight.bind(this);
    }

    setActiveHighlight() {
        this.setState({
            focusComponent: [this.component1, this.component2]
        });
    }

    clearActiveHighlight() {
        this.setState({
            focusComponent: null
        });
    }

    render() {
        return (
            <div>
                <p>GIVEN I <strong>want to highlight multiple items</strong>,</p>
                <p>WHEN I click this <button type="button" onClick={this.setActiveHighlight}>button</button></p>
                <div ref={this.component1}>
                    <p>THEN I want this component to be visibly brought to the user's attention</p>
                </div>
                <p><em>(Including everything in between)</em></p>
                <div ref={this.component2}>
                    <p>AND I want this component to be visibly brought to the user's attention</p>
                </div>

                <FocusOverlay focusComponent={this.state.focusComponent} onExit={this.clearActiveHighlight} />
            </div>
        );
    }
}

export default Multiple;