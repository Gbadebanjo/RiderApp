import React, { useState } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { Formik } from 'formik';
import * as yup from 'yup';
import Modal from 'react-native-modal';

const validationSchema = yup.object().shape({
  code: yup
    .string()
    .length(6, 'Code must be exactly 6 digits')
    .required('Enter the 6-digit code'),
});

const CELL_COUNT = 6;

export default function Pin({ visible, onClose, onSubmit }) {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      style={styles.modal}
      swipeDirection="down"
      onSwipeComplete={onClose}
      backdropOpacity={0.5}
      onRequestClose={onClose}
    >
      <View style={styles.modalContent}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Create PIN</Text>
          <Text style={styles.subtitle}>Create a pincode to access your account</Text>
          <Formik
            initialValues={{ code: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              onSubmit(values.code);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>
                <CodeField
                  ref={ref}
                  {...props}
                  value={values.code}
                  onChangeText={handleChange('code')}
                  onSubmitEditing={() => {
                    handleSubmit();
                  }}
                  blurOnSubmit={false}
                  cellCount={CELL_COUNT}
                  rootStyle={styles.codeFieldRoot}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  onKeyPress={({ nativeEvent }) => {
                        if (nativeEvent.key === 'Enter') {
                        handleSubmit();
                        }
                  }}
                  renderCell={({ index, symbol, isFocused }) => (
                    <Text
                        key={index}
                        style={[
                            styles.cell,
                            isFocused && styles.focusCell,
                            symbol && styles.completeCell,
                        ]}
                        onLayout={getCellOnLayoutHandler(index)}
                    >
                    
                      {symbol ? '*' : (isFocused ? <Cursor /> : null)}
                    </Text>
                  )}
                />
                {errors.code && touched.code && <Text style={styles.errorText}>{errors.code}</Text>}
              </View>
            )}
          </Formik>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '50%',
  },
  container: {
    marginTop: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle:{
    width: '70%',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
  },
  codeFieldRoot: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: '#000',
    textAlign: 'center',
    marginHorizontal: 7,
  },
  focusCell: {
    borderColor: '#000',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
});
