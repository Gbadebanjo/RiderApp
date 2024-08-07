import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Feather, Entypo, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const Account1 = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.head}>Account</Text>
      <TouchableOpacity style={styles.nameContainer} onPress={() => navigation.navigate('Account1')}>
        <View style={styles.Img}>
          <Image source={require('../../assets/Userpic.png')} />
          <View style={styles.cam} >
            <Ionicons name='camera-outline' size={22} color='#fff' />
          </View>
        </View>
        <View style={styles.namContainer}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.account}>Individual Account</Text>
          <Text style={styles.id}>User ID: 234565456755</Text>
        </View>
        <Entypo name="chevron-thin-right" size={14} color="#98A0B3"  />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Account1

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30,
        paddingHorizontal: 20,
      },
      head: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#161718',
        alignSelf: 'center',
      },
      nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F5F7FA',
        borderRadius: 10,
        width: '100%',
        height: 110,
        marginTop: 20,
      },
      Img: {
        position: 'relative',
        borderRadius: 50,
      },
      cam: {
        width: 30,
        height: 30,
        backgroundColor: '#000',
        borderRadius: 20,
        position: 'absolute',
        opacity: 0.6,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
      },
      namContainer: {
        marginLeft: 20,
        flex: 1,
        gap: 7,
        color: '#212121',
      },
      name: {
        fontSize: 22,
        fontWeight: '600',
      },
      account: {
        fontSize: 14,
      },
      id: {
        fontSize: 14,
        color: '#464646',
      },
})