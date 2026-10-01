import { StyleSheet } from "react-native";

export const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  input: {
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    color: "black",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 8,
    minHeight: 44,
  },

  card: {
    margin: 10,
    padding: 10,
    // backgroundColor: "lightgray",
    borderRadius: 15,
    // shadowColor: "#001933",
    backgroundColor: "#4287f5",
    width: "90%",
  },
  text: {
    color: "#ffffff",
  },
  label: {
    color: "#ffffff",
    marginBottom: 5,
    marginLeft: 15,
  },
  button: {
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  splash: {
    backgroundColor: "#4287f5",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  splashText: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
    fontFamily: "",
    fontStyle: "italic",
  },
});
