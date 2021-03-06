import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Button, TouchableOpacity, Picker, KeyboardAvoidingView, Image } from 'react-native';
import { ImagePicker, Permissions } from 'expo'
import AppHeader from '../../Component/Header/Header';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment'

export default class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CompanyName: '',
      image: null,
      image2: null,
      image3: null,
      since: false,
      isDatePickerVisible: false,
      isDateTimePickerVisible: false,
      isTime2Visible: false,
      since: '',
      time: '',
      time2: ''
    };
  }

  _pickImage = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1,1],
    });

    console.log(uri);

    this.setState({ image: uri });
   
  };

  _pickImage2 = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      // aspect: [1,1],
    });

    console.log(uri);

    this.setState({ image2: uri });
  };

  _pickImage3 = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      // aspect: [1],
    });

    console.log(uri);

    this.setState({ image3: uri });
  };
  // TakePicture = async () => {
  //   await Permissions.askAsync(Permissions.CAMERA);
  //   const { cancelled, uri } = await ImagePicker.launchCameraAsync({
  //     allowsEditing: false,

  //   });
  //   console.log(uri);

  //   this.setState({ image: uri });
  // }


  _showDatePicker = () => this.setState({ isDatePickerVisible: true });

  _hideDateTimePicker = () => {

    this.setState({ isDatePickerVisible: false });
  }

  _handleDatePicked = (since) => {
    console.log('A since has been picked: ', since);
    this._hideDateTimePicker();
    this.setState({ since: moment(since).format('YYYY') })
  };
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideTimePicker = () => {

    this.setState({ isDateTimePickerVisible: false });
  }

  _handleTime = (time) => {
    console.log('A time1 has been picked: ', time);
    this._hideTimePicker();
    this.setState({ time: moment(time).format('HH:mm') })
  };

  _showTime2Picker = () => this.setState({ isTime2Visible: true });

  _hideTime2Picker = () => {

    this.setState({ isTime2Visible: false });
  }
  _handletime2 = (time2) => {
    console.log('A time2 has been picked: ', time2);
    this._hideTime2Picker();
    this.setState({ time2: moment(time2).format('HH:mm') })
  };

  Next() {
    const { CompanyName, since, time, time2, image, image2, image3 } = this.state
    if (!CompanyName) {
      alert('Invalid Company Name')
    }
    else if (!since) {
      alert("Invalid year")
    }
    else if (!time || !time2) {
      alert('Invalid time')
    }
    else if (!image && !image2 && !image3) {
      alert('submit  Image Certificate')
    }
    else {

      this.props.navigation.navigate('ClinicLocation')
    }

  }

  // static navigationOptions = { header: null }

  render() {
    const { CompanyName, image2, image3, image, since, time, time2 } = this.state

    return (
      <View style={styles.container} >

        <KeyboardAvoidingView behavior='padding' enabled >

          <ScrollView >

            <TextInput
              style={styles.input}
              onChangeText={(e) => this.setState({ CompanyName: e })}
              value={CompanyName}
              placeholder={'Name of company'}
              placeholderTextColor='#FFFFFF'

            />
            <View >
              <TouchableOpacity style={styles.input} onPress={this._showDatePicker}>
                <Text style={styles.text}>Since {since}</Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.isDatePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
                // is24Hour={true}
                mode={'date'}
                titleIOS={'Since'}
              />
            </View>

            <View >
              <TouchableOpacity style={styles.input} onPress={this._showDateTimePicker}>
                <Text style={styles.text}>Open Time {time}</Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleTime}
                onCancel={this._hideTimePicker}
                is24Hour={true}
                mode={'time'}
                titleIOS={'Open Time'}
              />
            </View>
            <View >
              <TouchableOpacity style={styles.input} onPress={this._showTime2Picker}>
                <Text style={styles.text}>Close Time {time2}</Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.isTime2Visible}
                onConfirm={this._handletime2}
                onCancel={this._hideTime2Picker}
                is24Hour={true}
                mode={'time'}
                titleIOS={'Close Time'}
              />
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Certificates </Text>
            </View>
            <View style={styles.images}>
            <TouchableOpacity onPress={this._pickImage}>
                {image ?
                  <Image style={{ height: 80, width: 80 }} source={{ uri: image }} /> :
                 <Text> Image-1</Text>
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={this._pickImage2}>
                {image2 ?
                  <Image style={{ height: 80, width: 80 }} source={{ uri: image2 }} /> :
                  <Text> Image-2</Text>
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={this._pickImage3}>
                {image3 ?
                  <Image style={{ height: 80, width: 80 }} source={{ uri: image3 }} /> :
                  <Text> Image-3</Text>
                }
              </TouchableOpacity> 
            </View>
            {/* <Button style={styles.Heading}
                title="Take a photo"
                onPress={this.TakePicture}
              /> */}
            {/* <AppAvater onPress={this._pickImage}/> */}

            <TouchableOpacity style={styles.buton} onPress={() => { this.Next() }}>
              <Text style={styles.ButtonText}>Next</Text>
            </TouchableOpacity>
          </ScrollView>

        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 20,
    // opacity:0.9
  },
  text: {
    marginTop: 8,
    fontSize: 18,
    color: '#FFFFFF',
  },
  icon: {
    height: 80,
    width: 80,
    opacity: 0.5
  },
  images: {
    margin: 30,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  input: {
    margin: 10,
    
    backgroundColor: '#2B6AFC',
    marginBottom: 20,
    color: '#ffff',
    height: 40,
    width: 300,
    paddingHorizontal: 10,
    fontSize: 18
  },
  buton: {
    alignItems: 'center',
    backgroundColor: '#2980b9',
    paddingVertical: 10,
    // width:150,
    // justifyContent: 'space-between',
  },
  ButtonText: {
    fontWeight: 'bold',
    color: "#ffff",
    // alignItems:'center'
    fontSize: 20
  },

});