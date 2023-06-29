import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {addPostDTO, postDTO} from '../types/postDTO';
import {userDTO} from '../types/userDTO';

const usersCollection = 'users';
const postsCollection = 'posts';

export async function firebaseSetUser(user: userDTO, uid: string) {
  try {
    await firestore().collection(usersCollection).doc(uid).set(user);
  } catch (error) {
    console.log('Erro na função remoteSetUser');
  }
}
export async function firebaseGetUser(uid: string) {
  try {
    const doc = await firestore().collection(usersCollection).doc(uid).get();
    return doc.data();
  } catch (error) {
    console.log('Erro na função remoteGetUser');
  }
}

export async function firebaseAddPost(
  content: string,
  author: string,
  uid: string,
  avatarUrl: string | null,
) {
  try {
    const post: addPostDTO = {
      uid,
      timeStamp: Date.now(),
      content,
      author,
      avatarUrl,
      usersWhoLiked: [],
    };
    await firestore().collection(postsCollection).add(post);
  } catch (error) {
    throw error;
  }
}
export async function firebaseGetOlderPostsFromAllUser(): Promise<
  [postDTO[], boolean, FirebaseFirestoreTypes.DocumentData]
> {
  try {
    const response = await firestore()
      .collection(postsCollection)
      .orderBy('timeStamp', 'desc')
      .limit(3)
      .get();
    const theresNoMorePosts = !!response.empty;
    const lastPostFromOlder = response.docs[response.docs.length - 1];
    const olderPosts: postDTO[] = response.docs.map(doc => {
      return {
        id: doc.id,
        author: doc.data().author,
        avatarUrl: doc.data().avatarUrl,
        content: doc.data().content,
        usersWhoLiked: doc.data().usersWhoLiked,
        uid: doc.data().uid,
        timeStamp: doc.data().timeStamp,
      };
    });
    return [olderPosts, theresNoMorePosts, lastPostFromOlder];
  } catch (error) {
    console.log('Erro na função firebaseGetPosts');
    throw error;
  }
}

export async function firebaseGetNewerPostsFromAllUser(
  lastPost: FirebaseFirestoreTypes.DocumentData,
): Promise<[postDTO[], boolean, FirebaseFirestoreTypes.DocumentData]> {
  try {
    const response = await firestore()
      .collection(postsCollection)
      .orderBy('timeStamp', 'desc')
      .startAfter(lastPost)
      .limit(3)
      .get();
    const lastPostFromNewer = response.docs[response.docs.length - 1];
    const theresNoMorePosts = response.empty;
    const newerPosts: postDTO[] = response.docs.map(doc => {
      return {
        id: doc.id,
        author: doc.data().author,
        avatarUrl: doc.data().avatarUrl,
        content: doc.data().content,
        usersWhoLiked: doc.data().usersWhoLiked,
        uid: doc.data().uid,
        timeStamp: doc.data().timeStamp,
      };
    });
    return [newerPosts, theresNoMorePosts, lastPostFromNewer];
  } catch (error) {
    // Lide com o erro de alguma forma, por exemplo, lançando-o novamente
    throw error;
  }
}

export async function firebaseUpdateUsersWhoLikedAPost(
  postId: string,
  usersWhoLiked: string[],
) {
  try {
    await firestore().collection(postsCollection).doc(postId).update({
      usersWhoLiked: usersWhoLiked,
    });
  } catch (error) {
    console.log('Erro na função firebaseUpdateUsersWhoLiked');
    throw error;
  }
}

export async function firebaseGetAllPostsFromAUser(uid: string) {
  const response = await firestore()
    .collection(postsCollection)
    .where('uid', '==', uid)
    .orderBy('createdAt', 'desc')
    .get();

  const userPosts: postDTO[] = response.docs.map(doc => {
    return {
      id: doc.id,
      author: doc.data().author,
      avatarUrl: doc.data().avatarUrl,
      content: doc.data().content,
      usersWhoLiked: doc.data().usersWhoLiked,
      uid: doc.data().uid,
      timeStamp: doc.data().timeStamp,
    };
  });
  return userPosts;
}
