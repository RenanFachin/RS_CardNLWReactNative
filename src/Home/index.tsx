import { useState, useEffect, useRef } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { Image, SafeAreaView, ScrollView, TextInput, View } from 'react-native';

import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { PositionChoice } from '../components/PositionChoice';

import { styles } from './styles';
import { POSITIONS, PositionProps } from '../utils/positions';

export function Home() {
  // Criando um estado para verificar se o usuário deu a permissão para utilizar a câmera
  const [hasCameraPermission, setHasCameraPermission] = useState(false)
  // Criando um estado para armazenar a foto
  const [photoURI, setPhotoURI] = useState<null | string>(null)

  const [positionSelected, setPositionSelected] = useState<PositionProps>(POSITIONS[0]);

  const cameraRef = useRef<Camera>(null)

  // Criando função assíncrona para tirar a foto
  async function handleTakePicture(){
    const photo = await cameraRef.current.takePictureAsync()

    // Guardando a foto do usuário
    setPhotoURI(photo.uri)
  }

  async function shareScreenShot(){

  }

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
              // CASO hasCameraPermission seja true = <Camera /> OU caso não haja uma foto salva no estado
              hasCameraPermission  || !photoURI ? 
                <Camera 
                  ref={cameraRef}
                  style={styles.camera}
                  type={CameraType.front} 
                /> : 
              // Caso não tenha a permissão (False) do uso da câmera será utilizada uma imagem default
              <Image 
                source={{ uri: photoURI ? photoURI : 'https://images.gutefrage.net/media/fragen/bilder/meine-kamera-auf-windows-10-funktioniert-nicht-was-tun/0_big.jpg?v=1584606917000' }} 
                style={styles.camera} 
                onLoad={shareScreenShot}
                />
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

        <Button title="Compartilhar" onPress={handleTakePicture} />
      </ScrollView>
    </SafeAreaView>
  );
}