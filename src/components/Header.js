import { h, render } from 'preact';
import { Layout } from 'preact-mdl';

const Header = () => (
	<Layout.Header>
		<Layout.HeaderRow>
			<Layout.Title>
				Bank Informations
			</Layout.Title>
		</Layout.HeaderRow>
	</Layout.Header>
);

export default Header;