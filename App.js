import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera/legacy';
import { useRef, useState } from 'react';

export default function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.back)
  const [flashMode, setFlashMode] = useState('off')
  const cameraRef = useRef()

  const {width} =  useWindowDimensions()
  const height = Math.round((width*16) / 9)

  if (!permission) {
    return <View />
  }

  if (!permission.granted) {
    return(
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>You need permission to access the camera</Text>
        <Button onPress={requestPermission} title='grant permission' />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Camera
        type={type}
        ratio='16:9'
        flashMode={flashMode}
        style={{ height: height}}
        ref={cameraRef}
        autoFocus={true}
      >

      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center'
  }
});
