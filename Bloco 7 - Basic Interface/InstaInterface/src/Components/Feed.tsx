import {FlatList} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PostData} from '../../App';
import {Post} from './Post';

type FeedProps = {
  feedData: PostData[];
};
export function Feed({feedData}: FeedProps) {
  return (
    <SafeAreaView>
      <FlatList
        data={feedData}
        contentContainerStyle={{paddingBottom: 80}}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return <Post key={item.id} postData={item} />;
        }}
      />
    </SafeAreaView>
  );
}
