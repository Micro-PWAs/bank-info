import {render,h, Component} from 'preact';
import {Layout, Card, Button, TextField, List} from 'preact-mdl';

const Menu = ( props ) => {
  if(props.data.length === 0) return false;
  return(
    <List>
      {props.data}
    </List>
  );
};

const filterText = searchText => text => {
  return searchText && !!text.toLowerCase().match(searchText.toLowerCase());
};

export default class Content extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      bank: null,
      branch: null,
      allBanks: [],
      allBranches: [],
      searchBankText: '',
      searchBranchText: ''
    };
  }

  notifyUpdatingBanks = _ => {
    if(this.state.allBanks.length === 0){
      this.props.showMessage(`Updating the banks list ... Please wait!`);
    }
  }

  isDataReady = () => {
    return this.state.bank !== null && this.state.branch !== null;
  }

  updateBanks = event => {
    this.setState({
      bank: null,
      branch: null,
      searchBankText: event.target.value
    })
  }

  updateBranches = event => {
    this.setState({
      branch: null,
      searchBranchText: event.target.value
    })
  }

  selectBank(bank){
    this.props.showMessage(`Updating the branches for : ${bank}`);
    this.setState({
      bank,
      searchBankText: null
    })
  }

  selectBranch(branch){
    this.setState({
      branch,
      searchBranchText: null
    })
  }
  
  render(){
    let {allBanks, allBranches} = this.state;
    let banks = allBanks
                  .filter(filterText(this.state.searchBankText))
                  .map( bank => <List.Item onClick={ this.selectBank.bind(this, bank) }>{bank}</List.Item> );

    let branches = allBranches
                  .filter(filterText(this.state.searchBranchText))
                  .map( branch => <List.Item onClick={ this.selectBranch.bind(this, branch) }>{branch}</List.Item> );
    return (
      <Layout.Content>
        <Card shadow={2} class="centered">
          <Card.Text class="center">
            <h4>Fill the Details</h4>
          </Card.Text>
          <Card.Actions class="center">
              <div class="floating-list">
                <TextField 
                  type="search"
                  label="Enter Bank Name"
                  floating-label
                  onFocus={this.notifyUpdatingBanks}
                  onInput={this.updateBanks}
                  value={ this.state.searchBankText || this.state.bank }
                />
                <Menu data={banks} />
              </div>
              <div class="floating-list">
                <TextField 
                  type="search"
                  label="Enter Bank Branch"
                  floating-label
                  onInput={this.updateBranches}
                  value={ this.state.searchBranchText || this.state.branch }
                  disabled={this.state.bank === null}
                />
                <Menu data={branches} />
              </div>
          </Card.Actions>
          <Card.Text class="center">
              <Button colored raised disabled={!this.isDataReady()} onClick={this.props.onSubmit}>FIND</Button>
          </Card.Text>
          <Card.Text />
        </Card>
      </Layout.Content>
    );
  }
}