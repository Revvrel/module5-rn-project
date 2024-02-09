import { StyleSheet, Text, View } from "react-native";

const PetProfileCard  = ({pet_profiles}) => { 
    const { name, breed, weight } = pet_profiles; 
    return(
        <View style={StyleSheet.petProfileCard}>
            <Text>{name}</Text>
            <Text>{breed}</Text>
            <Text>{weight}</Text>
        </View>
    )
}

export default PetProfileCard;