import {collection, doc, onSnapshot, query, where} from 'firebase/firestore';
import React from 'react';
import {db} from '../../firebaseConfig';
import {PlanGetDataType, PlanGetType} from '../interfaces/plansInterfaces';

const plansCollectionRef = collection(db, 'plans');

export function getPlansObserver(
  callback: React.Dispatch<React.SetStateAction<PlanGetType[]>>,
  plansType: string[],
  gymId: string,
) {
  const gymReference = doc(db, `academias/${gymId}`);
  const q = query(
    plansCollectionRef,
    where('type', 'in', plansType),
    where('gym', '==', gymReference),
  );
  const unsubscribe = onSnapshot(q, querySnapshot => {
    const plansData: PlanGetType[] = [];
    querySnapshot.forEach(doc => {
      plansData.push({...(doc.data() as PlanGetDataType), id: doc.id});
    });
    console.log(plansData);
    callback(plansData);
  });
}
