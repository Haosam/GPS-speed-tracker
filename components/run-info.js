import React, { Component } from 'react';
import { Text, View } from 'react-native';


import sharedStyles from '../shared-styles';

export default class RunInfo extends Component {
	constructor(props) {
		super(props);
		this.state = { value: this.props.value };
	}

formatValue(){
	return this.state.value;
}
	render() {
		let value = this.state.value ? this.formatValue() : '-';
		return(
			<View style={[sharedStyles.runInfoWrapper, {flex: 1, flexDirection: 'column-reverse'}]}>
				<Text style={sharedStyles.runInfoTitle}>{this.props.title.toUpperCase()}</Text>
				<Text style={sharedStyles.runInfoValue}>{value}</Text>
			</View>
		);
	}
}



