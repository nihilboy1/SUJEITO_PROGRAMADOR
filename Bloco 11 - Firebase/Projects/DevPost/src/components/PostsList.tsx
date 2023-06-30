import {FlatList} from 'react-native';
import {postDTO} from '../types/postDTO';
import {Post} from './Post';

type PostListProps = {
  posts: postDTO[];
  getNewPosts?: () => void;
  getBasePosts: () => void;
  isLoadingPosts: boolean;
};

export function PostsList({
  posts,
  getNewPosts,
  getBasePosts,
  isLoadingPosts,
}: PostListProps) {
  return (
    <FlatList
      contentContainerStyle={{paddingBottom: 80}}
      showsVerticalScrollIndicator={false}
      data={posts}
      onEndReached={() => {
        getNewPosts && getNewPosts();
      }}
      onEndReachedThreshold={0.1}
      onRefresh={getBasePosts}
      refreshing={isLoadingPosts}
      renderItem={({item}) => {
        return <Post postData={item} />;
      }}
    />
  );
}
