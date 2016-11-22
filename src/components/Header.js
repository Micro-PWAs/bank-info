import { h, render } from 'preact';
import { Layout } from 'preact-mdl';

const Header = () => (
	<Layout.Header>
		<Layout.HeaderRow>
			<Layout.Title>
				IFSC Code Finder
			</Layout.Title>
		</Layout.HeaderRow>
	</Layout.Header>
);

export default Header;