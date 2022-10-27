import { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { Image, SafeAreaView, ScrollView, TextInput, View } from 'react-native';

import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { PositionChoice } from '../components/PositionChoice';

import { styles } from './styles';
import { POSITIONS, PositionProps } from '../utils/positions';

export function Home() {
  // Criando um estado para verificar se o usuário deu a permissão para utilizar a câmera
  const [hasCameraPermission, setHasCameraPermission] = useState(false)

  const [positionSelected, setPositionSelected] = useState<PositionProps>(POSITIONS[0]);


  useEffect(() => {
    // Solicitando ao usuário a permissão para utilizar a câmera
    Camera.requestCameraPermissionsAsync()
    .then(response => {
      setHasCameraPermission(response.granted)
    })
  }, [])



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View>
          <Header position={positionSelected} />

          <View style={styles.picture}>

            {
              // CASO hasCameraPermission seja true = <Camera />
              hasCameraPermission ? 
                <Camera 
                  style={styles.camera} 
                /> : 
              // Caso não tenha a permissão (False) do uso da câmera será utilizada uma imagem default
              <Image source={{ uri: 'https://images.gutefrage.net/media/fragen/bilder/meine-kamera-auf-windows-10-funktioniert-nicht-was-tun/0_big.jpg?v=1584606917000' }} style={styles.camera} />
            }

            <View style={styles.player}>
              <TextInput
                placeholder="Digite seu nome aqui"
                style={styles.name}
              />
            </View>
          </View>
        </View>

        <PositionChoice
          onChangePosition={setPositionSelected}
          positionSelected={positionSelected}
        />

        <Button title="Compartilhar" />
      </ScrollView>
    </SafeAreaView>
  );
}