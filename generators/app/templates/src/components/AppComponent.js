import React, {Component} from 'react';
import Styles from './styles/AppComponent.module.scss';

class App extends Component{
  componentDidMount(){
    this.props.onMount();
  }

  render(){
    return (
      <div className={Styles.container}>
        <header className={Styles.content}>
          <h1>Demo7</h1>
        </header>
      </div>
    );
  }
}

export default App;
