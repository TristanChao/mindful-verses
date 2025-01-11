import React, { useRef } from 'react';
import { Animated, View, TouchableWithoutFeedback, Image } from 'react-native';

type VerseRefreshProps = {
  onRefreshPress: () => void;
}
const VerseRefresh = ({onRefreshPress}: VerseRefreshProps) => {
  const rotateValue = useRef(new Animated.Value(0)).current;

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
      <TouchableWithoutFeedback onPress={onRefresh}>
        <Animated.Image 
          source={require('../assets/images/refresh-button.png')} 
          style={{ 
            width: 20, 
            height: 20, 
            transform: [{ rotate }]
          }} 
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default VerseRefresh;
