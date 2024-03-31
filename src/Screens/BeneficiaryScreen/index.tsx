import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Container, CustomImage} from 'src/Components';
import {ph, pw} from 'src/Themes';
import {navigate} from 'src/Navigators/RootNavigation';
import RouteKey from 'src/Navigators/RouteKey';
import {useDispatch, useSelector} from 'react-redux';
import {getAppState, getCurrentUser} from 'src/Store/selectors/app';
import {IBeneficiaries} from 'src/Store/types';
import {appActions} from 'src/Store/reducers';

const BeneficiaryScreen = () => {
  const currentUser = useSelector(getCurrentUser);
  const data = useSelector(getAppState).data[currentUser].beneficiaries;
  const dispatch = useDispatch();
  const navigateAddUser = () => {
    navigate(RouteKey.AddBeneficiaryScreen);
  };

  const onRemove = (iban: string) => {
    Alert.alert('Do you want to remove this Beneficiary', '', [
      {
        text: 'Remove',
        onPress: () => {
          dispatch(appActions.removeBeneficiary(iban));
        },
      },
      {text: 'Cancel', style: 'cancel'},
    ]);
  };

  const renderItem = ({item, index}: {item: IBeneficiaries; index: number}) => {
    const {last_name, first_name, iban} = item;
    return (
      <View style={styles.item} key={`Item-${index}`}>
        <View style={styles.itemLeft}>
          <Text>Name: {first_name + ' ' + last_name}</Text>
          <Text>Iban: {iban}</Text>
        </View>
        <View style={styles.itemRight}>
          <TouchableOpacity onPress={() => onRemove(iban)}>
            <CustomImage
              name="icon_close"
              style={{width: pw(20), height: pw(20)}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <Container
      titileHeader="Beneficiary"
      style={styles.container}
      iconRight={[
        {
          icon: 'person_add',
          onPress: navigateAddUser,
        },
      ]}>
      <FlatList
        renderItem={renderItem}
        data={data}
        keyExtractor={item => item.iban}
      />
    </Container>
  );
};

export default BeneficiaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: pw(20),
  },
  item: {
    width: '100%',
    height: ph(80),
    flexDirection: 'row',
    paddingHorizontal: pw(15),
    borderTopWidth: 0.4,
    borderBottomWidth: 0.5,
  },
  itemRight: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLeft: {flex: 4, justifyContent: 'center'},
});
