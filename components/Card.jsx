import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
// import Icon from 'react-native-vector-icons/Feather';

import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const iconMap = {
  Feather: FeatherIcon,
  MaterialCommunityIcons: MaterialIcon,
  AntDesign: AntDesignIcon,
  FontAwesome5:FontAwesome5,
};

const Card = ({ data1, data2, namee1, namee2, icon1, icon2, iconLib1 = 'Feather',
  iconLib2 = 'Feather' }) => {
  const Icon1 = iconMap[iconLib1] || FeatherIcon;
  const Icon2 = iconMap[iconLib2] || FeatherIcon;

  return (
    // <View style={styles.cardWrapper}>
    <BlurView
      style={styles.card}
      blurType="light" // light | dark | extraLight | extraDark
      blurAmount={10}
      reducedTransparencyFallbackColor="white"
    >
      <View>
        <View style={styles.content}>
          {/* <Icon style={styles.sunRiseIcon} name={icon1} size={25} color="#fff" /> */}
          {icon1 && <Icon1 style={styles.icon} name={icon1} size={25} color="#fff" />}
          <Text style={styles.text}>{namee1}: {data1}</Text>
        </View>
        {data2 !== undefined && (
          <View style={styles.content}>
            {icon2 && <Icon2 style={styles.icon} name={icon2} size={25} color="#fff" />}
            <Text style={styles.text}>{namee2}: {data2}</Text>
          </View>
        )}
      </View>
    </BlurView>
  );
};

export default Card;

const styles = StyleSheet.create({


  card: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
    width: 180,
    borderRadius: 20,
    // backgroundColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(106, 20, 109, 0)',
  },
  content: {
    flexDirection: 'row',
    gap: 7,
  },
  text: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  sunRiseIcon: {
    marginBottom: 10,
  },
});
