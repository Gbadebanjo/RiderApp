import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, Animated, Easing, Alert, Linking, TouchableWithoutFeedback } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useRef, useContext } from 'react';
import { FontAwesome, Ionicons, Fontisto } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { AppContext } from '../../context/AppContext';
import Toast from 'react-native-toast-message';

const InviteReferral = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(300)).current;
    const { userDetails } = useContext(AppContext);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
        if (!modalVisible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }).start();
        }
    };

    const copyToClipboard = async (text) => {
        await Clipboard.setStringAsync(text);
        Toast.show({
            type: 'success',
            text1: 'Copied to clipboard',
        });
        toggleModal();
    };

    const openSocialMedia = async (urlScheme, fallbackUrl) => {
        try {
            const supported = await Linking.canOpenURL(urlScheme);
            if (supported) {
                await Linking.openURL(urlScheme);
            } else {
                await Linking.openURL(fallbackUrl);
            }
        } catch (error) {
            console.error('An error occurred', error);
            Alert.alert('Error', 'Unable to open this link.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                    style={styles.headcontainer}
                    onPress={() => navigation.goBack()}
                >
                    <FontAwesome name="angle-left" size={24} color="#0c0c0c" />
                    <Text style={styles.head}>Invite Referral</Text>
                </TouchableOpacity>
                <View style={styles.subcontainer}>
                    <Text style={styles.texthead}>Earn 15% Off with Referrals!</Text>
                    <Text style={styles.text}>-Refer a friend and get 15% off your next 20 rides once they book! The more you refer, the more you save!</Text>
                    <Text style={styles.text}>-Discounts are non-transferable and expire, so start referring now! Terms and conditions apply</Text>
                    <View style={styles.referrallinkcontainer}>
                        <Text style={styles.referrallink}>Referral code:<Text style={styles.code}>   {userDetails.referralCode}</Text></Text>
                        <TouchableOpacity
                            onPress={toggleModal}
                            style={styles.copy}
                        >
                            <Ionicons name="share-social-outline" size={28} color="#fcfcfc" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.subcontainer}>
                    <Text style={styles.texthead}>Earn up to $10,000 for Each Referral!</Text>
                    <Text style={styles.text}>-Know a Company or Organization (including government and consulates)? Refer them and earn a commission of up to $10,000 when they contract with us! </Text>
                    <Text style={styles.text}>-Fill out the form and start earning your commission plus discounts today! Terms and conditions apply</Text>
                    <View style={styles.referrallinkcontainer}>
                        <Text style={styles.referrallink}>Referral code:<Text style={styles.code}>  {userDetails.referralCode}</Text></Text>
                        <TouchableOpacity
                            onPress={toggleModal}
                            style={styles.copy}
                        >
                            <Ionicons name="share-social-outline" size={28} color="#fcfcfc" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.notice}>
                    <FontAwesome name="exclamation-circle" size={24} color="#fff" />
                    <Text style={styles.text1}>Valid until the official launch in your City or State.</Text>
                </View>
            </ScrollView>

            <Modal
                visible={modalVisible}
                animationType="none"
                transparent={true}
                onRequestClose={toggleModal}
            >
                <TouchableWithoutFeedback onPress={toggleModal}>
                    <View style={styles.modalBackground} >
                        <Animated.View
                            style={[
                                styles.modal,
                                {
                                    transform: [{ translateY: slideAnim }],
                                },
                            ]}
                        >
                            <Text style={styles.modalTitle}>Share</Text>
                            <View style={styles.iconcontainer}>
                                <TouchableOpacity style={styles.eachicon} onPress={() => openSocialMedia('mailto:?subject=Check%20this%20out&body=Check%20out%20this%20awesome%20app%20using%20my%20referral%20code%3A%20' + userDetails.referralId.referralCode)}>
                                    <FontAwesome name="envelope" size={24} color="black" />
                                    <Text style={styles.modalText}>Email</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.eachicon}
                                    onPress={() => openSocialMedia(
                                        'whatsapp://send?text=Check%20out%20this%20awesome%20app%20using%20my%20referral%20code%3A%20' + userDetails.referralCode,
                                        'https://web.whatsapp.com/send?text=Check%20out%20this%20awesome%20app%20using%20my%20referral%20code%3A%20' + userDetails.referralCode
                                    )}
                                >
                                    <FontAwesome name="whatsapp" size={24} color="black" />
                                    <Text style={styles.modalText}>WhatsApp</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.eachicon}
                                    onPress={() => openSocialMedia(
                                        'twitter://post?message=Check%20out%20this%20awesome%20app%20using%20my%20referral%20code%3A%20' + userDetails.referralId.referralCode,
                                        'https://twitter.com/intent/tweet?text=Check%20out%20this%20awesome%20app%20using%20my%20referral%20code%3A%20' + userDetails.referralId.referralCode
                                    )}
                                >
                                    <Fontisto name="twitter" size={24} color="black" />
                                    <Text style={styles.modalText}>X</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.eachicon}
                                    onPress={() => openSocialMedia(
                                        'fb://page/123456789',
                                        'https://www.facebook.com/yourpage'
                                    )}
                                >
                                    <FontAwesome name="facebook" size={24} color="black" />
                                    <Text style={styles.modalText}>Facebook</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.eachicon}
                                    onPress={() => openSocialMedia(
                                        'apple://',
                                        'https://www.apple.com'
                                    )}
                                >
                                    <FontAwesome name="apple" size={24} color="black" />
                                    <Text style={styles.modalText}>Apple</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.lastcontainer}>
                                <TouchableOpacity style={styles.copyicon} onPress={() => copyToClipboard(userDetails.referralCode)}>
                                    <FontAwesome name="copy" size={24} color="black" />
                                    <Text style={styles.modalText}>Copy Link</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={toggleModal}>
                                    <Text style={styles.modalText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </SafeAreaView>

    )
}

export default InviteReferral

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        paddingTop: 30,
        paddingHorizontal: 20,
    },
    headcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    head: {
        fontSize: 18,
        color: '#0c0c0c',
        textAlign: 'center',
        flex: 1,
        fontWeight: '500',
    },
    subcontainer: {
        marginTop: 30,
        // backgroundColor: '#F5F7FA',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    texthead: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#212121',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: '#464646',
        marginBottom: 12,
        fontWeight: '400',
    },
    referrallinkcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        marginTop: 20,
        padding: 10,
    },
    referrallink: {
        fontSize: 16,
        color: '#161718',
    },
    code: {
        fontWeight: 'bold',
        // color: '#161718',
    },
    copy: {
        backgroundColor: '#292D32',
        borderRadius: 30,
        padding: 7,
    },
    notice: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    text1: {
        fontSize: 12,
        color: '#fff',
        marginLeft: 20,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modal: {
        backgroundColor: '#fff',
        paddingVertical: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        paddingVertical: 30,
        paddingHorizontal: 15,
    },
    iconcontainer: {
        flexDirection: 'row',
        padding: 5,
    },
    eachicon: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingVertical: 10,
    },
    modalText: {
        fontSize: 12,
        color: '#464646',
        marginTop: 5,
    },
    lastcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 30,
        paddingHorizontal: 30,
    },
    copyicon: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
})