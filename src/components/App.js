import 'material-design-lite';
import 'material-design-lite/dist/material.pink-purple.min.css';
import './App.css';

import dialogPolyfill from 'dialog-polyfill';
import { Component, h, render } from 'preact';
import { Layout, Snackbar, Dialog, Button } from 'preact-mdl';

import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';

export default class App extends Component {  
  findCode = _ => {
    this.dialog.showModal();
    this.setState({
      ifscCode: 'some number will be here'
    });
  }

  showMessage = message => {
    this.snackbar.base.MaterialSnackbar.showSnackbar({
      message
    })
  }

  registerDialog = dialog => {
    if(!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    this.dialog = dialog;
  }

  render(){
    return (
      <div>
        <Dialog ref={ dialog => this.registerDialog(dialog.base) }>
          <Dialog.Title>
            <h4>The IFSC code is : </h4>
          </Dialog.Title>
          <Dialog.Content>
            <h4>{this.state.ifscCode}</h4>
          </Dialog.Content>
          <Dialog.Actions>
            <Button colored raised onClick={ _ => this.dialog.close() }>Close</Button>
          </Dialog.Actions>
        </Dialog>
        <Layout id="main" fixed-header fixed-drawer>
          <Sidebar />
          <Header />
          <Content onSubmit={this.findCode} showMessage={this.showMessage}/>
        </Layout>
        <Snackbar ref={snackbar => this.snackbar = snackbar} />
      </div>
    );
  }
};