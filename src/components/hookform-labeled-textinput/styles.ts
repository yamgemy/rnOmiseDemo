import {colors} from "@constants";
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    root: {
        width: '100%',
        flexDirection: 'column',
    },
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 8
    },
    label: {
        fontSize: 15,
        fontWeight: '500',
        lineHeight: 21,
        color: colors.plainBlack,
    },
    errorTextContainer: {
        height: 25,
        width: '100%'
    },
    errorText: {
        color: 'red'
    },
    inputWrap:{
        borderWidth: 1,
        borderColor: colors.grey_form_border,
        borderRadius: 5,
        height: 56,
        justifyContent:'center'
    },
    inputText:{
        paddingLeft: 16
    }
})