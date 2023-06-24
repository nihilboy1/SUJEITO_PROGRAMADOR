import {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {
  addPlansActions,
  deleteDocummentPlansActions,
} from './src/services/actions/plansActions';
import {PlanGetType} from './src/services/interfaces/plansInterfaces';
import {getPlansObserver} from './src/services/observers/plansObservers';

export default function App() {
  const [plans, setPlans] = useState<PlanGetType[]>([]);
  useEffect(() => {
    getPlansObserver(
      setPlans,
      ['year', 'month', 'quarter', 'daily'],
      'PgoCoY6cJpZ81CFQdjlQ',
    );
  }, []);
  return (
    <View style={{padding: 5}}>
      <TouchableOpacity
        style={{
          marginTop: 10,
          marginBottom: 10,
          backgroundColor: 'blue',
          padding: 2,
          width: 80,
        }}
        onPress={() => {
          addPlansActions({
            text: 'Diário',
            type: 'daily',
            price: 1.9,
            gymId: 'PgoCoY6cJpZ81CFQdjlQ',
          });
        }}>
        <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
          Add Plan
        </Text>
      </TouchableOpacity>
      <FlatList
        data={plans}
        contentContainerStyle={{paddingBottom: 100}}
        renderItem={({item}) => (
          <View style={{borderWidth: 1, marginBottom: 8}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Price: {item.price}
            </Text>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              docID: {item.id}
            </Text>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Text: {item.text}
            </Text>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'blue'}}>
              gymID: {item.gym.id}
            </Text>
            <TouchableOpacity
              onPress={() => {
                deleteDocummentPlansActions(item.id);
              }}
              style={{
                marginTop: 10,
                backgroundColor: 'red',
                padding: 2,
                width: 80,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
