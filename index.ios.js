import React, { Component } from 'react'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  NavigationExperimental
} from 'react-native'

const {
 CardStack: NavigationCardStack,
 StateUtils: NavigationStateUtils
} = NavigationExperimental

function createReducer(initialState) {
  return (currentState = initialState, action) => {
    switch (action.type) {
      case 'push':
        return NavigationStateUtils.push(currentState, {key: action.key});
      case 'pop':
        return currentState.index > 0 ?
          NavigationStateUtils.pop(currentState) :
            currentState;
          default:
            return currentState;
      }
   }
}
const NavReducer = createReducer({
  index: 0,
  key: 'App',
  routes: [{key: 'Home'}]
})

class RNExperimental extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navState: NavReducer(undefined, {})
    }
  }
  _handleAction (action) {
    const newState = NavReducer(this.state.navState, action);
    if (newState === this.state.navState) {
      return false;
    }
    this.setState({
      navState: newState
    })
    return true;
 }
 handleBackAction() {
   return this._handleAction({ type: 'pop' });
 }
 _renderRoute (key) {
  if (key === 'Home') {
    return <Home
             onPress={this._handleAction.bind(this,
             { type: 'push', key: 'About' })} /> 
  }
  if (key === 'About') {
    return <About
            goBack={this.handleBackAction.bind(this)}
            onPress={this._handleAction.bind(this,
            { type: 'push', key: 'Contact' })} />
  }
  if (key === 'Contact') {
    return <Contact
             goBack={ this.handleBackAction.bind(this)} />
  }
}
_renderScene(props) {
    const ComponentToRender = this._renderRoute(props.scene.route.key)
    return (
      <ScrollView style={styles.scrollView}>
        {ComponentToRender}
      </ScrollView>
    );
}
  render() {
    return (
      <NavigationCardStack
        navigationState={this.state.navState}
        onNavigate={this._handleAction.bind(this)}
        renderScene={this._renderScene.bind(this)} />
    )
  }
}
const Button = ({title, onPress}) => (
  <TouchableHighlight 
    underlayColor='#EFEFEF'
    onPress={onPress}
    style={styles.button}>
      <Text>{title}</Text>
  </TouchableHighlight>
)
const Home = ({ onPress }) => (
 <View style={styles.container}>
   <Text style={styles.title} >Hello From Home</Text>
   <Button onPress={onPress} title='Go To Next Scene' />
 </View>
)
const About = ({ onPress, goBack }) => (
 <View style={styles.container}>
   <Text style={styles.title}>Hello From About</Text>
   <Button onPress={onPress} title='Go To Next Scene' />
   <Button onPress={goBack} title='Go Back' />
 </View>
)
const Contact = ({ goBack }) => (
 <View style={styles.container}>
   <Text style={styles.title} >Hello From Contact</Text>
   <Button title='Go Back' onPress={goBack} />
 </View>
)
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#F5FCFF',
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  title: {
    fontSize: 40,
    marginTop: 200,
    textAlign: 'center'
  },
  button: {
    height: 70,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#EDEDED'
  }
})
AppRegistry.registerComponent('rnnavpart1', () => RNExperimental)