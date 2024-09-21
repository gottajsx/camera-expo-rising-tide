import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera/legacy';
import { useRef, useState } from 'react';

export default function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.back)
  const [flashMode, setFlashMode] = useState('off')
  const cameraRef = useRef()

  const {width} =  useWindowDimensions()
  const height = Math.round((width*16) / 9)
  
  const toggleCameraType = () => {
    setType(current => 
      (current === CameraType.back) 
      ? CameraType.front 
      : 
      CameraType.back
    )
  }

  const capturePhoto = () => {

  }

  const recordMedia = () => {

  }

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
        <View styles={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={style.text}>Flip camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={capturePhoto}>
            <Text style={style.text}>Capture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={recordMedia}>
            <Text style={style.text}>Record</Text>
          </TouchableOpacity>
        </View>

      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    backgroundColor: '#000',

  },
  buttonContainer:{
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 64,
    marginBottom: 40,
    padding: 10,
    borderRadius: 30,
    top: '150%'
  },
  button:{
    flex: 1,
    alignItems:'center',
    alignSelf: 'flex-end'
  }
});
