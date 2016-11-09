import _ from 'lodash';
import React, {
  Component,
  PropTypes
} from 'react';
import {
  render
} from 'react-dom';

import futz, {
  componentDidMount
} from '../src';

const shouldComponentUpdate = (props, nextProps) => {
  const counterValue = parseInt(nextProps.children.replace('Counter value: ', ''), 10);

  console.log(counterValue);

  return counterValue % 2 === 0;
};

const componentDidUpdate = (...args) => {
  console.log(args);
};

const options = {
  componentDidUpdate,
  shouldComponentUpdate,
  componentWillUpdate: 'foo'
};

const Div = ({children}, context) => {
  return (
    <div>
      {children}
    </div>
  )
};

Div.propTypes = {
  children: PropTypes.node
};

Div.contextTypes = {
  foo: PropTypes.string
};

Div.defaultProps = {
  children: []
};

const WrappedDiv = futz(options)(Div);

const fn = (...args) => {
  console.log(args);
};

@futz({componentDidUpdate: fn})
class OtherDiv extends Component {
  state = {
    foo: 'bar'
  };

  render() {
    return (
      <div>
        foo
      </div>
    );
  }
}

class App extends Component {
  static childContextTypes = {
    foo: PropTypes.string
  }

  getChildContext() {
    return {
      foo: 'bar'
    };
  }

  render() {
    const {
      divText
    } = this.props;

    return (
      <div>
        <h1>
          App
        </h1>

        <WrappedDiv>
          {divText}
        </WrappedDiv>

        <OtherDiv foo={divText}/>
      </div>
    );
  }
}

const renderApp = (divText) => {
  render((
    <App divText={divText}/>
  ), div);
};

const div = document.createElement('div');

div.id = 'app-container';

let counter = 0;

renderApp(`Counter value: ${counter}`);

setInterval(() => {
  counter++;

  renderApp(`Counter value: ${counter}`);
}, 3000);

document.body.appendChild(div);
