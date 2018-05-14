import React from 'react';

const MAX_OPACITY = 0.8;
const TRANSITION_SPEED = 0.3;

export const getOverlayStyles = (x, y, width, height) => {
    const shared = {
        position: 'absolute',
        backgroundColor: '#000',
        transition: `all ${TRANSITION_SPEED}s linear`
    };

    let styles = {
        top: {
            ...shared,
        },
        bottom: {
            ...shared,
        },
        left: {
            ...shared,
        },
        right: {
            ...shared,
        }
    };
    if (typeof x === 'number') {
        styles.top.top = '0';
        styles.top.left = '0';
        styles.top.right = '0';
        styles.top.height = `${y}px`;
        styles.bottom.top = `${y + height}px`,
        styles.bottom.bottom = '0';
        styles.bottom.left = '0';
        styles.bottom.right = '0';
        styles.left.top = `${y}px`;
        styles.left.left = '0';
        styles.left.width = `${x}px`;
        styles.left.height = `${height}px`;
        styles.right.top = `${y}px`;
        styles.right.left = `${x + width}px`;
        styles.right.right = '0';
        styles.right.height = `${height}px`;
    }
    return styles;
};

class FocusOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 0,
            visibility: 'hidden'
        };
    }

    transitionStyles(opacity, x, y, width, height) {
        let newState;

        if (x) {
            //if any coordinates have been passed then try set all the coordinates
            newState = { x, y, width, height, opacity };
        } else {
            //otherwise ignore all but opacity.
            newState = { opacity };
        }

        if (opacity === 0) {
            //if the target state is hidden, the we need to set the visibility to hidden after the opacity transition
            setTimeout(() => {
                this.setState({
                    visibility: 'hidden',
                    x: undefined, y: undefined, width: undefined, height: undefined
                });
            }, TRANSITION_SPEED * 1000);
        } else {
            newState.visibility = 'visible';
        }
        setTimeout(() => {
            this.setState(newState);
        });
    }

    tryMove(focusComponent) {
        const { x, y, width, height } = focusComponent.current.getBoundingClientRect();
        if (this.state.x !== x
            || this.state.y !== y
            || this.state.width !== width
            || this.state.height !== height
            || this.state.opacity !== MAX_OPACITY) {
            this.transitionStyles(MAX_OPACITY, x, y, width, height);
        }
    }

    render() {
        const { focusComponent, onExit } = this.props;
        let styles;
        if (!focusComponent) {
            if (this.state.opacity !== 0) {
                this.transitionStyles(0);
            }
        } else {
            this.tryMove(focusComponent);
        }

        const { x, y, width, height, opacity, visibility } = this.state;
        styles = getOverlayStyles(x, y, width, height);

        const containerStyle = {
            opacity,
            transition: `opacity ${TRANSITION_SPEED}s linear`,
            visibility
        };

        return (
            <div style={containerStyle} data-selector='focus-overlay'>
                <div style={styles.top} onClick={onExit} />
                <div style={styles.left} onClick={onExit} />
                <div style={styles.right} onClick={onExit} />
                <div style={styles.bottom} onClick={onExit} />
            </div>
        );
    }
};

export default FocusOverlay;
