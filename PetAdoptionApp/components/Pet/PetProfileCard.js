import { StyleSheet, Text, View } from "react-native";

const PetProfileCard  = ({pet_profiles}) => {
    return(
        <View style={StyleSheet.petprofilecard}>
            <Text>{pet_profiles.name}</Text>
            <Text>{pet_profiles.breed}</Text>
            <Text>{pet_profiles.weight}</Text>
        </View>
    )
}

export default PetProfileCard;