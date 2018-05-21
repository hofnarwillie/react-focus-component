import React from 'react';
import { FocusOverlay } from '../src';

const styles = {
    color: '#fff'
};

class ChildrenExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focusComponent: null
        };

        this.component = React.createRef();
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
                <p>GIVEN I <strong>want to render something on top of the Overlay</strong>,</p>
                <p>WHEN I click this <button type="button" onClick={() => this.setActiveHighlight(this.component)}>button</button></p>
                <div ref={this.component}>
                    <p>THEN I want this component to be visibly brought to the user's attention</p>
                </div>

                <FocusOverlay focusComponent={this.state.focusComponent} onExit={() => this.setActiveHighlight(null)}>
                    <p style={styles}>AND I want this content to be placed above the overlay</p>
                </FocusOverlay>
            </div>
        );
    }
}

export default ChildrenExample;