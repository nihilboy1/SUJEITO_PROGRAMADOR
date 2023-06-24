import {DocumentData, DocumentReference} from 'firebase/firestore';

export interface PlanType {
  text: string;
  type: string;
  price: number;
  gymId: string;
}

export interface PlanAddType {
  text: string;
  type: string;
  price: number;
  gym: DocumentReference<DocumentData>;
}

export interface PlanGetType {
  id: string;
  text: string;
  type: string;
  price: number;
  gym: DocumentReference<DocumentData>;
}

export interface PlanGetDataType {
    text: string;
    type: string;
    price: number;
    gym: DocumentReference<DocumentData>;
  }
