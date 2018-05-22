import React from 'react';
import PropTypes from 'prop-types'
import { isEmptyArray } from './arrays';
import getOuterBoundries from './get-outer-boundries';

const MAX_OPACITY = 0.8;
const TRANSITION_SPEED = 0.3;

export const getOverlayStyles = (x, y, width, height, animate) => {
    const shared = {
        position: 'fixed',
        backgroundColor: '#000',
        transition: animate ? `all ${TRANSITION_SPEED}s linear` : 'none'
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
        },
        topleft: {
            ...shared,
        },
        topright: {
            ...shared,
        },
        bottomleft: {
            ...shared,
        },
        bottomright: {
            ...shared,
        }
    };
    if (typeof x === 'number') {
        //left column
        styles.topleft.left = styles.left.left = styles.bottomleft.left = '0';
        styles.topleft.width = styles.left.width = styles.bottomleft.width = `${x}px`;

        //center column
        styles.top.left = styles.bottom.left = `${x}px`;
        styles.top.width = styles.bottom.width = `${width}px`;

        //right column
        styles.topright.left = styles.right.left = styles.bottomright.left = `${x + width}px`;
        styles.topright.right = styles.right.right = styles.bottomright.right = '0';

        //top row
        styles.topleft.top = styles.top.top = styles.topright.top = '0';
        styles.topleft.height = styles.top.height = styles.topright.height = `${y}px`;

        //center row
        styles.left.top = styles.right.top = `${y}px`;
        styles.left.height = styles.right.height = `${height}px`;

        //bottom row
        styles.bottomleft.top = styles.bottom.top = styles.bottomright.top = `${y + height}px`,
        styles.bottomleft.bottom = styles.bottom.bottom = styles.bottomright.bottom = '0';
    }
    return styles;
};

class FocusOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 0,
            visibility: 'hidden',
            animate: true
        };
        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    onScroll() {
        this.setState({ animate: false });
        this.tryMove(this.props.focusComponent);
        if (this.timeoutReference) {
            clearTimeout(this.timeoutReference);
        }
        this.timeoutReference = setTimeout(() => {
            this.setState({ animate: true });
        }, 70);
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
        if ((!focusComponent) || isEmptyArray(focusComponent)) {
            if (this.state.opacity !== 0) {
                this.transitionStyles(0);
            }
        } else {
            const { x, y, width, height } = getOuterBoundries(focusComponent);
            if (this.state.x !== x
                || this.state.y !== y
                || this.state.width !== width
                || this.state.height !== height
                || this.state.opacity !== MAX_OPACITY) {
                this.transitionStyles(MAX_OPACITY, x, y, width, height);
            }
        }
    }

    renderChildren(currentContext, children, target) {
        if (target == currentContext) {
            return children;
        }
        return null;
    }

    render() {
        const { focusComponent, onExit, children, target } = this.props;
        let styles;
        this.tryMove(focusComponent);

        const { x, y, width, height, opacity, visibility, animate } = this.state;
        styles = getOverlayStyles(x, y, width, height, animate);

        const containerStyle = {
            opacity,
            transition: `opacity ${TRANSITION_SPEED}s linear`,
            visibility
        };

        return (
            <div style={containerStyle} data-selector='focus-overlay'>
                <div style={styles.topleft} onClick={onExit}>{ this.renderChildren('topleft', children, target) }</div>
                <div style={styles.top} onClick={onExit}>{ this.renderChildren('top', children, target) }</div>
                <div style={styles.topright} onClick={onExit}>{ this.renderChildren('topright', children, target) }</div>

                <div style={styles.left} onClick={onExit}>{ this.renderChildren('left', children, target) }</div>
                <div style={styles.right} onClick={onExit}>{ this.renderChildren('right', children, target) }</div>
                
                <div style={styles.bottomleft} onClick={onExit}>{ this.renderChildren('bottomleft', children, target) }</div>
                <div style={styles.bottom} onClick={onExit}>{ this.renderChildren('bottom', children, target) }</div>
                <div style={styles.bottomright} onClick={onExit}>{ this.renderChildren('bottomright', children, target) }</div>
            </div>
        );
    }
};

const componentRefShape = PropTypes.shape({
    current: PropTypes.shape({
        getBoundingClientRect: PropTypes.func.isRequired
    })
});
FocusOverlay.propTypes = {
    target: PropTypes.oneOf(['topleft', 'top', 'topright', 'left', 'right', 'bottomleft', 'bottom', 'bottomright']),
    focusComponent: PropTypes.oneOf([
        componentRefShape,
        PropTypes.arrayOf(componentRefShape)
    ]),
    onExit: PropTypes.func,
    children: PropTypes.node
};

FocusOverlay.defaultProps = {
    target: 'bottom'
};

export default FocusOverlay;
