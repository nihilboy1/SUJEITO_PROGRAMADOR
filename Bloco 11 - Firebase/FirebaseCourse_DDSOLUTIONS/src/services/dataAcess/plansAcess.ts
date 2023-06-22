import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import {db} from '../../firebaseConfig';
import {PlanAddType, PlanType} from '../interfaces/plansInterfaces';

const plansCollectionRef = collection(db, 'plans');

export async function addPlansAcess(body: PlanType) {
  const planObject: PlanAddType = {
    text: body.text,
    price: body.price,
    type: body.type,
    gym: doc(db, `academias/${body.gymId}`),
  };
  const res = await addDoc(plansCollectionRef, planObject);
  return res;
}

// caso a referecia não aponte para nenhuma coleção/documento ja criada, ele cria uma. Se a referencia apontar para algo que ja existe, ele sobrescreve a coleção/documento com os novos dados
export async function setPlansAcess(body: PlanType, docId?: string) {
  const planObject: PlanAddType = {
    text: body.text,
    price: body.price,
    type: body.type,
    gym: doc(db, `academias/${body.gymId}`),
  };
  const res = await setDoc(doc(plansCollectionRef, docId), planObject);
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
export async function updatePlansAcess(body: PlanType, docId: string) {
  const planObject: PlanAddType = {
    text: body.text,
    price: body.price,
    type: body.type,
    gym: doc(db, `academias/${body.gymId}`),
  };
  const docRef = doc(plansCollectionRef, docId);
  const res = await updateDoc(docRef, {planObject});
  return res;
}

export async function deleteDocummentPlansAcess(docId: string) {
  const docRef = doc(plansCollectionRef, docId);
  const res = await deleteDoc(docRef);
  return res;
}
