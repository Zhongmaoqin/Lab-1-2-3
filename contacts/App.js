// In App.js in a new project
import * as React from 'react';
import { View, Text, Button, FlatList, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function HomeScreen({ navigation, route }) {


  const [contactList, updateList] = React.useState([{
    id: 1,
    name: 'Tom',
    phone: 119
  }]);

  React.useEffect(() => {
    if (route.params) {
      const { name, phone } = route.params;
      let listData = [...contactList];
      listData.push({
        name, phone,
        id: listData.length + 1
      })
      updateList(listData)
    }
  }, [route.params])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
      <Text style={{
        padding: 15,
        fontSize: 40,
        fontWeight: 'bold'
      }}>Contacts</Text>

      <Button title='ADD' onPress={() => {
        navigation.navigate('AddView')
      }}></Button>

      <FlatList
        data={contactList}
        renderItem={({ item }) => {
          return (
            <View style={{
              borderBottomColor: 1,
              borderBottomColor: '#eee',
              width: 300,
              paddingTop: 10,
              paddingBottom: 10,
              borderBottomWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <Text style={{
                  marginRight: 10
                }}>Id: {item.id}</Text>
                <Text style={{
                  marginRight: 10
                }}>Name: {item.name}</Text>
                <Text>Phone: {item.phone}</Text>
              </View>
              <View>
                <Button title='delete' onPress={() => {
                  let listData = [...contactList];
                  listData.splice(Number(item.id) - 1, 1)
                  updateList(listData)
                }}></Button>
              </View>
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />

    </View>
  );
}

function AddView({ navigation }) {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');

  return (
    <View style={{ flex: 1, alignItems: 'center', }}>
      <View style={{
        flexDirection: 'row',
        padding: 30
      }}>
        <Text>Name:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => setName(text)}
          value={name}
        />
      </View>
      <View style={{
        flexDirection: 'row',
        paddingBottom: 30
      }}>
        <Text>Phone:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => setPhone(text)}
          value={phone}
        />
      </View>
      <Button
        title="ADD"
        onPress={() => {
          if (!name) {
            console.log('name is empty')
            return
          }
          if (!phone) {
            console.log('phone is empty')
            return
          }
          navigation.navigate('Home', {
            name,
            phone
          })
        }}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddView" component={AddView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;