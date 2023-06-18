import {Avatar, FlatList, HStack, Text, View} from 'native-base';
import {feedDataType} from '../../App';

type FeedProps = {
  feed: feedDataType;
};
export function Feed({feed}: FeedProps) {
  return (
    <View>
      <FlatList
        data={feed}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <View borderWidth={1} height={'450px'} mb="4">
              <HStack p="2">
                <HStack>
                  <Avatar source={{uri: item.profileImg}} />
                  <Text fontSize="md" fontWeight="bold">
                    {item.name}
                  </Text>
                </HStack>
              </HStack>
            </View>
          );
        }}
      />
    </View>
  );
}
