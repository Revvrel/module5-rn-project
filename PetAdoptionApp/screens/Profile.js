import React, { useState, useEffect } from "react";
import { Button } from "@rneui/themed";
import { supabase } from "../lib/supabase";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../assets/styles/index.js";
import { Camera, CameraType } from "expo-camera";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import CameraTest from "../components/CameraTest.js";


export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [phone, setPhone] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState(null);
  const [showPasswordInputs, setShowPasswordInputs] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [changePasswordButtonVisible, setChangePasswordButtonVisible] =
    useState(true);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    fetchSession();
  }, []);

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function fetchSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setSession(session);
    setUsername(user.user_metadata.username);
    setEmail(user.email);
    setFullName(user.user_metadata.fullName);
    setDateOfBirth(user.user_metadata.dateOfBirth);
    setPhone(user.phone);
    // console.log(user);
  }

  async function getProfile() {
    try {
      setLoading(true);
      if (!session) {
        console.error("No active session");
        return;
      }

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`avatar_url`)
        .eq("id", session.user.id)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setAvatarUrl(data.avatar_url);
        console.log(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigation.navigate("BlankPage");
    }
    if (error) {
      alert(error.message);
    }
  }

  async function handleUpdateUser() {
    if (!session) {
      console.error("No active session");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert("Password not match");
      return;
    }

    try {
      const { data, error } = await supabase.auth.updateUser({
        phone: phone,
        password: newPassword,
        data: { fullName: fullName },
      });
      if (error) {
        throw error;
      }
      alert("Success", "Profile updated successfully");
      setShowPasswordInputs(false);
      setChangePasswordButtonVisible(true);
    } catch (error) {
      alert(error.message);
    }
  }

  const handleChangePassword = () => {
    setShowPasswordInputs(true);
    setChangePasswordButtonVisible(false);
  };

  // ALL THE FUNCTIONS FOR CAMERA AND STORING OF IMAGE TO SUPABASE

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", paddingBottom: 20 }}>
          We need your permission to show the camera
        </Text>
        <Button buttonStyle={{
          backgroundColor: "#FFB197",
          borderRadius: 50,
          padding: 15,
          height: 55,
        }}
        containerStyle={{
          width: 200,
          justifyContent: "center",
          marginHorizontal: 90,
          marginVertical: 10,
          }}
          onPress={requestPermission} title="Grant Permission" />
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
    const fileName = session.user.id+`/${Date.now()}.jpg`;
    const { error } = await supabase.storage
      .from("profilePhoto")
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
    <ScrollView>

      <View style={styles.container}>
      <View style={{ marginVertical: 10 }} />
      <Text style={styles.h1}>{username}'s Profile</Text>
      {showCamera ? (
        <Camera
          style={stylesCamera.camera}
          type={type}
          ref={(ref) => {
            setCamera(ref);
          }}
        >
          <View style={stylesCamera.buttonContainer}>
            <TouchableOpacity style={stylesCamera.button} onPress={toggleCameraType}>
              <MaterialCommunityIcons
                name="camera-flip"
                size={36}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity style={stylesCamera.button} onPress={captureImage}>
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
                      borderRadius: 100,
                      backgroundColor: "black",
                    }}
                  />
                </Pressable>
              )}
            </View>
          </View>
        </View>
      )}

        <View style={styles.profileDetailContainer}>
          

          <View style={{ marginVertical: 10 }} />
          

          <Text style={styles.inputLabel}>Full Name: </Text>
          <TextInput
            value={fullName}
            autoComplete="off"
            autoCorrect={false}
            onChangeText={setFullName}
            style={styles.input}
          />
          
      
          <Text style={styles.inputLabel}>Email: </Text>
          <TextInput value={email} editable={false} style={styles.input} />
          
          <Text style={styles.inputLabel}>Phone Number:</Text>
          <TextInput
            value={phone}
            autoComplete="off"
            autoCorrect={false}
            onChangeText={setPhone}
            style={styles.input}
          />

          <Text style={styles.inputLabel}>Date Of Birth:</Text>
          <TextInput value={dateOfBirth} editable={false} style={styles.input} />
          
          <View style={{ marginVertical: 10 }} />

      {showPasswordInputs && (
        <View>
          <Text style={styles.inputLabel}>Change Password</Text>
          <TextInput
            placeholder="Enter new password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            style={styles.input}
          />
          <TextInput
            placeholder="Confirm new password"
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>
          )}
          

      {changePasswordButtonVisible && (
        <Button
          title="Change Password"
          onPress={handleChangePassword}
          buttonStyle={{
            backgroundColor: "#FFB197",
            borderRadius: 50,
            padding: 15,
            height: 55,
          }}
          containerStyle={{
            width: 200,
            justifyContent: "center",
            marginHorizontal: 90,
          }}
        />
      )}
      <View style={{ marginVertical: 10 }} />
      <Button
        title="Update"
        onPress={handleUpdateUser}
        buttonStyle={{
          backgroundColor: "#FFB197",
          borderRadius: 50,
          padding: 15,
          height: 55,
        }}
        containerStyle={{
          width: 200,
          justifyContent: "center",
          marginHorizontal: 90,
          marginVertical: 10,
        }}
      />
          <View style={{ marginVertical: 10 }} />
        
      
          
        <TouchableOpacity
           onPress={handleLogout}
        >
          <Text style={[styles.link, {textAlign: 'center'}]}>Logout</Text>
          </TouchableOpacity>
          
          <View style={{ marginVertical: 10 }} />




        </View> 
        </View>
    </ScrollView>
  );
}

const stylesCamera = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    height: "80%",
    width: "100%",
  },
  buttonContainer: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
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
