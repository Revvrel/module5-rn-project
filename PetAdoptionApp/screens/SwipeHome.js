import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SwipeHome = () => {
  //const [swiper, setSwiper] = useState < CardStack | null > (null);

  const navigation = useNavigation();

  return (
    <View>
      <View>
        <Text>SwipeHome!</Text>
        <View style={{ paddingTop: 30 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PetInfo");
            }}
          >
            <Text style={{ color: "blue" }}>Go to pet info page</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SwipeHome;
