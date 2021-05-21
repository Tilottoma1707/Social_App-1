import React,{Component} from 'react';
import {
        View,
        Text,
        TextInput,
        StyleSheet,
        TouchableOpacity,
        Alert,
        Modal,
        ScrollView,
        KeyboardAvoidingView
} from 'react-native';

import db from '../config'
import firebase from 'firebase'

export default class WelcomeScreen extends Component {
 constructor(){
     super();
     this.state = {
         emailId:"",
         password:"",
         firstName:"",
         lastName:"",
         address:"",
         contact:"",
         age:"",
         confirmPassword:"",
         HealthIssues:"",
         isModalVisible:'false'

     }
 }
  userSignUp =(emailId, password,confirmPassword)=>{
    if(password !== confirmPassword){
        return Alert.alert("password doesn't match\Check your password.")
    }else{
        firebase.auth().createUserWithEmailAndPassword(emailId,password)
        .then(()=>{
            db.collection('users').add({
                first_name:this.state.firstName,
                last_name:this.state.lastName,
                contact:this.state.contact,
                email_id:this.state.emailid,
                address:this.state.address,
                age:this.state.age,
                HealthIssues:this.state.HealthIssues,
                
            })
             return Alert.alert(
                 'The User is Successfully added',
                 '',
                 [
                     {text: 'OK', onPress: ()=> this.setState({"isModalVisible":false})}
                 ]
             )
        })
        .catch((error)=>{
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
        })
    }
  }

userLogin = (emailId, password)=>{
  console.log("email", emailId)
  firebase.auth().signInWithEmailAndPassword(emailId, password)
  .then(()=>{
    Alert.alert('You have successfully logged in')
  })
  .catch((error)=>{
    return Alert.alert(error.message)
  })
}



  showModal = ()=>{
    return(
    <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.isModalVisible}
      >
      <View style={styles.modalContainer}>
        <ScrollView style={{width:'100%'}}>
          <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
          <Text
            style={styles.modalTitle}
            >Registration</Text>
          <TextInput
            style={styles.formTextInput}
            placeholder ={"First Name"}
            maxLength ={8}
            onChangeText={(text)=>{
              this.setState({
                firstName: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Last Name"}
            maxLength ={8}
            onChangeText={(text)=>{
              this.setState({
                lastName: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Contact"}
            maxLength ={10}
            keyboardType={'numeric'}
            onChangeText={(text)=>{
              this.setState({
                contact: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Address"}
            multiline = {true}
            onChangeText={(text)=>{
              this.setState({
                address: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Email"}
            keyboardType ={'email-address'}
            onChangeText={(text)=>{
              this.setState({
                emailId: text
              })
            }}
          /><TextInput
            style={styles.formTextInput}
            placeholder ={"Password"}
            secureTextEntry = {true}
            onChangeText={(text)=>{
              this.setState({
                password: text
              })
            }}
          /><TextInput
            style={styles.formTextInput}
            placeholder ={"Confrim Password"}
            secureTextEntry = {true}
            onChangeText={(text)=>{
              this.setState({
                confirmPassword: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Age"}
            keyboardType = {'numeric'}
            maxLength = {3}
            onChangeText={(text)=>{
              this.setState({
                age: text
              })
            }}
          /><TextInput
          style={styles.formTextInput}
          placeholder ={"Current Health Issues"}
          multiline = {true}
          onChangeText={(text)=>{
            this.setState({
               HealthIssues: text
            })
          }}
        />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Address"}
            multiline = {true}
            onChangeText={(text)=>{
              this.setState({
                address: text
              })
            }}
          />

          <View style={styles.modalBackButton}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={()=>
                this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
              }
            >
            <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalBackButton}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={()=>this.setState({"isModalVisible":false})}
            >
            <Text style={{color:'#ff5722'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </Modal>
  )
  }
  
 render(){
     return(

     <View style={{flex:1, backgroundColor:'#98e4f2'}}>
       <View>{this.showModal()}</View>
    <Text style={styles.Heading}>Social App</Text>
<View style={{justifyContent:'center',marginTop:80,alignItems:'center', backgroundColor:'#98e4f2'}}>
    <TextInput style={styles.textInput}
          placeholder={"email"}
          keyboardType={"email-address"}
          onChangeText={text=>{this.setState({emailId:text})}}
    />

    <TextInput style={styles.textInput}
    placeholder={"********"}
    secureTextEntry={true} 
    onChangeText={text=>{this.setState({password:text})}}

    />
    <TouchableOpacity
    style ={[styles.button,{marginBottom:20,marginTop:50}]}
    onPress = {()=>{
        this.userLogin(this.state.emailId, this.state.password)
    }}>
    <Text style= {styles.buttonText}>Login</Text></TouchableOpacity>
    </View>
<TouchableOpacity
  style = {[styles.button,{marginLeft:50}]}
  OnPress ={()=>this.setState({isModalVisible:true})}>
    <Text style = {styles.buttonText}>Sign Up</Text>
  </TouchableOpacity>

     </View>
     


     )}

}

const styles = StyleSheet.create({
 Heading:{
    fontSize:65,
   fontWeight:'300',
   paddingBottom:30,
   color : '#176082'
 },
  textInput:{
    width: 300,
    height: 40,
    borderColor : '#176082',
    marginTop: 50,
    borderWidth: 3,
    fontSize: 20,
    margin:10,
    paddingLeft:10
  },
  button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#217389",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
    padding: 10
  },
  buttonText:{
    color:'#ff5722',
    fontWeight:'200',
    fontSize:20
  }


})