import {NativeBaseProvider} from 'native-base';
import {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Feed} from './src/Components/Feed';
import {Header} from './src/Components/Header';
import {theme} from './theme';

const mockData = [
  {
    id: '1',
    name: 'Lucas Silva',
    place: 'Brazil',
    description: 'Mais um dia de muitos bugs :)',
    profileImg: 'https://sujeitoprogramador.com/instareact/fotoPerfil1.png',
    postImg: 'https://sujeitoprogramador.com/instareact/foto1.png',
    liked: true,
    likesAmount: 1,
  },
  {
    id: '2',
    name: 'Matheus',
    place: 'Brazil',
    description: 'Isso sim é ser raiz!!!!!',
    profileImg: 'https://sujeitoprogramador.com/instareact/fotoPerfil2.png',
    postImg: 'https://sujeitoprogramador.com/instareact/foto2.png',
    liked: false,
    likesAmount: 0,
  },
  {
    id: '3',
    name: 'Jose Augusto',
    place: 'Estados Unidos',
    description:
      'Bora trabalhar, hoje estou começando em um projeto novo aqui no sujeito, desde o backend ao frontend',
    profileImg: 'https://sujeitoprogramador.com/instareact/fotoPerfil3.png',
    postImg: 'https://sujeitoprogramador.com/instareact/foto3.png',
    liked: false,
    likesAmount: 3,
  },
  {
    id: '4',
    name: 'Gustavo Henrique',
    place: 'Japão',
    description: 'Isso sim que é TI!',
    profileImg: 'https://sujeitoprogramador.com/instareact/fotoPerfil1.png',
    postImg: 'https://sujeitoprogramador.com/instareact/foto4.png',
    liked: false,
    likesAmount: 1,
  },
  {
    id: '5',
    name: 'Guilherme',
    place: 'Brazil',
    description: 'Boa tarde galera do insta...',
    profileImg: 'https://sujeitoprogramador.com/instareact/fotoPerfil2.png',
    postImg: 'https://sujeitoprogramador.com/instareact/foto5.png',
    liked: false,
    likesAmount: 32,
  },
];

export type PostData = {
  id: string;
  name: string;
  place: string;
  description: string;
  profileImg: string;
  postImg: string;
  liked: boolean;
  likesAmount: number;
};

export default function App() {
  const [feedData, setFeedData] = useState<PostData[]>(mockData);
  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <Header />
        <Feed feedData={feedData} />
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
