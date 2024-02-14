import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { supabase } from "../lib/supabase";
import iconPic from "../assets/images/profileIcon.jpg"

export default function CameraTest() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const captureImage = async () => {
    if (permission.granted) {
      const photo = await camera.takePictureAsync({ base64: true });
      setShowCamera(false);
      setImage(photo);
      uploadImage(photo.uri);
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const arrayBuffer = await new Response(blob).arrayBuffer();
    const fileName = `public/${Date.now()}.jpg`;
    const { error } = await supabase.storage
      .from("testPhoto")
      .upload(fileName, arrayBuffer, {
        contentType: "image/jpeg",
        upsert: false,
      });
    if (error) {
      console.error("Error uploading image: ", error);
    }
    console.log("ArrayBuffer: " + arrayBuffer.byteLength);
  };

  return (
    <View style={styles.container}>
      {showCamera ? (
        <Camera
          style={styles.camera}
          type={type}
          ref={(ref) => {
            setCamera(ref);
          }}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <MaterialCommunityIcons
                name="camera-flip"
                size={36}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={captureImage}>
              <MaterialCommunityIcons name="camera" size={36} color="black" />
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ width: "100%", alignItems: "center" }}>
              {true && (
                <Pressable onPress={() => setShowCamera(true)}>
                  <Image
                    source={image}
                    style={{
                      width: 150,
                      height: 150,
                      backgroundColor: "black",
                    }}
                  />
                </Pressable>
              )}
            </View>
          </View>
        </View>
      )}
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