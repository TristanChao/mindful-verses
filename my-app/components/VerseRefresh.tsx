import { useThemeColor } from '@/hooks/useThemeColor';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useRef } from 'react';
import { Animated, View, Image, Pressable, useColorScheme } from 'react-native';

type VerseRefreshProps = {
  onRefreshPress: () => void;
}

// this is a button that will query for a random verse when clicked on
// it also has a spinning animation
const VerseRefresh = ({onRefreshPress}: VerseRefreshProps) => {
  const rotateValue = useRef(new Animated.Value(0)).current;
  const colorScheme = useColorScheme();

  const startRotation = () => {
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      rotateValue.setValue(0); // Reset to 0 after animation completes
    });
  };

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  function onRefresh() {
    startRotation();
    onRefreshPress();
  }

  return (
    <View>
      <Pressable onPress={onRefresh}>
        {colorScheme === 'dark' ?
          <Animated.Image 
            source={require('../assets/images/refresh-button-white.png')} 
            style={{ 
              width: 15, 
              height: 15, 
              transform: [{ rotate }],
            }} 
          />
          :
          <Animated.Image 
            source={require('../assets/images/refresh-button.png')} 
            style={{ 
              width: 15, 
              height: 15, 
              transform: [{ rotate }],
            }} />
          }
      </Pressable>
    </View>
  );
};

export default VerseRefresh;
