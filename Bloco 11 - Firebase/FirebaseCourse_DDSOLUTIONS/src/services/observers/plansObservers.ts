import {collection, doc, onSnapshot, query, where} from 'firebase/firestore';
import React from 'react';
import {db} from '../../firebaseConfig';

const plansCollectionRef = collection(db, 'plans');

export function getPlansObserver(
  callback: React.Dispatch<React.SetStateAction<any[]>>,
  plansType: string[],
  gymId: string,
) {
  const gymReference = doc(db, `academias/${gymId}`);
  const q = query(
    plansCollectionRef,
    where('type', 'not-in', plansType),
    where('gym', '==', gymReference),
  );
  const unsubscribe = onSnapshot(q, querySnapshot => {
    const plansData: any[] = [];
    querySnapshot.forEach(doc => {
      plansData.push({id: doc.id, data: doc.data()});
    });
    console.log(plansData);
    callback(plansData);
  });
}
