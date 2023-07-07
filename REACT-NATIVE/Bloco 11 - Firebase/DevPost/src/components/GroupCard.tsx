import {Text, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../theme/theme';

type GroupCardProps = {
  groupName: string;
  lastMessageContent: string;
};

export function GroupCard({groupName, lastMessageContent}: GroupCardProps) {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        backgroundColor: colors.info,
        padding: 18,
        borderRadius: 5,
        marginBottom: 10,
      }}>
      <Text
        style={{
          color: colors.text,
          fontFamily: fonts.medium,
          fontSize: 18,
          textDecorationLine: 'underline',
          lineHeight: 18,
          letterSpacing: 3,
        }}>
        {groupName}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          color: colors.text,
          fontFamily: fonts.regular,
          fontSize: 14,
          marginTop: 5,
        }}>
        {lastMessageContent}
      </Text>
    </TouchableOpacity>
  );
}
