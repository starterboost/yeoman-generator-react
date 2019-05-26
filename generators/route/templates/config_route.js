						<Route exact path={<%= NAME %>} render={( props ) => {
							const {params} = props.match;
							<% if( component ) { %>return <<%= component %> {...params} />;<% } %>
						}} />