import { Dimensions, StyleSheet } from "react-native";
import COLORS from "../../components/Pet/const/colors";

export const DIMENSION_WIDTH = Dimensions.get("window").width;
export const DIMENSION_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
  detailsContainer: {
    width: "100%",
    backgroundColor: COLORS.white,
    marginTop: 600,
    flex: 1,
    flexDirection: "column",
    borderRadius: 18,
    padding: 20,
  },

  locationInfo: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  userIdentity: {
    color: COLORS.grey,
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 2,
  },
  ownerDP: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  ownerInfo: {
    // flex: 1,
    flexDirection: "column",
  },
  ownerName: {
    color: COLORS.dark,
    fontSize: 12,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconCon: {
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  btn: {
    backgroundColor: COLORS.primary,
    flex: 1,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  topButtons: {
    flexDirection: "row",
    paddingVertical: 20,
    justifyContent: "space-between",
  },
  petDetailContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  petDetailBox: {
    width: 90,
    borderColor: COLORS.grey,
    borderWidth: 0.3,
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 12,
    justifyContent: "center",
    marginRight: 10,
    //for shadow:
    backgroundColor: "#ffffff", 
    shadowColor: "#000000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.5, 
    shadowRadius: 4, 
    elevation: 5, // Required for Android
  },
  petDetail: {
    fontSize: 12,
    color: COLORS.dark,
    fontWeight: "bold",
    textAlign: "center",
  },
  petDetailLabel: {
    color: COLORS.grey,
    fontWeight: "bold",
    paddingTop: 50,
    fontSize: 12,
    lineHeight: 20,
  },
  ownerContainer: {
    flexDirection: "row",
    paddingVertical: 30,
  },
  ownerImg: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  ownerInfoBox: {
    flex: 1,
    paddingLeft: 10,
  },
  ownerLabel: {
    color: COLORS.grey,
    fontSize: 12,
    marginTop: 2,
  },
  ownerName: {
    color: COLORS.dark,
    fontSize: 14,
    fontWeight: "bold",
  },
  ownerComment: {
    marginTop: "-10",
    fontSize: 14,
    color: COLORS.dark,
    lineHeight: 20,
    marginBottom: 30,
  },
});

export { styles };
