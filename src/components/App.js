import 'babel-polyfill';
import 'material-design-lite';
import { Component, h, render } from 'preact';
import { Layout, Snackbar, Button, List} from 'preact-mdl';
import Header from './Header';

let Content,
    getFullDetails,
    dialogPolyfill,
    Dialog;

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
      require('dialog-polyfill');
      Content = require('./Content').default;
      Dialog = require('preact-mdl').Dialog
      getFullDetails = require('../lib/api').getFullDetails;
      this.setState({ loaded: true });
    });
  }

  findCode = async (childState) => {
    this.dialog.showModal();
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
    if(!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
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
        {this.state.loaded && 
        <Dialog ref={ dialog => this.registerDialog(dialog.base) }>
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
        }
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