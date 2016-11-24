import {render,h, Component} from 'preact';
import {Layout, Card, Button, TextField, List} from 'preact-mdl';
import {getBankList, getBranchList} from '../lib/api';
import _ from 'lodash';

const Menu = ( props ) => {
  let data = props.data.filter(filterText(props.searchText));
  if(data.length === 0) return <div />;
  return(
    <List>
    { 
      data.map( bank => <List.Item onClick={ _ => props.onSelect(bank) }>{bank}</List.Item> )
    }
    </List>
  );
};

const filterText = searchText => text => {
  return searchText && !!text.toLowerCase().match(searchText.toLowerCase());
};

export default class Content extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = _.assign({
      bank: null,
      branch: null,
      allBanks: [],
      allBranches: [],
      searchBankText: '',
      searchBranchText: ''
    }, props.childState);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.state, nextProps.childState);
  }

  async componentDidMount() {
    if(this.state.allBanks.length > 0){
      return;
    }

    let banks = await getBankList();
    this.setState({
      allBanks: banks.data
    });
  }
  

  notifyUpdatingBanks = _ => {
    if(this.state.allBanks.length === 0){
      this.props.showMessage(`Updating the banks list ... Please wait!`);
    }
  }

  isDataReady = () => {
    return this.state.bank !== null && this.state.branch !== null;
  }

  updateBanks = _.debounce(text => {
    this.setState({
      bank: null,
      branch: null,
      searchBankText: text
    })
  }, 300)

  updateBranches = _.debounce(text => {
    this.setState({
      branch: null,
      searchBranchText: text
    })
  }, 300)

  selectBank = async (bank) => {
    this.props.showMessage(`Updating the branches for : ${bank}`);
    let branches = await getBranchList(bank);
    this.setState({
      bank,
      allBranches: branches.data,
      searchBankText: null
    })
  }

  selectBranch = (branch) => {
    this.setState({
      branch,
      searchBranchText: null
    })
  }
  
  render(){
    let {allBanks, allBranches} = this.state;
    return (
      <Layout.Content>
        <Card shadow={2} class="centered">
          <Card.Text class="center">
            <h4>Fill the Details</h4>
          </Card.Text>
          <Card.Text class="center">
              <div class="floating-list">
                <TextField 
                  type="search"
                  label="Enter Bank Name"
                  floating-label
                  onFocus={this.notifyUpdatingBanks}
                  onInput={ event => this.updateBanks(event.target.value) }
                  value={ this.state.searchBankText || this.state.bank }
                />
                <Menu data={allBanks} searchText={this.state.searchBankText} onSelect={this.selectBank}/>
              </div>
              <div class="floating-list">
                <TextField 
                  type="search"
                  label="Enter Bank Branch"
                  floating-label
                  onInput={ event => this.updateBranches(event.target.value) }
                  value={ this.state.searchBranchText || this.state.branch }
                  disabled={this.state.bank === null}
                />
                <Menu data={allBranches} searchText={this.state.searchBranchText} onSelect={this.selectBranch}/>
              </div>
          </Card.Text>
          <Card.Text class="center">
              <Button colored raised disabled={!this.isDataReady()} onClick={ _ => this.props.onSubmit(this.state)}>FIND</Button>
          </Card.Text>
          <Card.Text />
        </Card>
      </Layout.Content>
    );
  }
}