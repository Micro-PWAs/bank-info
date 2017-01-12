import 'babel-polyfill';
import 'whatwg-fetch';
import 'material-design-lite';
import { Component, h, render } from 'preact';
import { Layout, Snackbar, Button, List} from 'preact-mdl';
import Header from './Header';
import Dialog from './Dialog';

let Content, getFullDetails;

export default class App extends Component { 
  constructor(props, context) {
    super(props, context);
    this.state = {
      bankInfo: '',
      childState: {},
      loaded: false
    };
  }

  componentDidMount(){
    require.ensure([], _=>{
      Content = require('./Content').default;
      getFullDetails = require('../lib/api').getFullDetails;
      this.setState({ loaded: true });
    });
  }

  findCode = async (childState) => {
    this.dialog.open();
    let response = await getFullDetails(childState.bank, childState.branch);
    this.setState({
      bankInfo: response.data,
      childState
    });
  }

  showMessage = message => {
    this.snackbar.base.MaterialSnackbar.showSnackbar({
      message
    })
  }

  registerDialog = dialog => {
    this.dialog = dialog;
  }

  render(){
    let {
      BANK, 
      ADDRESS,
      BRANCH,
      CONTACT,
      IFSC,
      MICRCODE,
      DISTRICT,
      CITY,
      STATE 
    } = this.state.bankInfo;

    return (
      <div>
        <Dialog ref={ dialog => this.registerDialog(dialog) }>
          <Dialog.Title>
            <h4>{BANK}</h4>
          </Dialog.Title>
          <div>
            <List>
              <List.Item>
                <span>Branch : {BRANCH}</span>
              </List.Item>
              <List.Item>
                <span>Address : {ADDRESS}</span>
              </List.Item>
              <List.Item>
                <span>Phone : {CONTACT}</span>
              </List.Item>
              <List.Item>
                <span>IFSC Code : {IFSC}</span>
              </List.Item>
              <List.Item>
                <span>MICR Code : {MICRCODE}</span>
              </List.Item>
            </List>
          </div>
          <Dialog.Actions>
            <Button colored raised onClick={ _ => this.dialog.close() }>Close</Button>
          </Dialog.Actions>
        </Dialog>
        <Layout id="main" fixed-header>
          <Header />
          {this.state.loaded && 
          <Content onSubmit={this.findCode} showMessage={this.showMessage} childState={this.state.childState}/>
          }
        </Layout>
        <Snackbar ref={snackbar => this.snackbar = snackbar} />
      </div>
    );
  }
};