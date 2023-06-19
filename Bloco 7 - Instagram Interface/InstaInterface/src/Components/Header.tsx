import {HStack, Image} from 'native-base';
import {TouchableOpacity} from 'react-native';
import uncheckedHeart from '../assets/images/like.png';
import instaLogo from '../assets/images/logo.png';
import messengerLogo from '../assets/images/messenger.png';
export function Header() {
  return (
    <HStack
      height={'16'}
      justifyContent="space-between"
      alignItems="center"
      px="4">
      <Image source={instaLogo} alt="Logo do Instagram" />
      <HStack>
        <TouchableOpacity>
          <Image
            source={uncheckedHeart}
            alt="Ícone de coração (não marcado)"
            width={30}
            height={30}
            mr="4"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={messengerLogo}
            alt="Ícone messenger"
            width={30}
            height={30}
          />
        </TouchableOpacity>
      </HStack>
    </HStack>
  );
}
