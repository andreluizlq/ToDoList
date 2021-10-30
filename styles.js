import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
  },

  Body: {
    flex: 1,
  },

  Title: {
    fontWeight: "bold",
    fontSize: 24,
    paddingTop: 50,
    paddingBottom: 30,
  },

  Form: {
    padding: 0,
    height: 60,
    justifyContent: "center",
    alignSelf: "stretch",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 13,
  },

  Input: {
    width: 246,
    height: 45,
    backgroundColor: "#FFFFFF",
    borderRadius: 60,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#FFFFFF",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },

  Button: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c6cce",
    borderRadius: 52,
    marginLeft: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },

  FlatList: {
    flex: 1,
    marginTop: 5,
  },

  ContainerView: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#FFFFFF",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },

  Texto: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
  },
});

export default styles;
