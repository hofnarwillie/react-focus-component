import { isArray } from './arrays';

export const getBoundryCoordinatesFromRect = rect => ({
    x1: rect.x,
    x2: rect.x + rect.width,
    y1: rect.y,
    y2: rect.y + rect.height
});

export const getHighestCommonDenominator = (component, current) => {
    let componentBoundries = getBoundryCoordinatesFromRect(component);
    if (current == null) {
        return componentBoundries;
    }
    return {
        x1: Math.min(componentBoundries.x1, current.x1),
        x2: Math.max(componentBoundries.x2, current.x2),
        y1: Math.min(componentBoundries.y1, current.y1),
        y2: Math.max(componentBoundries.y2, current.y2)
    };
};

export default focusComponent => {
    let result = null;

    if (focusComponent == null) {
        return {
            width: 0,
            height: 0,
            x: 0,
            y: 0
        };
    }

    if (isArray(focusComponent)) {
        let highestCommonDenominator;
        focusComponent.map(component => {
            highestCommonDenominator = getHighestCommonDenominator(component.current.getBoundingClientRect(), highestCommonDenominator);
        });
        return {
            width: highestCommonDenominator.x2 - highestCommonDenominator.x1,
            height: highestCommonDenominator.y2 - highestCommonDenominator.y1,
            x: highestCommonDenominator.x1,
            y: highestCommonDenominator.y1
        };
    }
    return focusComponent.current.getBoundingClientRect();
};
