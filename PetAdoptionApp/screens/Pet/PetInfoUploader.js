import { Camera } from "expo-camera";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from '@rneui/themed';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { supabase } from "../../lib/supabase";

export default function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", marginBottom: 20 }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission"
        buttonStyle={{
          backgroundColor: '#FFB197',
          borderRadius: 50,
          padding: 15,
          height: 55,
        }}
        containerStyle={{
          width: 200,
          justifyContent: 'center',
          marginHorizontal: 120,
          marginVertical: 10,
        }}/>
      </View>
    );
  }

  const captureImage = async () => {
    if (permission.granted) {
      const photo = await camera.takePictureAsync({ base64: true });
      //console.log("photo", photo);
      uploadImage(photo.uri);
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const arrayBuffer = await new Response(blob).arrayBuffer();
    console.log("arrayBuffer", arrayBuffer.byteLength); //Tis code check if the image is captured
    const fileName = `public/${Date.now()}.jpg`;

    const { error } = await supabase.storage
      .from("pet_info")
      .upload(fileName, arrayBuffer, {
        contentType: "image/jpeg",
        upsert: false,
      });
    if (error) {
      console.error("Error uploading image: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={(ref) => {
          setCamera(ref);
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={captureImage}>
            <MaterialCommunityIcons name="camera" size={36} color="black" />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "center",
    margin: 32,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
