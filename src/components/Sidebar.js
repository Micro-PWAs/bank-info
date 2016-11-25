import { Component, h, render } from 'preact';
import { Layout, Navigation } from 'preact-mdl';

export default class Sidebar extends Component {
	shouldComponentUpdate() {
		return false;
	}

	hide = () => {
		this.base.classList.remove('is-visible');
    this.base.parentNode.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
	};

	render() {
		return (
			<Layout.Drawer onClick={this.hide}>
				<Layout.Title>Bank Info</Layout.Title>
				<Navigation>
					<a class="mdl-navigation__link" href="https://github.com/Micro-PWAs/ifsc-code-finder/">
						<i class="material-icons">info_outline</i>
						<span> Contribute</span>
					</a>
				</Navigation>
			</Layout.Drawer>
		);
	}
}