import {Avatar, FlatList, HStack, Image, Text, VStack, View} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {feedDataType} from '../../App';
import bookmark from '../assets/images/bookmark.png';
import comments from '../assets/images/comment.png';
import like from '../assets/images/like.png';
import dots from '../assets/images/pontos.png';
import send from '../assets/images/send.png';

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
            <View height={'450px'} mb="6">
              <HStack p="3" alignItems="center" justifyContent="space-between">
                <HStack>
                  <Avatar source={{uri: item.profileImg}} />
                  <VStack ml="2">
                    <Text fontSize="md" fontWeight="bold">
                      {item.name}
                    </Text>
                    <Text fontSize="md" mt="-1">
                      {item.place}
                    </Text>
                  </VStack>
                </HStack>
                <TouchableOpacity>
                  <Image source={dots} alt="options" height={8} width={8} />
                </TouchableOpacity>
              </HStack>
              <Image
                source={{uri: item.postImg}}
                alt="Imagem do post"
                flex={1}
              />
              <HStack justifyContent="space-between" px="4" mt="3">
                <HStack w={130} justifyContent="space-between">
                  <TouchableOpacity>
                    <Image source={like} alt="like icon" height={8} width={8} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={comments}
                      alt="comment icon"
                      height={8}
                      width={8}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={send}
                      alt="send post icon"
                      height={8}
                      width={8}
                    />
                  </TouchableOpacity>
                </HStack>
                <TouchableOpacity>
                  <Image
                    source={bookmark}
                    alt="bookmark icon"
                    height={8}
                    width={8}
                  />
                </TouchableOpacity>
              </HStack>
            </View>
          );
        }}
      />
    </View>
  );
}
