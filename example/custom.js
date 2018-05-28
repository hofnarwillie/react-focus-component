import React from 'react';
import { FocusOverlay } from '../src';

class CustomExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focusComponentCoords: null
        };

        this.component = React.createRef();
        this.setActiveHighlight = this.setActiveHighlight.bind(this);
    }

    setActiveHighlight(focusComponent) {
        let coords;
        if (focusComponent) {
            coords = focusComponent.getBoundingClientRect();
            coords.width = coords.width / 2;
        }
        this.setState({
            focusComponentCoords: coords
        });
    }

    render() {
        return (
            <div>
                <p>GIVEN I <strong>want to highlight custom coordinates</strong>,</p>
                <p>WHEN I click this <button type="button" onClick={() => this.setActiveHighlight(this.component.current)}>button</button></p>
                <div ref={this.component}>
                    <p>THEN I want half of this component to be visibly brought to the user's attention</p>
                </div>

                <FocusOverlay focusComponent={this.state.focusComponentCoords} onExit={() => this.setActiveHighlight(null)} />
            </div>
        );
    }
}

export default CustomExample;