import {colors} from "@constants";
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: colors.plainWhite,
        paddingHorizontal: 22
    },
    formRow: {
        flexDirection:'row'
    },
    slot: {
    flex:1
},
dummySpace:{
width:20}
});
