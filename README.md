# react-focus-component

[![Build Status](https://travis-ci.org/hofnarwillie/react-focus-component.svg?branch=master)](https://travis-ci.org/hofnarwillie/react-focus-component)

A react component that brings other components into visual focus/highlight by placing an overlay over all other elements on the page. **Requires React 16 or higher**

Example: [https://react-focus-component.now.sh/](https://react-focus-component.now.sh/)

## Usage

```

import { FocusOverlay } from 'react-focus-component';

class BasicExample extends React.Component {
    constructor(props) {
        super(props);
        this.component = React.createRef();
    }

    render() {
        return (
            <div>
                <div ref={this.component}>
                    This element will be highlighted because the "ref" is passed to the FocusOverlay as the focusComponent prop.
                </div>

                <FocusOverlay focusComponent={this.component} onExit={() => alert('runs when the user clicks in the overlay')} />
            </div>
        );
    }
}

```

## Development

* **Dependencies:** Node 8 or greater.
* **Running examples:** `npm start`.
* **Testing:** `npm test` or `npm run unittest` or `npm run test-watch`. Write tests in `__tests__` folder.
* **Linting:** `npm test` or `npm run lint`. Fix: `npm run lint-fix`.
* **Build & publish:** `npm publish` to build transpiled output to `dist` folder and publish it to the NPM registry. Requires environment variable `NPM_TOKEN`.
* **Deploy:** `npm run deploy` deploys to ZEIT Now. Requires environment variable `NOW_TOKEN`.

## License

MIT
