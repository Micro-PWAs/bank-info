import 'material-design-lite';
import 'material-design-lite/dist/material.pink-purple.min.css';
import './App.css';

import dialogPolyfill from 'dialog-polyfill';
import { Component, h, render } from 'preact';
import { Layout, Snackbar, Dialog, Button } from 'preact-mdl';

import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';
import {getFullDetails} from '../lib/api';

export default class App extends Component { 
  constructor(props, context) {
    super(props, context);
    this.state = {
      ifscCode: '',
      childState: {}
    };
  }
  

  findCode = async (childState) => {
    this.dialog.showModal();
    let bankInfo = await getFullDetails(childState.bank, childState.branch);
    this.setState({
      ifscCode: bankInfo.data.IFSC,
      childState
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
        <Layout id="main" fixed-header>
          <Header />
          <Content onSubmit={this.findCode} showMessage={this.showMessage} childState={this.state.childState}/>
        </Layout>
        <Snackbar ref={snackbar => this.snackbar = snackbar} />
      </div>
    );
  }
};