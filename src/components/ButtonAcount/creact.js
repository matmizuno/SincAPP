import { Text,View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';



//After Addd Stack navigaton for Home



import style from './style'

// You can import supported modules from npm

// or any files within the Snack

export default function Acount() {
  const navigation = useNavigation();
  return (
    <View style={style.container}>
    <TouchableOpacity onPress={() => navigation.navigate('Acount')}> 
    <Text style={style.txtCreate}>Não possui uma conta? <Text style={style.txtColorCreat}>Cadastre-se</Text> </Text>
    </TouchableOpacity>
    
    </View>
  )
}
