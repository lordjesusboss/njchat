import React from 'react';
import { Platform, Dimensions, Alert, StyleSheet, Text, View ,ScrollView,Button ,
  TouchableOpacity, TextInput ,KeyboardAvoidingView , StatusBar, Picker, Image} from 'react-native';
import Prompt from 'react-native-prompt-crossplatform'
import { italic } from 'ansi-colors';
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
  let hi = new Date()
  let date1 = (hi.getDate()<10?'0':'') + hi.getDate() + '-'+ (hi.getMonth()<10?'0':'') + 
            (hi.getMonth()+1) + '-' + hi.getFullYear()
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
          
          
          {props.contacts2.map((con, i) => 
            <TouchableOpacity 
            key = {i}
            style={styles.button} 
            onPress={() => props.pickerFunc(con.contact)}
            onLongPress={() => props.deleteContacts2(con.contact)}
            > 
              <View style={{flexDirection:'row',paddingBottom:10}}>
                <View style={{alignSelf: 'flex-start'}}><Text style={{fontSize:20 , fontStyle: 'italic', alignSelf: 'flex-start',}}> {con.contact} </Text></View>
                <View style={{flex:1,alignSelf: 'flex-end'}}>{con.count1.num != 0 ? <Text style={{fontSize:15, color:'green', alignSelf: 'flex-end',paddingLeft:20}}>{date1 === con.lstMsg.date ? con.lstMsg.time : con.lstMsg.date}</Text> : <Text style={{fontSize:15, color:'grey', alignSelf: 'flex-end',paddingLeft:20}}>{date1 === con.lstMsg.date ? con.lstMsg.time : con.lstMsg.date}</Text>}</View>
              </View>
              <View style={{flex:1,flexDirection: 'row'}}>
                <View style={{flex:1,alignSelf: 'flex-start'}}><Text style={{fontSize:15, color:'grey'}}>{con.lstMsg.message}</Text></View>
                <View style={{alignSelf: 'flex-end'}}>{con.count1.num != 0 ? <View style={{backgroundColor:'#00cc00', borderRadius:70, paddingTop:5, paddingLeft:6, paddingRight:6, paddingBottom:5,}}><Text style={{color: 'white'}}> {con.count1.num} </Text></View> : <Text></Text>}</View>
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
    this.textInput.clear()
  }
  func = (num) => {
    props.changeDelNum(num)
    props.showDialog()
  }
  openDialog2 = (num) => {
    props.changeDelNum(num)
    props.showDialog2()
  }
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
            {props.msgs.map((obj, i) => obj.sender === 
            varCurrentUser ? <View>{i === 0 || obj.date != props.msgs[i-1].date ? <View style={styles.dateStyle}><Text>{obj.date}</Text></View> : <View></View>}<View style={styles.msgs} key={i}><Text onLongPress={() => this.func(i)} key={i} style={{color: 'white' ,fontSize:20,paddingLeft:10,paddingRight:10}}>{obj.message}</Text><Text style={{color:'white',paddingRight:5,alignSelf:'flex-end'}}>{obj.time}</Text></View></View> : <View>{obj.read === false && ((i === 0) || (props.msgs[i-1].sender === varCurrentUser) || (props.msgs[i-1].read === true ))? <View style={{backgroundColor:'#99ccff', borderRadius: 70, alignSelf: 'center', padding: 10, margin: 10,}}><Text> Unread Messages </Text></View> : <View></View> }{i === 0 || obj.date != props.msgs[i-1].date ? <View style={styles.dateStyle}><Text>{obj.date}</Text></View> : <View></View>}<View style={styles.msgs2} key={i}><Text key={i} onLongPress={() => this.openDialog2(i)} style={{color: 'black' ,fontSize:20,paddingLeft:10,paddingRight:10}}>{obj.message}</Text><Text style={{color:'black',paddingRight:5,alignSelf:'flex-end'}}>{obj.time}</Text></View></View>)}
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
export default class App extends React.Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("Chats")
    this.contacts = firebase.firestore().collection("contacts")
    this.unsubscribe = null
    this.unContacts = null
    this.countUnread = null
  }
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
    contactInfo:[],
    read:[],
    messages: [],
    contacts2: [],
    unreadMessages: [],
  }
  async componentDidMount() {
    that = this
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
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
        this.unContacts = this.contacts.doc(varCurrentUser).onSnapshot(this.loadContacts2)
      } else {
        this.setState({
          signup:true,
          action:"signup"  
        }) 
      }
    })
  }
  getValue = (val) => {
    if (varCurrentUser > val) {
      return 'delSender';
    } else {
      return 'delRec';
  }
  }
  loadData2 = (querySnapshot) => {
    const msgs = [];
    querySnapshot.forEach((doc) => {
      const {message,time,timesstamp,date,delSender,delRec,read,sender} = doc.data();
      msgs.push({
        key: doc.id,
        doc,
        message,
        time,
        timesstamp,
        date,
        delSender,
        delRec,
        read,
        sender,
      });
    });
    this.setState({ 
      messages : msgs
   });
  }
  clearChat2 = () => {
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
      return {chat : [], senders:[], times:[], dates:[], keys:[], delRecs:[], delSenders:[], read:[]};
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
    this.deleteMessage(i,this.state.messages[i].key)
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
    let string = this.getValue(name)
    let obj = {}
    obj[string] = true;
    this.ref.doc(getName(name,this.state.currentUser)).collection('messages').doc(this.state.messages[i].key).update(obj)
    this.setState({ dialogVisible2: false });
  };
  handleDelete3 = () => {
    let i = this.state.delNum
    let name = this.state.language.replace("@","").replace(".","")
    let string = this.getValue(name)
    let obj = {}
    obj[string] = true;
    this.ref.doc(getName(name,this.state.currentUser)).collection('messages').doc(this.state.messages[i].key).update(obj)
    this.setState({ dialogVisible: false });
  }
  getCurrentUser = (email) => {
      return(email.replace("@","").replace(".",""))
  }
  handleContacts = () => {
    let prevContacts = []
    let that = this
    this.contacts.doc(varCurrentUser).get().then(function(doc) {
      if (doc.exists) {
          console.log("Document data:", doc.data());
          prevContacts = doc.data().contacts
          prevContacts.push(that.state.addCon)
          that.contacts.doc(varCurrentUser).set({
            contacts : prevContacts
          })
      }
    })
    this.setState(previousState => {
      return { promptVisible: false }
    })
    
  }
  loadInitialContacts = () => {
    this.setState(previousState => {
      return {contacts:[]};
    });
    
  }
  countUnreadMsgs2 = (val) => {
    let ting2 = val.replace("@","").replace(".","")
    let stuff = {num : 0}
    let that = this
    this.ref.doc(getName(ting2,varCurrentUser))
      .collection("messages")
      .where("read","==",false)
      .where("sender","==",ting2)
      .onSnapshot(function(querySnapshot) {
      stuff.num = querySnapshot.size
      that.setState(that.state)
    });
    return stuff
  }
  loadContacts2 = (documentSnapshot) => {
    let that = this
    let array = []
    let conArray
    if(documentSnapshot.exists){
      let conArray = documentSnapshot.data().contacts
      conArray.forEach(function(ting){
        let contactObj = {}
        contactObj.count1 = that.countUnreadMsgs2(ting)
        contactObj.contact = ting
        contactObj.lstMsg = that.getLastMessage2(ting)
        array.push(contactObj)
      })
      that.setState((previousState) => {
        return { contacts2 : array}
      })
    }else{
      this.setState({ 
        contacts2 : []
      });
    }
  }
  getLastMessage2 = (val) => {
    let ting2 = val.replace("@","").replace(".","")
    let that = this
    let lastMessage = {message: '' , time: '' , date: ''}
    this.ref.doc(getName(ting2,varCurrentUser))
    .collection("messages")
    .where(this.getValue(ting2),"==",false)
    .orderBy("timestamp","desc")
    .limit(1)
    .onSnapshot(function(querySnapshot) {
      querySnapshot.forEach((doc) => {
          const { message, time , date} = doc.data();
          lastMessage.message = message;
          lastMessage.time = time;
          lastMessage.date = date;
          that.setState(that.state)
      }); 
    });
    return lastMessage
  }
  handleInsert = () => {
    this.ref.doc(getName(this.state.language.replace("@","").replace(".",""), this.state.currentUser)).collection('messages').where("read","==",false).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        const { sender, read } = doc.data()
        if(sender != varCurrentUser){
          doc.ref.update({
            read: true
          }) 
        }
      });
    });''
    let hi = new Date()
    let date1 = (hi.getDate()<10?'0':'') + hi.getDate() + '-'+ (hi.getMonth()<10?'0':'') + (hi.getMonth()+1) + '-' + hi.getFullYear()
    let name = this.state.language.replace("@","").replace(".","")
    let firebase_path = '/chatMessages/' + getName(name , this.state.currentUser)
    this.ref.doc(getName(name , this.state.currentUser)).collection('messages').add({
      message:this.state.text,
      sender: this.state.currentUser,
      time : new Date().getHours() + ':' + (new Date().getMinutes()<10?'0':'') + new Date().getMinutes(),
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      date : date1,
      delSender : false,
      delRec: false,
      read : false
    });
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
    this.setState(previousState => {
      return {messages:[]};
    });
    this.unsubscribe = this.ref.doc(getName(val.replace("@","").replace(".",""), this.state.currentUser)).collection("messages").where(this.getValue(val.replace("@","").replace(".","")), "==",false).orderBy("timestamp", "asc").onSnapshot(this.loadData2)
    this.unContacts();
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
      this.handleInsert()
    }else{
      Alert.alert('You need to type something')
    }
  }
  deleteContacts2 = (val) => {
    let array = []
    let that = this
    this.contacts.doc(varCurrentUser).get().then(function(doc) {
      array = doc.data().contacts
      array = array.filter(con => con != val)
      that.contacts.doc(varCurrentUser).update({
        contacts: array
      }) 
    })
  } 
  deleteMessage = ( i, k1) => {
    this.setState(this.state);
    let name = this.state.language.replace("@","").replace(".","")
    this.ref.doc(getName(name,this.state.currentUser)).collection('messages').doc(k1).delete()
  }
  
  change = () => {
    this.ref.doc(getName(this.state.language.replace("@","").replace(".",""), this.state.currentUser)).collection('messages').where("read","==",false).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        const { sender, read } = doc.data()
        if(sender != varCurrentUser){
          doc.ref.update({
            read: true
          }) 
        }
      });
    });
    this.unsubscribe();
    this.unContacts = this.contacts.doc(varCurrentUser).onSnapshot(this.loadContacts2)
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
            unreadMessages={this.state.unreadMessages}
            deleteContacts2={this.deleteContacts2}
            contacts2={this.state.contacts2}
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
            msgs={this.state.messages}
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
            read={this.state.read}
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
