import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/styles/constants';

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  className?: string;
} & TouchableOpacityProps;

const Button: React.FC<Props> = ({
  className,
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
      className="w-11/12"
    >
      <LinearGradient
        className={`rounded-lg  w-full self-center px-4 py-2 justify-center items-center ${className}`}
        colors={[Colors.LIGHTER_GRAY, Colors.DARK_GRAY]}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={Colors.GRAY}
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
  className: '',
};

export default Button;
