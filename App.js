import React from 'react';
import { Platform, Dimensions, Alert, StyleSheet, Text, View ,ScrollView,Button ,TouchableOpacity, TextInput ,KeyboardAvoidingView , StatusBar, Picker, Image} from 'react-native';
import Prompt from 'react-native-prompt-crossplatform'
import { italic } from 'ansi-colors';
//import Icon from 'react-native-vector-icons/FontAwesome5';
import { Icon } from 'react-native-elements';
import firebase from 'react-native-firebase';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Dialog from "react-native-dialog";
let firebase_ref ;
let varCurrentUser;
function getName(Name1, Name2) {
  if (Name1 <= Name2) {
          return Name1 + "_" +  Name2;
  } else {
          return Name2 + "_" + Name1;
  }
}
let lastMessageDetailArray = []
const Screen1 = (props) => {
  //<View style={{backgroundColor:'white',height: StatusBar.currentHeight}}></View>
  //props.loadContacts()
  let hi = new Date()
  let date1 = (hi.getDate()<10?'0':'') + hi.getDate() + '-'+ (hi.getMonth()<10?'0':'') + (hi.getMonth()+1) + '-' + hi.getFullYear()
  let date2 = '27-11-2018'
  _menu = null;
 
  setMenuRef = ref => {
    this._menu = ref;
  };
 
  hideMenu = () => {
    this._menu.hide();
  };
 
  showMenu = () => {
    this._menu.show();
  };
  func2 = () => {
    this.hideMenu()
    props.tOFunc()
  }
  func1 = () => {
    this.hideMenu()
    props.handleLogout()
  }
  /*
  <TouchableOpacity
          style={styles.difStyle2}
          activeOpacity = { .5 }
          onPress={props.handleLogout}
          >
            <Text style={{fontSize: 50 , color:'white'}}> LOGOUT </Text>
          </TouchableOpacity>
          <Menu
          ref={this.setMenuRef}
          button={<Text onPress={this.showMenu}>Show menu</Text>}
          >
            <MenuItem onPress={props.handleLogout}>Logout</MenuItem>
            <MenuItem onPress={this.hideMenu}>Menu item 2</MenuItem>
            <MenuItem onPress={this.hideMenu} disabled> Menu item 3</MenuItem>
            <MenuDivider />
            <MenuItem onPress={this.hideMenu}>Menu item 4</MenuItem>
          </Menu>*/
  return (
    <View>
      <View style={{height: 50, backgroundColor:'grey',alignItems: 'center',flexDirection: 'row',}}>
        <View style={{flex:1}}><Text style={{fontSize:30,marginLeft:15,}}>ChatBot</Text></View>
          <Menu
          ref={this.setMenuRef}
          button={<Text style={{fontSize:50,color:'white',marginLeft: 1, marginRight: 5, marginBottom: 7, alignItems: 'center', alignSelf: 'center',}}onPress={this.showMenu}>+</Text>}
          >
            <MenuItem onPress={this.func1}>Logout</MenuItem>
            <MenuDivider />
            <MenuItem onPress={this.func2}>Add Contact</MenuItem>
          </Menu>
      </View>
      <ScrollView style={{height: Dimensions.get('window').height - 50 - StatusBar.currentHeight}}>
        <View style={{backgroundColor: '#77abff',}}>
          {props.contacts.map((con , i) => 
            <TouchableOpacity 
            key = {i}
            style={styles.button} 
            onPress={() => props.pickerFunc(con.contact)}
            onLongPress={() => props.deleteContacts(con)}> 
              <View style={{flexDirection:'row',paddingBottom:10}}>
                <View style={{alignSelf: 'flex-start'}}><Text style={{fontSize:20 , fontStyle: 'italic', alignSelf: 'flex-start',}}> {con.contact} </Text></View>
                <View style={{flex:1,alignSelf: 'flex-end'}}><Text style={{fontSize:15, color:'grey', alignSelf: 'flex-end',paddingLeft:20}}>{date1 === con.lastMessage.date ? con.lastMessage.time : con.lastMessage.date}</Text></View>
              </View>
              <View style={{flex:1}}>
                <View style={{flex:1}}>
                  <Text style={{fontSize:15, color:'grey'}}>{con.lastMessage.message}</Text>
                </View>
              </View> 
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <Prompt
      title="Contact"
      inputPlaceholder="Start typing"
      isVisible={props.promptVisible}
      onChangeText={(value) => props.oCT(value)}
      onCancel={props.oC}
      onSubmit={props.handleContacts}
      />
    </View>
  )
}
/* */
//{props.chat.map((text, i) => props.senders[i] === currentUser ? <View style={styles.msgs} key={i}><Text key={i} style={{color: 'white' ,fontSize:20,paddingLeft:10,paddingRight:10}}>{text}</Text></View> : <View style={styles.msgs2} key={i}><Text key={i} style={{color: 'white' ,fontSize:20,paddingLeft:10,paddingRight:10}}>{text}</Text></View>)}
const ChatScreen = (props) => {
  setMenuRef = ref => {
    this._menu = ref;
  };
  hideMenu = () => {
    this._menu.hide();
  };
  clearChat2 = () => {
    props.clearChat()
    this.hideMenu()
  }
  showMenu = () => {
    this._menu.show();
  };
  func2 = () => {
    props.onClick()
    //props.handleInsert()
    this.textInput.clear()
  }
  func = (num) => {
    let ting = props.chat[num]
    //Alert.alert(ting + 'This message has been long pressed' + num + ' pressed! Delete   ')
    //props.deleteMessage( num, props.keys[num])
    //props.loadData(props.language)
    props.changeDelNum(num)
    props.showDialog()
    //props.senders props.dates props.timesrops.loadData(props.language)
  }
  openDialog2 = (num) => {
    props.changeDelNum(num)
    props.showDialog2()
  }
  //{/*<Icon name='chevron-left' type='evilicon' color='black' />*/}
  /*<TouchableOpacity
    style={styles.difStyle3}
    activeOpacity = { .5 }
    onPress={props.clearChat}
    >
      <Text>Clear Chat</Text>
    </TouchableOpacity> */
  return (
      <View style={{flex:1}}> 
        <View style={{height: 50, backgroundColor:'white',alignItems: 'center',flexDirection: 'row',}}>
          <View style={{alignItems:'center'}}>
            <TouchableOpacity
              style={styles.difStyle3}
              activeOpacity = { .5 }
              onPress={props.change}
              >
               <Text>Back</Text>
            </TouchableOpacity>
            
          </View>
          <View style={{flex:1}}><Text style={{fontSize:20,marginLeft:15,alignContent:'center',alignSelf: 'flex-start',}}>{props.language}</Text></View>
          <View style={{ margin:10, alignItems: 'center', justifyContent: 'center' }}>
            <Menu
              ref={this.setMenuRef}
              button={<Text style={{fontSize:20}} onPress={this.showMenu}>X</Text>}
            >
              <MenuItem onPress={this.clearChat2}>Clear Chat</MenuItem>
            </Menu>
          </View>
        </View>
        <ScrollView style={{backgroundColor: '#e8ebef'}} ref={ref => this.scrollView = ref} onContentSizeChange={(contentWidth, contentHeight)=>{ this.scrollView.scrollToEnd({animated: true});}}>
          <View style={{paddingTop: 10,}}>
            {props.chat.map((text, i) => (props.senders[i] === varCurrentUser && props.delSenders[i] === false) || (props.senders[i] != varCurrentUser && props.delRecs[i] === false) ? props.senders[i] === 
            varCurrentUser ? <View>{props.dates[i] != props.dates[i-1] ? <View style={styles.dateStyle}><Text>{props.dates[i]}</Text></View> : <View></View>}<View style={styles.msgs} key={i}><Text onLongPress={() => this.func(i)} key={i} style={{color: 'white' ,fontSize:20,paddingLeft:10,paddingRight:10}}>{text}</Text><Text style={{color:'white',paddingRight:5,alignSelf:'flex-end'}}>{props.times[i]}</Text></View></View> : <View>{props.dates[i] != props.dates[i-1] ? <View style={styles.dateStyle}><Text>{props.dates[i]}</Text></View> : <View></View>}<View style={styles.msgs2} key={i}><Text key={i} onLongPress={() => this.openDialog2(i)} style={{color: 'black' ,fontSize:20,paddingLeft:10,paddingRight:10}}>{text}</Text><Text style={{color:'black',paddingRight:5,alignSelf:'flex-end'}}>{props.times[i]}</Text></View></View> : <View></View>)}
          </View>
        </ScrollView>
          <View style={{height:60,padding: 10 , paddingTop:10,paddingBottom:0, flexDirection: 'row',justifyContent: 'center',}}>
            <View style={{flex:6}}>
              <TextInput
              style={{height: 40,borderWidth: 1, borderColor: "aqua", borderRadius: 60, paddingLeft:10,paddingRight:10}}
              placeholder="  Type a message here"
              ref={input => { this.textInput = input }}
              onChangeText={(text) => props.tI(text)}
              underlineColorAndroid="transparent"
              />
            </View>
            <View style={{flex:1}}>
              <TouchableOpacity
              style={styles.difStyle}
              activeOpacity = { .5 }
              onPress={this.func2}
              >
                <Text style={{fontSize:20}}>GO</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Dialog.Container visible={props.dialogVisible}>
            <Dialog.Title>Delete Message ?</Dialog.Title>
            <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
              <Dialog.Button label="Cancel" onPress={props.handleCancel} />
              <Dialog.Button label="Delete For Me" onPress={props.handleDelete3} />
              <Dialog.Button label="Delete For Everyone" onPress={props.handleDelete} />
            </View>
          </Dialog.Container>
          <Dialog.Container visible={props.dialogVisible2}>
            <Dialog.Title>Delete Message ?</Dialog.Title>
              <Dialog.Button label="Cancel" onPress={props.handleCancel2} />
              <Dialog.Button label="Delete" onPress={props.handleDelete2} />
          </Dialog.Container>
      </View>  
  )
}
//<Icon name='sc-telegram' type='evilicon' color='#517fa4' size={40}/>
//<Button title="insert1" onPress={this.handleInsert} />
export default class App extends React.Component {
  state = {
    text: '',
    language:'',
    chat: [],
    contacts: [],
    conMessages: [],
    promptVisible: false,
    addCon: '',
    showScreen: true,
    contactsLoaded:false,
    show: '',
    senders:[],
    times:[],
    dates:[],
    keys:[],
    dialogVisible: false,
    delNum: '',
    dialogVisible2: false,
    delRecs:[],
    delSenders:[],
    contactInfo:[]
  }
  async componentDidMount() {
    // TODO: You: Do firebase things
    // const { user } = await firebase.auth().signInAnonymously();
    // console.warn('User -> ', user.toJSON());

    // await firebase.analytics().logEvent('foo', { bar: '123'});
    that = this
    //this.loadContacts();
    //this.state.contactsLoaded = true
    if (!this.state.contactsLoaded) {
      // just load the contact
      //this.loadContacts();
      //this.state.contactsLoaded = true
    }
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        varCurrentUser = that.getCurrentUser(user.email) 
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;
        this.setState({
          currentUser:that.getCurrentUser(user.email),
          name:name,
          email:email,
          uid:uid,
          signup:false,
          action:"chat"  
        })  
        this.loadContacts();
      } else {
        // No user is signed in.
        this.setState({
          signup:true,
          action:"signup"  
        }) 
      }
    })
  }
  addContactAuto = () => {
    
  }
  loadData = (val) => {
    this.setState(previousState => {
      return {chat : [], senders:[], times:[], dates:[], keys:[], delRecs:[], delSenders:[],};
    });
    let that = this
    let firebase_path = '/chatMessages/' + getName(val.replace("@","").replace(".",""), this.state.currentUser)
    let holdMessages  = "";
    this.firebase_ref = firebase.database().ref(firebase_path)
    this.firebase_ref.off("child_added")
    this.firebase_ref.on("child_added", (snapshot) => {
      that.setState((previousState) => {
        return { chat : previousState.chat.concat(snapshot.val().message) , 
          senders: previousState.senders.concat(snapshot.val().sender),
          times: previousState.times.concat(snapshot.val().time),
          dates: previousState.dates.concat(snapshot.val().date),
          keys: previousState.keys.concat(snapshot.key),
          delRecs: previousState.delRecs.concat(snapshot.val().delRec),
          delSenders: previousState.delSenders.concat(snapshot.val().delSender),}
      })
    })
    //firebase.database().goOffline()
  }
  clearChat = () => {
    let that = this
    let name = this.state.language.replace("@","").replace(".","")
    let firebase_path = '/chatMessages/' + getName(name , this.state.currentUser)
    firebase.database().ref(firebase_path).once("value")
    .then((snapshot)=> {
      snapshot.forEach(function(childSnapshot) {
        let key = childSnapshot.key;
        let refs = '/chatMessages/' + getName(name , that.state.currentUser) + '/'+key+'/';
        if(childSnapshot.val().sender === that.state.currentUser){
          firebase.database().ref(refs).update({ delSender: true });
        }else{
          firebase.database().ref(refs).update({ delRec: true });
        }
      });
    })
    this.setState(previousState => {
      return {chat : [], senders:[], times:[], dates:[], keys:[], delRecs:[], delSenders:[],};
    });
  }
  changeDelNum = (i) => {
    this.setState({ delNum: i });
  }
  showDialog = () => {
    this.setState({ dialogVisible: true });
  };
 
  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };
 
  handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    let i = this.state.delNum
    this.deleteMessage(i,this.state.keys[i])
    //this.loadData(this.state.language)
    this.setState({ dialogVisible: false });
  };
  showDialog2 = () => {
    this.setState({ dialogVisible2: true });
  };
 
  handleCancel2 = () => {
    this.setState({ dialogVisible2: false });
  };
 
  handleDelete2 = () => {
    let i = this.state.delNum
    let name = this.state.language.replace("@","").replace(".","")
    firebase.database().ref('/chatMessages/' + getName(name , this.state.currentUser) + '/'+this.state.keys[i]+'/').update({ delRec: true });
    //this.state.keys[i] this.state.delRec[i]
    this.state.delRecs[i] = true
    this.setState({ dialogVisible2: false });
  };
  handleDelete3 = () => {
    let i = this.state.delNum
    let name = this.state.language.replace("@","").replace(".","")
    firebase.database().ref('/chatMessages/' + getName(name , this.state.currentUser) + '/'+this.state.keys[i]+'/').update({ delSender: true });
    //this.state.keys[i] this.state.delRec[i]
    this.state.delSenders[i] = true
    this.setState({ dialogVisible: false });
  }
  getCurrentUser = (email) => {
      return(email.replace("@","").replace(".",""))
  }
  handleContacts = () => {
    let firebase_path = '/contacts/' + this.state.currentUser
    firebase.database().ref(firebase_path).push({
      contact:this.state.addCon,
    }).then((data)=>{
      Firebase.database().goOffline()
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    })
    this.setState(previousState => {
      return { promptVisible: false }
    })
    this.loadContacts();
  }
  loadInitialContacts = () => {
    this.setState(previousState => {
      return {contacts:[]};
    });
    
  }
  loadContacts = () => {
    if(this.state.contacts.length == 0){
      lastMessageDetailArray = []
      let that = this
      let firebase_path = '/contacts/' + this.state.currentUser
      this.firebase_ref = firebase.database().ref(firebase_path)
      this.firebase_ref.once("value").then((snapshot) => { 
        snapshot.forEach(function(data) {
          let lastMessageDetailObject = {};
          lastMessageDetailObject.contact = data.val().contact;
          lastMessageDetailObject.lastMessage = that.getLastMessage(getName(data.val().contact, that.state.currentUser));
          lastMessageDetailArray.push(lastMessageDetailObject);
          console.log(data.val().contact)
        });
        that.state.contactInfo.push(['hi','11:32','01-12-2018'])
        that.setState((previousState) => {
          return { contacts : lastMessageDetailArray}
        })
        /*that.state.contactInfo.push(['hi','11:32','01-12-2018'])
        that.setState((previousState) => {
          return { contacts : previousState.contacts.concat(snapshot.val().contact)}
        })*/
        //setTimeout(this.printlastMessageDetailObjects, 2000);
      }), function (error) {
          console.log("Error: " + error.code);
      };
    }
  }
  printlastMessageDetailObjects = () => {
    for (i=0; i< lastMessageDetailArray.length; ++i) {
      let lastMessageDetailObject = lastMessageDetailArray[i];
      Alert.alert(lastMessageDetailObject.contact);
      Alert.alert(lastMessageDetailObject.lastMessage.message);
      Alert.alert(lastMessageDetailObject.lastMessage.time);
      Alert.alert(lastMessageDetailObject.lastMessage.date);
    }
  } 
  getLastMessage = (contact) => {
    let lastMessage = { message:"Loading ...",time:"Loading ...",date:"Loading ..."}
    contact = contact.replace("@","").replace(".","")
    let firebase_path = '/chatMessages/' + contact
    let lastMsg = firebase.database().ref(firebase_path).limitToLast(1);
    lastMsg.once("child_added", function(data) {    
      lastMessage.message = data.val().message
      lastMessage.time = data.val().time
      lastMessage.date = data.val().date
    }, function (error) {
        console.log("Error: " + error.code);
    });
    return lastMessage;
  }
  lastMsgInfo = (contact) => {
    let name = contact.replace("@","").replace(".","")
    let firebase_path = '/chatMessages/' + getName(name , this.state.currentUser)
    let lastMsg = firebase.database().ref(firebase_path).limitToLast(1);
    let that = this
    lastMsg.once("child_added", function(data) {
      let array = [ data.val().message , data.val().time , data.val().date]
      Alert.alert(array.join())
      return array;
    }, function (error) {
        console.log("Error: " + error.code);
    });
    return ['hello' , '14:15' , '27-11-2018']
  }
  lastMsgInfo1 = (contact) => {
    let name = contact.replace("@","").replace(".","")
    let firebase_path = '/chatMessages/' + getName(name , this.state.currentUser)+'/'
    let lastMsg = firebase.database().ref(firebase_path).limitToLast(1);
    let array = []
    lastMsg.on("child_added", function(snapshot) {
      Alert.alert(snapshot.key + ' key')
      //Alert.alert(data.ref.parent.key)
      array.push(snapshot.val().message)
      //Alert.alert(data.val().message)
      array.push(snapshot.val().time)
      array.push(snapshot.val().date)
      //Alert.alert(array.join())
     // Alert.alert(data.val().message)
    }, function (error) {
        Alert.alert("Error: " + error.code);
    });
    //return ['msg', '14:15', '27-11-2018']
    //return array
  }
  handleInsert = () => {
    let hi = new Date()
    let date1 = (hi.getDate()<10?'0':'') + hi.getDate() + '-'+ (hi.getMonth()<10?'0':'') + (hi.getMonth()+1) + '-' + hi.getFullYear()
    let name = this.state.language.replace("@","").replace(".","")
    Alert.alert(this.state.text + ' ' + this.state.language)
    let firebase_path = '/chatMessages/' + getName(name , this.state.currentUser)
    firebase.database().ref(firebase_path).push({
      message:this.state.text,
      sender: this.state.currentUser,
      time : new Date().getHours() + ':' + (new Date().getMinutes()<10?'0':'') + new Date().getMinutes(),
      timestamp: new Date().getTime(),
      date : date1,
      delSender : false,
      delRec: false
    }).then((data)=>{
      Firebase.database().goOffline()
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    })
  }
  tI = (val) => {
    this.setState(previousState => {
      return { text: val };
    });
  }
  oCT = (val) => {
    this.setState(previousState => {
      return { addCon: `${val}` };
    });
  }
  oC = () => {
    this.setState(previousState => {
      return { promptVisible: false };
    });
  }
  pickerFunc = (val) => {
    
    /*firebase.database().goOffline()
    if (this.state.language === '')  {
      this.loadData(val)
    } else if (this.state.language !== val) {
      this.loadData(val)
    }*/
    this.loadData(val)
    this.setState(previousState => {
      return { language : val , showScreen : !previousState.showScreen};
    });
  }
  tOFunc = () => {
    this.setState(previousState => {
      return { promptVisible: true }; 
    })
  }
  
  onClick = () => {
    this.setState(previousState => {  
      return { text: '' };
    });
    if(this.state.text != ''){
      //this.state.chat.push(this.state.text)
      this.handleInsert()
      
    }else{
      Alert.alert('You need to type something')
    }
    //this.textInput.clear()
  }
  deleteContacts = (val) => {
    this.setState(previousState => {  
      return { contacts: previousState.contacts.filter(con => con != val) };
    });
    firebase_path = '/contacts/' + this.state.currentUser
    firebase.database().ref(firebase_path).once("value")
    .then((snapshot)=> {
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        if(childSnapshot.val().contact === val){
          let newPath = firebase_path + '/' + key 
          firebase.database().ref(newPath).remove()
        }
        });
    })
  }
  deleteMessage = ( i, k1) => {
    let array = this.state.chat
    array.splice(i, 1)
    this.setState(previousState => {  
      return { chat: array};
    });
    
    let name = this.state.language.replace("@","").replace(".","")
    let firebase_path = '/chatMessages/' + getName(name , this.state.currentUser)
    firebase.database().ref(firebase_path).once("value")
    .then((snapshot)=> {
 
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        if(key === k1){
          let newPath = firebase_path + '/' + key 
          firebase.database().ref(newPath).remove()
        }
        });
    })
  } 
  change = () => {
    this.loadContacts()
    this.setState(previousState => {
      return { showScreen : !previousState.showScreen}
    })
  }
  addContacts = () => {
    let ting = this.state.addCon
    let ting1 = this.state.contacts.concat(ting)
    this.setState(previousState => {
      return { promptVisible: false , contacts:ting1}
    })
  }
  setModalVisible = () => {
    this.setState(previousState => {
      return { modalVisible: !previousState.modalVisible }
    })
  }
  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState({
          action:"login"  
        })   
      })
      .catch(error => this.setState({ errorMessage: error.message }))
  }
  handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState({
          action:"chat"  
        })

      })
      .catch(error => this.setState({ errorMessage: error.message }))
  }
  handleLogout = () => {
    firebase.auth().signOut()
    .then(function() {
      this.setState({
        action:"login"  
      })
    })
    .catch(function(error) {
      // An error happened
    });
  } 
  setForLoginScreen = () => {
    this.setState({
      action:"login"  
    })  
  }
  render() {
    if (this.state.action === "signup") {
      return (
          <View style={styles.container}>
            <View style={styles.container2}>
            <Text style={{fontSize:30, fontStyle: 'italic'}}>Sign Up</Text>
            {this.state.errorMessage &&
              <Text style={{ color: 'red' }}>
                {this.state.errorMessage}
              </Text>}
            <TextInput
              placeholder="Email e.g. nathan@gmail.com"
              autoCapitalize="none"
              style={{width: 250,height: 40,borderWidth: 1, borderColor: "black", borderRadius: 60, paddingLeft:10,paddingRight:10,margin:10}}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <TextInput
              secureTextEntry
              placeholder="Password                  "
              autoCapitalize="none"
              style={{width: 250,height: 40,borderWidth: 1, borderColor: "black", borderRadius: 60,paddingLeft:10,paddingRight:10, margin:10}}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            <View style={{marginBottom:10}}><Button title="Sign Up" onPress={this.handleSignUp} /></View>
            <View><Button title="Got an account? Login" onPress={this.setForLoginScreen} /></View>
            </View>
          </View>
        
      );
   } else if (this.state.action === "login") {
    return (
      
      <View style={styles.container}>
            <View style={styles.container2}>
            <Text style={{fontSize:30, fontStyle: 'italic'}}>Login</Text>
            {this.state.errorMessage &&
              <Text style={{ color: 'red' }}>
                {this.state.errorMessage}
              </Text>}
            <TextInput
              placeholder="Email e.g. nathan@gmail.com"
              autoCapitalize="none"
              style={{width: 250,height: 40,borderWidth: 1, borderColor: "black", borderRadius: 60, paddingLeft:10,paddingRight:10,margin:10}}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <TextInput
              secureTextEntry
              placeholder="Password                  "
              autoCapitalize="none"
              style={{width: 250,height: 40,borderWidth: 1, borderColor: "black", borderRadius: 60,paddingLeft:10,paddingRight:10, margin:10}}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            <View style={{marginBottom:10}}><Button title="Login" onPress={this.handleLogin} /></View>
            </View>
          </View>
        
    );
   } else {
    return (
      <View style={{flex:1}}>
          {this.state.showScreen ? 
          <Screen1 
            contactInfo={this.state.contactInfo}
            handleLogout={this.handleLogout}
            loadContacts={this.loadContacts}
            handleContacts={this.handleContacts}
            change={this.change} 
            deleteContacts={this.deleteContacts} 
            addContacts={this.addContacts} 
            text={this.state.text} 
            language={this.state.language} 
            chat={this.state.chat} 
            contacts={this.state.contacts} 
            addCon={this.state.addCon} 
            promptVisible={this.state.promptVisible} 
            pickerFunc={this.pickerFunc} 
            tOFunc={this.tOFunc} 
            oC={this.oC} 
            oCT={this.oCT}/> : 
            <ChatScreen
            clearChat={this.clearChat}
            handleDelete3={this.handleDelete3}
            delRecs={this.state.delRecs} 
            delSenders={this.state.delSenders}
            changeDelNum={this.changeDelNum}
            dialogVisible={this.state.dialogVisible}
            showDialog={this.showDialog}
            handleDelete={this.handleDelete}
            handleCancel={this.handleCancel}
            dialogVisible2={this.state.dialogVisible2}
            showDialog2={this.showDialog2}
            handleDelete2={this.handleDelete2}
            handleCancel2={this.handleCancel2}
            deleteMessage={this.deleteMessage}
            senders={this.state.senders} 
            keys={this.state.keys}
            times={this.state.times}
            dates={this.state.dates}
            handleInsert={this.handleInsert} 
            show={this.state.show} 
            onClick={this.onClick} 
            deleteContacts={this.deleteContacts} 
            addContacts={this.addContacts} 
            text={this.state.text} 
            language={this.state.language} 
            chat={this.state.chat} 
            contacts={this.state.contacts} 
            addCon={this.state.addCon} 
            promptVisible={this.state.promptVisible} 
            pickerFunc={this.pickerFunc} 
            tOFunc={this.tOFunc} 
            oC={this.oC} 
            oCT={this.oCT} 
            tI={this.tI} 
            change={this.change}
            loadData={this.loadData}/>}
            </View>
    )
  }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    padding:10,
    shadowOffset:{  width: 10,  height: 10,  },
    shadowColor: 'black',
    shadowOpacity: 1.0,
  },
  logo: {
    height: 120,
    marginBottom: 16,
    marginTop: 64,
    padding: 10,
    width: 135,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },


  difStyle: {
    marginLeft: 5,
    marginRight: 1,
    alignItems: 'center',
    justifyContent:'center',
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderRadius:70,
    borderColor:'black',
    padding:10,
    paddingLeft: 5,
    paddingRight:5,
    paddingTop:5,
    paddingBottom:5,
  },
  difStyle2: {
    marginLeft: 1,
    marginRight: 3,
    marginBottom: 7,
    alignItems: 'center',
    alignSelf: 'center',
  },
  difStyle3: {
    padding:10,
    marginLeft: 1,
    marginRight: 1,
    backgroundColor:'white',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  touch: {
    padding:10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor:'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius:70,
    alignItems: 'center',
  },
  msgs: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#00a5ff',
    paddingTop: 0 ,
    paddingBottom: 0 ,
    marginTop:3,
    marginBottom:3,
    marginLeft: 80,
    marginRight: 10,
    alignSelf: 'flex-end',
    flexDirection: 'row'
  },
  button: {
    alignItems: 'flex-start',
    backgroundColor: 'white',
    padding: 10,
    paddingTop:10,
    paddingBottom: 10,
    marginBottom:0.5,
  },
  msgs2: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#ffe2ad',
    color:'black',
    paddingTop: 0 ,
    paddingBottom: 0 ,
    marginTop:3,
    marginBottom:3,
    marginLeft: 10,
    marginRight: 80,
    alignSelf: 'flex-start',
    flexDirection: 'row'
  },
  dateStyle: {
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 10,
    padding:10,
    alignSelf: 'center',
  }
});
