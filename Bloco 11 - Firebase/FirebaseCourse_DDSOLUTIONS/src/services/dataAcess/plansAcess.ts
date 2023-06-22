import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import {db} from '../../firebaseConfig';

const plansCollectionRef = collection(db, 'plans');

export async function addPlansAcess(body: any) {
  const res = await addDoc(plansCollectionRef, body);
  return res;
}

// caso a referecia não aponte para nenhuma coleção/documento ja criada, ele cria uma. Se a referencia apontar para algo que ja existe, ele sobrescreve a coleção/documento com os novos dados
export async function setPlansAcess(body: any, docId?: string) {
  const res = await setDoc(doc(plansCollectionRef, docId), body);
  return res;
}

export async function getDocummentPlansAcess(docId: string) {
  const docRef = doc(plansCollectionRef, docId);
  const docSnapshot = await getDoc(docRef);
  return docSnapshot;
}

export async function getCollectionPlansAcess() {
  const querySnapshot = await getDocs(plansCollectionRef);
  return querySnapshot;
}

// caso a referencia não aponte para nenhuma coleção/documento, ele retorna um erro.
export async function updatePlansAcess(body: any, docId: string) {
  const res = await updateDoc(doc(plansCollectionRef, docId), body);
  return res;
}
