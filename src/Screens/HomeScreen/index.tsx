import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
// components
import {Container, CustomButton, CustomImage, Space} from 'src/Components';
import {navigate} from 'src/Navigators/RootNavigation';
import RouteKey from 'src/Navigators/RouteKey';
// store
import {appActions} from 'src/Store/reducers';
import {getAppState, getCurrentUser} from 'src/Store/selectors/app';
import {ITransactions} from 'src/Store/types';
// themes
import {colors, pf, ph, pw} from 'src/Themes';

const HomeScreen = ({}) => {
  const appState = useSelector(getAppState);
  const currentUser = useSelector(getCurrentUser);
  const dispatch = useDispatch();
  const [data, setData] = useState(() => {
    return appState.data[currentUser];
  });

  useFocusEffect(
    React.useCallback(() => {
      setData(appState.data[currentUser]);
    }, [appState.data, currentUser]),
  );

  const renderHistory = ({item}: {item: ITransactions; index: number}) => {
    const date = new Date(parseFloat(item.id));

    return (
      <View style={styles.item}>
        <Text>{item.to}</Text>
        <Text>
          {date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear()}
        </Text>
        <Text>{item.amount}</Text>
      </View>
    );
  };

  const navigateAddUser = () => {
    navigate(RouteKey.BeneficiaryScreen);
  };

  const logout = () => {
    dispatch(appActions.logout());
  };

  return (
    <Container
      style={styles.container}
      titileHeader="ONLINE BANKING"
      hasBack={false}
      iconRight={[
        {
          icon: 'person_add',
          onPress: navigateAddUser,
        },
      ]}>
      <Text style={styles.balanceText}>Welcome {currentUser}</Text>
      <Space height={20} />
      <View style={styles.info}>
        <View style={styles.infoLeft}>
          <Text style={styles.balanceText}>Balances</Text>
          <Text style={styles.balanceText}>{data.amount}$</Text>
        </View>
        <View style={styles.infoRight}>
          <TouchableOpacity
            style={styles.add}
            onPress={() => navigate(RouteKey.TransactionScreen)}>
            <CustomImage name="add" />
          </TouchableOpacity>
        </View>
      </View>
      <Space height={20} />
      <Text>Recent Activities</Text>
      <FlatList
        data={data.transactions}
        keyExtractor={item => item.id}
        renderItem={renderHistory}
      />
      <Space height={ph(50)} />
      <CustomButton
        style={styles.buttonLogout}
        label={[{text: 'LOG OUT', style: styles.logout}]}
        color="red"
        onPress={logout}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: pw(20),
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    width: Dimensions.get('window').width - pw(20) * 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 16,
  },
  listContainer: {
    flexGrow: 1,
    width: '100%',
  },
  info: {
    width: '100%',
    height: ph(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLeft: {
    width: '60%',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: colors.sky,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoRight: {
    width: '30%',
    justifyContent: 'center',
  },
  add: {
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: colors.red,
  },
  logout: {
    fontSize: pf(20),
    color: colors.white,
  },
  buttonLogout: {position: 'absolute', bottom: 10, width: pw(230)},
});

export default HomeScreen;
