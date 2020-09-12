import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import LoginPage from './src/pages/LoginPage';
import PeoplePage from './src/pages/PeoplePage';

const AppNavigator = createStackNavigator({
  "Login": {
    screen: LoginPage,
    navigationOptions: {
      headerShown: false,
    }
  }, 'Pessoas': {
    screen: PeoplePage,
    navigationOptions: {
      title: 'Pessoas',
      headerTitleStyle: {
        textAlign: 'left',
        fontSize: 20
      }
    },
  },
},
  {
    defaultNavigationOptions: {
      title: 'NotesTimeline',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#6542f4',
        borderBottomColor: '#f4f2ff'
      },
      headerTitleStyle: {
        color: 'white',
        fontSize: 20,
        flexGrow: 1,
        textAlign: 'center'
      }
    }
  }
);

const AppContainter = createAppContainer(AppNavigator);

export default AppContainter;
