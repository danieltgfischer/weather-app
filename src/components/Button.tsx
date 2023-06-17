import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/styles/constants';

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  textStyle?: string;
} & TouchableOpacityProps;

const Button: React.FC<Props> = ({
  textStyle,
  loading,
  label,
  onPress,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      testID={props.testID ?? 'button'}
      className={`w-11/12 my-4 ${textStyle}`}
    >
      <LinearGradient
        className="rounded-lg w-full self-center  justify-center h-10 items-center"
        colors={[Colors.LIGHTER_GRAY, Colors.DARK_GRAY]}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={Colors.WHITE}
            testID="button-loading"
          />
        ) : (
          <Text className="text-xl text-white">{label}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  loading: undefined,
  textStyle: '',
};

export default Button;
