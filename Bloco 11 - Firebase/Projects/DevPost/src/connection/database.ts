import firestore from '@react-native-firebase/firestore';
import {postDTO} from '../types/postDTO';
import {userDTO} from '../types/userDTO';

const usersCollection = 'users';
const postsCollection = 'posts';

export async function remoteDatabaseSetUser(user: userDTO, uid: string) {
  try {
    await firestore().collection(usersCollection).doc(uid).set(user);
  } catch (error) {
    console.log('Erro na função remoteSetUser');
  }
}
export async function remoteDatabaseGetUser(uid: string) {
  try {
    const doc = await firestore().collection(usersCollection).doc(uid).get();
    return doc.data();
  } catch (error) {
    console.log('Erro na função remoteGetUser');
  }
}

export async function remoteDatabaseAddPost(
  content: string,
  author: string,
  uid: string,
  avatarUrl: string | null,
) {
  try {
    const post: postDTO = {
      uid,
      createdAt: new Date(),
      content,
      author,
      avatarUrl,
      likes: 0,
    };
    await firestore().collection(postsCollection).add(post);
  } catch (error) {
    console.log('Erro na função remoteDatabaseAddPost');
  }
}

export async function remoteDatabaseGetPosts() {
  try {
    const response = await firestore()
      .collection(postsCollection)
      .orderBy('createdAt', 'desc')
      .limit(5)
      .get();
    const postsList: postDTO[] = response.docs.map(doc => {
      return {
        author: doc.data().author,
        avatarUrl: doc.data().avatarUrl,
        content: doc.data().content,
        likes: doc.data().likes,
        uid: doc.data().uid,
        createdAt: doc.data().createdAt,
      };
    });
    return postsList;
  } catch (error) {
    console.log('Erro na função remoteDatabaseGetPosts');
  }
}
