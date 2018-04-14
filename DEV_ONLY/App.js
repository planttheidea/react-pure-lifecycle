import PropTypes from 'prop-types';
import React, {Component, PureComponent} from 'react';
import {render} from 'react-dom';

import lifecycle from '../src';

const shouldComponentUpdate = (props, nextProps) => {
  const counterValue = parseInt(nextProps.children.replace('Counter value: ', ''), 10);

  console.log('counter', counterValue);

  return counterValue % 2 === 0;
};

const componentDidUpdate = (...args) => {
  console.log('update', args);
};

const getChildContext = (props) => ({
  baz: props.children.length
});

const methods = {
  getChildContext,
  componentDidUpdate,
  shouldComponentUpdate,
  componentWillUpdate: 'foo',
  baz() {}
};

const Span = (props, {baz}) => <span>&nbsp;({baz} characters in prior statement)</span>;

Span.contextTypes = {
  baz: PropTypes.number
};

const Div = ({children}) => (
  <div>
    {children}

    <Span />
  </div>
);

Div.propTypes = {
  children: PropTypes.node
};

Div.contextTypes = {
  bar: PropTypes.string
};

Div.childContextTypes = {
  baz: PropTypes.number
};

Div.defaultProps = {
  children: []
};

const WrappedDiv = lifecycle(methods, {usePureComponent: false})(Div);

const fn = (...args) => {
  console.log('fn', args);
};

@lifecycle({componentDidUpdate: fn})
class OtherDiv extends PureComponent {
  state = {
    foo: 'bar'
  };

  render() {
    return <div>foo</div>;
  }
}

class App extends Component {
  static propTypes = {
    divText: PropTypes.string
  };

  static childContextTypes = {
    bar: PropTypes.string
  };

  getChildContext() {
    return {
      bar: 'baz'
    };
  }

  render() {
    const {divText} = this.props;

    return (
      <div>
        <h1>App</h1>

        <WrappedDiv>{divText}</WrappedDiv>

        <OtherDiv foo={divText} />
      </div>
    );
  }
}

const renderApp = (container, divText) => {
  render(<App divText={divText} />, container);
};

const div = document.createElement('div');

div.id = 'app-container';
div.style.backgroundColor = '#1d1d1d';
div.style.boxSizing = 'border-box';
div.style.color = '#d5d5d5';
div.style.height = '100vh';
div.style.padding = '15px';
div.style.width = '100vw';

document.body.style.margin = 0;
document.body.style.padding = 0;

let counter = 0;

renderApp(div, `Counter value: ${counter}`);

setInterval(() => {
  counter++;

  renderApp(div, `Counter value: ${counter}`);
}, 3000);

document.body.appendChild(div);
