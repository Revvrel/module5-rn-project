import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from "react-native";

export default function CameraTest() {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState(null);

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePhoto = async () => {
    if (cameraRef) {
      console.log("in take picture");
      try {
        let photo = await cameraRef.current.takePictureAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        return photo;
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <View style={styles.container}>
      {showCamera ? (
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.flipText}>Flip Camera </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                const r = await takePhoto();
                if (!r.cancelled) {
                  setImage(r.uri);
                }
                setShowCamera(false);
              }}
            >
              <Text style={styles.flipText}>Photo </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowCamera(false)}
            >
              <Text style={styles.flipText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        // WHEN NO CAMERA
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
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200, backgroundColor: "black" }}
                />
              )}
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowCamera(true)}
            >
              <Text>TAKE PICTURE </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  flipText: {
    color: "black",
    fontSize: 15,
  },
});
