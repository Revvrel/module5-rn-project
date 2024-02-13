import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"
import { StyleSheet, View, Alert, Image, Button } from "react-native"
import * as ImagePicker from "expo-image-picker"

export default function ProfilePic({ url, size = 150, onUpload }) {
  const [uploading, setUploading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(null)
  const avatarSize = { height: size, width: size }

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from("profilePhoto")
        .download(path)

      if (error) {
        throw error
      }

      const fr = new FileReader()
      fr.readAsDataURL(data)
      fr.onload = () => {
        setAvatarUrl(fr.result)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error downloading image: ", error.message)
      }
    }
  }

  async function uploadAvatar() {
    try {
      setUploading(true)

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Restrict to only images
        allowsMultipleSelection: false, // Can only select one image
        allowsEditing: true, // Allows the user to crop / rotate their photo before uploading it
        quality: 1,
        exif: false // We don't want nor need that data.
      })

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log("User cancelled image picker.")
        return
      }

      const image = result.assets[0]
      console.log("Got image", image)

      if (!image.uri) {
        throw new Error("No image uri!") // Realistically, this should never happen, but just in case...
      }

      const arraybuffer = await fetch(image.uri).then(res => res.arrayBuffer())

      const fileExt =
        image.uri
          ?.split(".")
          .pop()
          ?.toLowerCase() ?? "jpeg"
      const path = `${Date.now()}.${fileExt}`
      const { data, error: uploadError } = await supabase.storage
        .from("profilePhoto")
        .upload(path, arraybuffer, {
          contentType: image.mimeType ?? "image/jpeg"
        })

      if (uploadError) {
        throw uploadError
      }

      onUpload(data.path)
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      } else {
        throw error
      }
    } finally {
      setUploading(false)
    }
  }

  return (
    <View>
      {avatarUrl ? (
        <Image
          source={{ uri: avatarUrl }}
          accessibilityLabel="Avatar"
          style={[avatarSize, styles.avatar, styles.image]}
        />
      ) : (
        <View style={[avatarSize, styles.avatar, styles.noImage]} />
      )}
      <View>
        <Button
          title={uploading ? "Uploading ..." : "Upload"}
          onPress={uploadAvatar}
          disabled={uploading}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 5,
    overflow: "hidden",
    maxWidth: "100%"
  },
  image: {
    objectFit: "cover",
    paddingTop: 0
  },
  noImage: {
    backgroundColor: "#333",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgb(200, 200, 200)",
    borderRadius: 5
  }
})
