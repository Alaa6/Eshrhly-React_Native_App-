//UserLogin
import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { View, Text, Button, Icon, Image, Navigation, Input, ScrollView, Picker, Tabs } from '../../ui';
import { connect } from 'react-redux';
import { loginRequest } from '../../actions/auth';
import Header from '../../components/Header';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import MyMap from '../Map/map';
import { LocaleConfig } from 'react-native-calendars';






calendarOpject = {
    day: 1,     // day of month (1-31)
    month: 1,   // month of year (1-12)
    year: 2017, // year
    timestamp: '00:00',   // UTC timestamp representing 00:00 AM of this date
    dateString: '2016-05-13' // date formatted as 'YYYY-MM-DD' string
}

LocaleConfig.locales['fr'] = {
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dayNames: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';



class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }



    onSubmit = () => {
        // Navigation.init('MAIN_STACK', {
        //     rtl: this.props.rtl,
        //     sideMenu: 'SideMenu',
        //     name: 'Home',
        // });


    }

    onBack = () => {

        Navigation.pop();
        //Navigation.push('Login'); 


    }

    burgerBtnPress = () => {

        Navigation.openMenu(this.props.componentId);

    }

    onDayPress = (day) => {
        console.log('selected day', day)
    }












    render() {
        const { user } = this.props;
        return (
            <View flex stretch backgroundColor='white' centerX >
                <Header hideBack gradient backgroundColor="primary" />

                <View row reverse stretch center >
                    <Text bold size={8} color='#020202' stretch center mv={15} mh={55}>{I18n.t('Search')}</Text>

                    <Icon name='menu' type='entypo' color='gray' size={11} onPress={this.burgerBtnPress} />

                </View>


                <ScrollView flex stretch >


                    <View stretch flex mh={5}>
                        <View row stretch flex >

                            <View >
                                <Text size={5} stretch center mv={2}> {I18n.t('Select attribute')} </Text>
                                <Picker mv={5} bw={1} bc={'primary'} size={5}
                                    borderRadius={30} height={5} width={40} mh={5} >

                                </Picker>
                            </View>
                            <View>
                                <Text size={5} stretch center mv={2}> {I18n.t('Choose Teacher')} </Text>
                                <Picker mv={5} bw={1} bc={'primary'} size={5}
                                    borderRadius={30} height={5} width={40} mh={5}  >

                                </Picker>


                            </View>

                        </View>

                        <View row stretch flex>
                            <View>
                                <Text size={5} stretch center mv={2}> {I18n.t('Students Number')} </Text>
                                <Picker mv={5} bw={1} bc={'primary'} size={5}
                                    borderRadius={30} height={5} width={40} mh={5} >

                                </Picker>


                            </View>

                            <View>

                                <Text size={5} stretch width={100} center mv={2}> {I18n.t('School Stage')} </Text>
                                <Picker mv={5} bw={1} bc={'primary'} size={5}
                                    borderRadius={30} height={5} width={40} mh={5}  >

                                </Picker>

                            </View>

                        </View>

                        <View row stretch flex >

                            <View>
                                <Text size={5} stretch width={100} center mv={2}> {I18n.t('School Subject')} </Text>
                                <Picker mv={5} bw={1} bc={'primary'} size={5}
                                    borderRadius={30} height={5} width={40} mh={5}  >

                                </Picker>


                            </View>
                            <View>

                                <Text size={5} stretch center mv={2}> {I18n.t('Search Type')} </Text>
                                <Picker mv={5} bw={1} bc={'primary'} size={5}
                                    borderRadius={30} height={5} width={40} mh={5}  >

                                </Picker>


                            </View>




                        </View>


                    </View>

                    <View row stretch mh={7}>
                        <Icon name='calendar' type='oct' size={11} color={'primary'} mh={3.5} mv={8} />
                        <Text mh={3}>{I18n.t('Date')}</Text>


                    </View>

                    <View stretch flex >
                        <Calendar

                            style={{
                                borderWidth: 1,
                                borderColor: '#eeeeee',
                                borderRadius: 10,

                                alignSelf: 'center',
                                width: '90%',
                                height: '100%',



                            }}
                            onDayPress={this.onDayPress}
                            onMonthChange={(month) => { console.log('month changed', month) }}
                            // hideArrows={true}
                            // hideDayNames={true}
                            hideExtraDays={true}
                        // onPressArrowLeft={substractMonth => substractMonth()}
                        // onPressArrowRight={addMonth => addMonth()}
                        />
                    </View>

                    <View row stretch mh={7} >
                        <Icon name='clock' type='material-community' size={11} color={'primary'} mh={3.5} mv={8} />
                        <Text mh={3}>{I18n.t('Time clock')}</Text>
                    </View>

                    <View row stretch mh={7}>
                        <Icon name='map-marker-alt' type='fontisto' size={9} color={'primary'} mh={3.5} mv={8} />
                        <Text mh={3}>{I18n.t('Choose your location')}</Text>
                    </View>

                    <View stretch height={30} borderRadius={20} mh={5} >
                        <MyMap />
                    </View>

                    <View stretch height={30}>
                        <Button height={7} width={40} size={5} centerSelf borderRadius={10} title={I18n.t('Search')} gradient mv={25} />
                    </View>

                  



                </ScrollView>

                

            </View >
        );
    }
}


const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(Search);