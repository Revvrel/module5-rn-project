import React, { useState } from "react";
import { View, Button, Image } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../../lib/supabase";

const PetInfoUploader = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    try {
      const { uri, name } = file;
      const fileData = await readFile(uri); // You need to implement readFile function

      // Upload the file to Supabase Storage
      const { data, error } = await supabase.storage
        .from("pet_info") // Replace with your bucket name
        .upload(name, fileData);

      if (!error) setFile(data);

      if (!file) {
        alert("Please select a file");
        return;
      }

      if (error) {
        console.error("Error uploading file:", error.message);
        return;
      }

      console.log("File uploaded successfully:", data);

      // Reset file state after successful upload
      setFile(null);
      alert("File uploaded successfully");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  //   const selectFile = async () => {
  //     try {
  //       const { type } = await DocumentPicker.getDocumentAsync({
  //         type: "*/*", // Allow all file types. You can specify specific types if needed.
  //       });

  //       if (type === "success") {
  //         setFile(file);
  //       }
  //     } catch (error) {
  //       console.error("Error selecting file:", error.message);
  //     }
  //   };

  const selectFile = async () => {
    try {
      const { type, uri } = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Allow all file types. You can specify specific types if needed.
      });

      if (type === "success" && uri) {
        setFile({ uri }); // Set the file state here
      }
    } catch (error) {
      console.error("Error selecting file:", error.message);
    }
  };

  const selectImage = async () => {
    try {
      const { uri, type } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (uri) {
        setFile({ uri, name: `image_${Date.now()}.jpg`, type });
      }
    } catch (error) {
      console.error("Error selecting image:", error.message);
    }
  };

  return (
    <View>
      <Button title="Select Image" onPress={selectImage} />
      <Button title="Select PDF" onPress={selectFile} />
      {file && file.uri && (
        <Image source={{ uri: file.uri }} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Upload File" onPress={handleUpload} />
    </View>
  );
};

export default PetInfoUploader;
