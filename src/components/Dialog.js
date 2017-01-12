import {render, h, Component} from 'preact';

const Title = props => {
  return (
    <div class="sDialog_title">
      {props.children}
    </div>
  );
};

const Actions = props => {
  return (
    <div class="sDialog_actions">
      {props.children}
    </div>
  );
};

export default class Dialog extends Component {
  static Title = Title
  static Actions = Actions

  constructor(...args){
    super(...args);
    this.state = {
      visible: false
    };
  }

  hideModal = e => {
    if(e.target && e.target.classList.contains('sDialog--visible')){
      this.close();
    }
  }

  open = () => {
    this.setState({ visible: true });
  }

  close = () => {
    setTimeout(_=>{
      this.setState({ visible: false });
    },100)
  }

  render(){
    return (
      <div class={`sDialog${this.state.visible?' sDialog--visible':''}`} onClick={this.hideModal}>
        <div className="sDialog_content">
          {this.props.children}
        </div>
      </div>
    );
  }
}