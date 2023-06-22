import {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {getPlansObserver} from './src/services/observers/plansObservers';

export default function App() {
  const [plans, setPlans] = useState<any[]>([]);
  useEffect(() => {
    getPlansObserver(
      setPlans,
      ['year', 'month', 'quarter', 'daily'],
      'Z69lu5jguSBQxWycC5j6',
    );
  }, []);
  return (
    <View>
      <FlatList
        data={plans}
        renderItem={({item}) => <Text>{item.data.price}</Text>}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
