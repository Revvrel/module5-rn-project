import { StyleSheet, Text, View } from "react-native";

const PetProfileCard  = ({pet_profiles}) => { 
    const { name, breed, weight, age, gender, color, price, location } = pet_profiles; 
    return(
        <View style={StyleSheet.petProfileCard}>
            <Text>{name}</Text>
            <Text>{breed}</Text>
            <Text>{weight}</Text>
            <Text>{age}</Text>
            <Text>{gender}</Text>
            <Text>{color}</Text>
            <Text>{price}</Text>
            <Text>{location}</Text>
        </View>
    )
}

export default PetProfileCard;