import { Colors } from '@/styles/constants';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

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
      className={`border-r-8 px-4 py-2 justify-center items-center ${className}`}
      onPress={onPress}
      testID={props.testID ?? 'button'}
    >
      <LinearGradient colors={[Colors.LIGHTER_GRAY, Colors.DARK_GRAY]}>
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
