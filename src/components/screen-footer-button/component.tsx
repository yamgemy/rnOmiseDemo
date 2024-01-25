import {ScalingTouchable} from '@components/scaling-touchable';

import {
  View,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Text,
} from 'react-native';
import React, {FC} from 'react';

import {colors} from '@constants';
import {styles} from './styles';

interface ScreenFooterButtonProps {
  label: string;
  onPress: () => void;
  pinToBottom?: boolean;
  customButtonStyle?: ViewStyle;
  customButtonTextStyle?: TextStyle;
  isLoading?: boolean;
  spinnerColor?: string;
}
export const ScreenFooterButton: FC<
ScreenFooterButtonProps & TouchableOpacityProps
> = ({
  label,
  onPress,
  pinToBottom,
  customButtonStyle,
  customButtonTextStyle,
  isLoading = false,
  spinnerColor,
  ...props
}) => {
  const {disabled} = props;
  return (
      <View style={styles.root}>
          <ScalingTouchable
              {...props}
              onPress={onPress}
              reducedScale={0.97}
              animatedWrapStyle={[
              styles.button,
              customButtonStyle && customButtonStyle,
              pinToBottom && styles.pinToBottom,
              disabled && styles.disbledButton,
            ]}
              disabled={isLoading || false || disabled}
          >
              <>
                  {isLoading && (
                  <ActivityIndicator
                      size='small'
                      color={spinnerColor ?? colors.plainWhite}
                  />
                  )}
                  {!isLoading && (
                  <Text style={[styles.buttonText, customButtonTextStyle]}>
                      {label ?? ''}
                  </Text>
                   )}
              </>
          </ScalingTouchable>
      </View>
  );
};
