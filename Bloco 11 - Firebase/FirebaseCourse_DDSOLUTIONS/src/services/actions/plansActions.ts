import {
  addPlansAcess,
  deleteDocummentPlansAcess,
  getCollectionPlansAcess,
  getDocummentPlansAcess,
  setPlansAcess,
  updatePlansAcess,
} from '../dataAcess/plansAcess';
import {PlanType} from '../interfaces/plansInterfaces';

export async function addPlansActions(body: PlanType) {
  const response = await addPlansAcess(body);

  return response.id;
}

export async function getDocummentPlansActions(id: string) {
  const response = await getDocummentPlansAcess(id);

  if (!response.exists()) {
    console.log('Não houve retorno de dados');
    return null;
  }
  const data = response.data();
  console.log('Dados retornados: ', data);
  return data;
}

export async function getCollectionPlansActions() {
  const plansData: any[] = [];
  const res = await getCollectionPlansAcess();
  res.forEach(doc => {
    plansData.push({id: doc.id, data: doc.data()});
  });
  return plansData;
}

export async function setPlansActions(body: PlanType, docId?: string) {
  const response = await setPlansAcess(body, docId);
  return response;
}

export async function updatePlansActions(body: any, docId: string) {
  const response = await updatePlansAcess(body, docId);
  return response;
}

export async function deleteDocummentPlansActions(docId: string) {
  const response = await deleteDocummentPlansAcess(docId);
  return response;
}
