
import { createDrawerNavigator, createBottomTabNavigator, createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import * as Routes from '../screens/index';





const AuthNavigator = createStackNavigator({
    Login: {
        screen: Routes.Login
    }
});




const TabNavigator = createBottomTabNavigator({

    Home: {
        screen: Routes.Home
    }
    ,
    // Call: {
    //     screen: Routes.Calls
    // }
    // ,
    // Chat: {
    //     screen: Routes.Chat
    // }
    // ,
    Camera: {
        screen: Routes.Camera
    }
    ,

    Gallery: {
        screen: Routes.Gallery
    }
    ,
 
    Location: {
        screen: Routes.Location
    },

    LogOut: {
        screen: Routes.Logout
    } 
})

const AppNavigator = createDrawerNavigator({
    Home: {
        screen: TabNavigator
    },
  
}, {});



const MainNavigator = createSwitchNavigator({
    Auth: {
        screen: AuthNavigator
    },
    App: {
        screen: AppNavigator
    },
    Register: {
        screen: Routes.Register
    },
    Login1: {
        screen: Routes.Login1
    }
});

export default createAppContainer(MainNavigator);





// import { createDrawerNavigator, createMaterialTopTabNavigator, createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";
// import * as Routes from '../screens/index'

// const MainNavigator = createSwitchNavigator({
//     Login: {
//         screen: Routes.Login
//     },
//     SignUp: {
//         screen: Routes.SignUp
//     },
//     UserList: {
//         screen: Routes.UserList
//     },
//     AudioRec: {
//         screen: Routes.AudioRec
//     },
//     Chat: {
//         screen: Routes.Chat
//     },
//     Facer: {
//         screen: Routes.Facer
//     },
//     Call: {
//         screen: Routes.Call
//     },
// });

// export default createAppContainer(MainNavigator);