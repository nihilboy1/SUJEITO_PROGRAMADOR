import {
  Avatar,
  HStack,
  Image as NativeBaseImage,
  Text,
  VStack,
  View,
} from 'native-base';
import {useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {PostData} from '../../App';
import bookmark from '../assets/images/bookmark.png';
import comments from '../assets/images/comment.png';
import like from '../assets/images/like.png';
import liked from '../assets/images/likeada.png';
import dots from '../assets/images/pontos.png';
import send from '../assets/images/send.png';

type PostProps = {
  postData: PostData;
};

export function Post({postData}: PostProps) {
  const [isLiked, setIsLiked] = useState<boolean>(true);

  function changeLikeState() {
    setIsLiked(!isLiked);
  }

  return (
    <View minH={'450px'} mb="2">
      <HStack p="3" alignItems="center" justifyContent="space-between">
        <HStack>
          <Avatar source={{uri: postData.profileImg}} />
          <VStack ml="2">
            <Text fontSize="md" fontWeight="bold">
              {postData.name}
            </Text>
            <Text fontSize="md" mt="-1">
              {postData.place}
            </Text>
          </VStack>
        </HStack>
        <TouchableOpacity>
          <NativeBaseImage source={dots} alt="options" height={8} width={8} />
        </TouchableOpacity>
      </HStack>
      <Image
        source={{uri: postData.postImg}}
        alt="Imagem do post"
        style={{minHeight: 350}}
      />
      <HStack justifyContent="space-between" px="4" mt="3">
        <HStack w={130} justifyContent="space-between">
          <TouchableOpacity onPress={() => changeLikeState()}>
            <Image
              style={{width: 35, height: 35}}
              source={isLiked ? liked : like}
              alt="like icon"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <NativeBaseImage
              source={comments}
              alt="comment icon"
              height={8}
              width={8}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <NativeBaseImage
              source={send}
              alt="send post icon"
              height={8}
              width={8}
            />
          </TouchableOpacity>
        </HStack>
        <TouchableOpacity>
          <NativeBaseImage
            source={bookmark}
            alt="bookmark icon"
            height={8}
            width={8}
          />
        </TouchableOpacity>
      </HStack>
      <HStack pl="4" mt="2">
        <Text>
          <Text fontWeight={'bold'}>{postData.name}</Text>
          <Text> </Text>
          <Text>{postData.description}</Text>
        </Text>
      </HStack>
      {postData.likesAmount == 1 ? (
        <HStack pl="4">
          <Text mr="1">{postData.likesAmount}</Text>
          <Text fontWeight={'bold'}>Curtida</Text>
        </HStack>
      ) : postData.likesAmount >= 2 ? (
        <HStack pl="4">
          <Text mr="1">{postData.likesAmount}</Text>
          <Text fontWeight={'bold'}>Curtidas</Text>
        </HStack>
      ) : (
        ''
      )}
    </View>
  );
}
