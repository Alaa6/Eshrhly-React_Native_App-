import { BackHandler, Platform, Dimensions } from 'react-native';
import { Navigation as NativeNavigation } from 'react-native-navigation';
import { RNToasty } from 'react-native-toasty';
import nativePose from 'animated-pose';
import { connect } from 'react-redux';
var { height, width } = Dimensions.get('window');
// TODO not complete
class Navigation {

  static currentMenu;
  // static menuDirection
  static HomeTabComponentId;
  static sideMenuVisibility;
  constructor() {
    throw new Error('Cannot construct singleton');
  }


  static getScreenLayout = layout => ({
    component: {
      name: layout.name,
      passProps: layout.passProps,
    },
  });

  static getBottomTabsLayout = layout => {
    const children = layout.bottomTabs.map(tab => ({
      component: {
        name: tab.screen,
        passProps: tab.passProps,
        options: {
          bottomTab: {
            text: tab.label,
            icon: tab.icon,
          },
        },
      },
    }));

    return {
      bottomTabs: {
        id: 'MAIN_BOTTOM_TABD',
        children,
      },
    };
  };

  static getSideMenuLayout = layout => {
    const menu = {};

    if (layout.rtl) {
      Platform.OS === 'ios' ? menu.right = { component: { name: layout.sideMenu } } : menu.right = { component: { name: layout.sideMenu, id: "SideMenuSouq" } }
      Navigation.menuDirection = 'right';
    } else {
      Platform.OS === 'ios' ? menu.left = { component: { name: layout.sideMenu } } : menu.left = { component: { name: layout.sideMenu, id: "SideMenuSouq" } }
      Navigation.menuDirection = 'left';
    }

    const MainLayout = layout.bottomTabs
      ? Navigation.getBottomTabsLayout(layout)
      : Navigation.getScreenLayout(layout);

    return {
      rtl: layout.rtl,
      sideMenu: {
        center: {
          ...MainLayout,
        },
        ...menu,
        options: {
          sideMenu: {
            left: {
              width: width * 0.85,
            },
            right: {
              width: width * 0.85,
            },
          }
        }
      },
    };
  };

  static init = (initialStack, layout) => {
    this.stacksOrder = [];
    this.stacksOrder = [initialStack];
    this.currentStack = initialStack;
    this.currentScreen = '';
    this.prevScreen = '';
    this.lastCommand = '';
    this.mainLayout = null;
    this.mainStack = initialStack;
    this.rtl = layout.rtl,
    this.count = 0;
    BackHandler.addEventListener('hardwareBackPress', async () => {
      const state = await Navigation.pop();
      Navigation.closeMenu(Navigation.HomeTabComponentId)

      if (!state) {
        if(!Navigation.sideMenuVisibility){
        this.count += 1;
        if (this.count === 1) {
          let rtl = this.mainLayout.rtl ? this.mainLayout.rtl : layout.rtl;
          RNToasty.Show({ title: this.rtl ? "انقر نقرا سريعا مرة أخري للخروج" : "Press back again to exit the app" })
        }
        else if (this.count === 2) {
          BackHandler.exitApp();
        }
        setTimeout(() => {
          this.count = 0;
        }, 2000);

        return false;
        }
        else{
           Navigation.closeMenu("SideMenuSouq")
           Navigation.sideMenuVisibility=false
        }
      }

      return true;
    });

    NativeNavigation.events().registerComponentDidAppearListener(
      ({ componentId, componentName }) => {
        this.currentScreen = componentName;
        this.currentComponentId = componentId;
        Navigation.setSideMenuVisibility(componentId, true)
      },
    );

    NativeNavigation.events().
      registerComponentDidDisappearListener(
        ({ componentId, componentName }) => {
          this.prevScreen = componentName;
          this.currentComponentId = componentId;
          Navigation.setSideMenuVisibility(componentId, false)

        }

      );


    NativeNavigation.events().registerCommandCompletedListener(
      ({ commandId }) => {
        this.lastCommand = commandId.replace(/[0-9]/g, '');
      },
    );

    this.mainLayout = Navigation.getLayout(layout);

  
    NativeNavigation.setRoot({
      root: {
        stack: {
          id: initialStack,
          children: [this.mainLayout],
        },
      },
    });
  };

  static setStackRoot = layout => {
    this.mainLayout = layout ? Navigation.getLayout(layout) : this.mainLayout;
    if (layout.rtl === null) { this.rtl = layout.rtl; } else { this.rtl = this.rtl; }
  
    NativeNavigation.setStackRoot(this.mainStack, this.mainLayout);
  };

  static getLayout = layout => {
    if (layout.sideMenu) return Navigation.getSideMenuLayout(layout);
    else if (layout.bottomTabs) return Navigation.getBottomTabsLayout(layout);

    return Navigation.getScreenLayout(layout);
  };

  static push = async (layout, stackName) => {
    const screenName = typeof layout === 'string' ? layout : layout.name;
    const passProps = typeof layout === 'string' ? {} : layout.passProps;

    const next_or_current_stack =
      Platform.OS === 'ios'
        ? stackName || this.currentComponentId || this.currentStack
        : stackName || this.currentStack;

    if (screenName === this.currentScreen && !passProps.shouldPush)
    {
      if(layout.sameScreen)
      {

      }
      else
      {
        return;
      } 
    }
    try {

      await NativeNavigation.push(next_or_current_stack, {
        component: {
          name: screenName,
          passProps,
        },
      });
    } catch (error) {
      try {
        await NativeNavigation.push(this.currentStack, {
          stack: {
            id: next_or_current_stack,
            children: [
              {
                component: {
                  name: screenName,
                  passProps,
                },
              },
            ],
          },
        });
      } catch (err) {
      }
    }
    this.currentScreen = screenName;
    this.currentStack = next_or_current_stack;
    this.stacksOrder.push(next_or_current_stack);
    this.closeMenu();
    // Navigation.closeMenu("SideMenuSouq")
  };

  static pop = async stackName => {
    const next_or_current_stack =
      Platform.OS === 'ios'
        ? stackName || this.currentComponentId || this.currentStack
        : stackName || this.currentStack;

    if (this.stacksOrder.length === 1) {
      try {
        await NativeNavigation.pop(next_or_current_stack);
        this.currentStack = next_or_current_stack;
        return true;
      } catch (error) {
        return false;
      }
    }

    this.stacksOrder.pop();
    try {
      await NativeNavigation.pop(next_or_current_stack);
      this.currentStack = next_or_current_stack;
      return true;
    } catch (error) {
      Navigation.pop(this.stacksOrder[this.stacksOrder.length - 1]);
      return true;
    }
  };

  // static setMenuDirection = (direction) =>{
  //     menuDirection = direction
  //     Navigation.menuDirection = menuDirection
  //  }

  static openMenu = componentId => {
    const sideMenu = {};
    if (Navigation.menuDirection === 'right') {
      sideMenu.right = { visible: true };
    } else if (Navigation.menuDirection === 'left') {
      sideMenu.left = { visible: true };
    }
    NativeNavigation.mergeOptions(componentId, {
      sideMenu,
    });
  };

  static closeMenu = componentId => {
    const sideMenu = {};
    if (Navigation.menuDirection === 'right') {
      sideMenu.right = { visible: false };
    } else if (Navigation.menuDirection === 'left') {
      sideMenu.left = { visible: false };
    }

    NativeNavigation.mergeOptions(componentId, {
      sideMenu,
    });
  };
  static setSideMenuVisibility(componentId, visibility) {
    if (componentId == "SideMenuSouq") {
      Navigation.sideMenuVisibility = visibility
    }
  }
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { })(Navigation);

