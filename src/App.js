import React, {Component} from "react";
import "./App.css";
import { Modal } from "semantic-ui-react";
import Content from './Content'
import Testing from './Testing'

class App extends Component {

  render() {
    return (
      <div className={'main'}>
          <Modal size={'large'} open={true} className={'modal'}>
              <Modal.Content>
                 <Content/>
              </Modal.Content>
          </Modal>
      </div>
    );
  }
}

export default App;
