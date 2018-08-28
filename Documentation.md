# This is the documentation file
## This is based on the speedchecker module, so we will not require the map functionality. However, we will still require the geolocation functionality

This documentation is broken into 4 main files
```
- App.js
- run-info-numeric.js
- run-info.js
- shared-styles.js
```
## App.js
This is the main file where you will do the main editing and coding from
### Import
```
//************* Main import libraries***********************************************************************************************
import React, { Component } from 'react'; // Always required when developing react files

import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight
} from 'react-native'; // functionalities developed on React, used for our extraction

//************** The two files are developed by us and will use to display the values of distance, direction and speed **************
import RunInfo from './components/run-info'; 
import RunInfoNumeric from './components/run-info-numeric';

//************** Required for the distance calculation (External library) ***********************************************************
import haversine from 'haversine';
```
The above code is to extract the necessary libraries we need for development of this HUD display

### Setting state and calculating distance, direction and speed
```
//************** Setting the styling for infoWrapper ********************************************************************************
//************** infoWrapper is the bar at the bottom with Direction, Speed, Distance ***********************************************
const styles = StyleSheet.create({
  infoWrapper: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});


let id = 0;
//var watchID;
type Props = {};


//************************* React uses class App extends Component to create the components to be rendered ****************************
export default class App extends Component<Props> {
  constructor(props) {
    super(props);

    let watchID = navigator.geolocation.watchPosition(
      (position) => {
        let distance = 0;
        //watchID uses the inbuilt geolocation watcher to watch the position

        if(this.state.previousCoordinate) {
          distance = this.state.distance +  haversine(this.state.previousCoordinate,
                                                            position.coords);
          //haversine does the calculations to calculate distance traveled
          this.distanceInfo.setState({ value: distance });
          //get the distance value
        }
        this.speedInfo.setState({ value: position.coords.speed });
        //get speed value

        //***************** Direction Settings to display Heading of vehicle ******************** 
        let x = position.coords.heading;
        if((x>0 && x<=23) || (x>338 && x <=360))
          this.directionInfo.setState({value:'N'});
          else if(x>23 && x<=65)
          this.directionInfo.setState({value:'NE'});
          else if(x>65 && x<=110)
          this.directionInfo.setState({value:'E'});
          else if(x>110 && x<=155)
          this.directionInfo.setState({value:'SE'});
          else if(x>155 && x<=203)
          this.directionInfo.setState({value:'S'});
          else if(x>203 && x<=248)
          this.directionInfo.setState({value:'SW'});
          else if(x>248 && x<=293)
          this.directionInfo.setState({value:'W'});
          else if(x>293 && x<=338)
          this.directionInfo.setState({value:'NW'});


      this.setState({
        markers:[
        ...this.state.markers,{
        coordinate: position.coords,
        key:id++
       }
      ],
      previousCoordinate: position.coords,
      distance
    });
  }, 
  (error) => this.setState({ error: error.message }),
  { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000, distanceFilter: 1},); // Used to set the geolocation settings

    this.state = { markers: [], watchID };
  }



// When geolocation is mounted, it has to be unmounted subsequently
  componentWillUnmount() {
    navigator.geolocation.stopWatch(this.state.watchID);
  }

    // This is not necessary for this particular code. This places markers on the map when the vehicle is moving
    addMarker(region) {
      let now = (new Date).getTime();
      if (this.state.ladAddedMarker > now - 5000) {
        return;
      }

      this.setState({
        markers: [
          ...this.state.markers, {
            coordinate: region,
            key: id++
          }
        ],
        ladAddedMarker: now
      });
    }
```
In the beginning, anything under const styles ={} is a declaration of how the application should appear like. In this case, infoWrapper displays the information we want.
Under export default class App extends Component<Props>, we are setting the initial state of 'what happens' when the component mounts (ES6).
componentWillUnmount() - refers to the geolocation being unmounted. Geolocation has to unmounted everytime it is called.
addMarker(region) - Not necessary for this speedchecker. Only handy in speedometer

```
// This is to render the entire display of how the application will look like
  render() {
    return (
        <View style={{flex: 1}}>
          <View style={styles.infoWrapper}>
            <RunInfoNumeric title="Distance" 
            unit="km"
            ref={(info) => this.distanceInfo = info}
            />
            <RunInfoNumeric title="Speed" 
            unit="km/h"
            ref={(info) => this.speedInfo = info}
            />
            <RunInfo title="Direction" 
            value="NE"
            ref={(info) => this.directionInfo = info}
            />
          </View>
        </View>
    );
  }
}
```
The render function renders the entire code onto the application. This is what it will show when the application is built on the phone.

## run-info-numeric.js
```
import RunInfo  from './run-info';


export default class RunInfoNumeric extends RunInfo {
	formatValue(){
		return [this.state.value.toFixed(2), this.props.unit].join(' ');
	}
}
```
This basically enables the calculation of the values to be limited to 2 decimal places

## run-info.js
```
import React, { Component } from 'react';
import { Text, View } from 'react-native';


import sharedStyles from '../shared-styles';

export default class RunInfo extends Component {
	constructor(props) {
		super(props);
		this.state = { value: this.props.value };
	}
// Constructs the props to be rendered

// Render just adjusts the information to be displayed as stated in the View style={[sharedStyles.runInfoWrapper]}, etc...
formatValue(){
	return this.state.value;
}
	render() {
		let value = this.state.value ? this.formatValue() : '-';
		return(
			<View style={[sharedStyles.runInfoWrapper, {flex: 1, flexDirection: 'column-reverse'}]}>
				<View style={sharedStyles.myStyle}>
				<Text style={sharedStyles.runInfoTitle}>{this.props.title.toUpperCase()}</Text>
				<Text style={sharedStyles.runInfoValue}>{value}</Text>
				</View>
			</View>
		);
	}
}
```
run-info.js creates the component for the information to be displayed. And styles it with shared-styles.

## shared-styles.js
```
import { StyleSheet } from 'react-native';

export default StyleSheet.create({

	runInfoWrapper: {
		backgroundColor: 'rgba(255,255,255,0.75)',
		paddingVertical: 40
	},
	runInfoTitle: {
		textAlign: 'center',
		fontWeight: '700',
		color: '#666'
	},
	runInfoValue:{
		textAlign: 'center',
		fontSize: 48,
		fontWeight: '200',
		paddingVertical: 5
	},
	myStyle: {
    transform: [{ rotateY: '180deg'}]
	}
});

// Basically providing the styling for the application
// runInfoWrapper provides the beige background color of where the (Information) is located
// runInfoTitle centers the text, colors the heading (Direction, Distance, Speed) and bolds it
// runInfoValue centers the values displayed, and gives the values a size and bold
// myStyle inverts the values so that the display is seen in upright order on the HUD screen
// All these styles are called in run-info.js
```
Explained in the comments above
