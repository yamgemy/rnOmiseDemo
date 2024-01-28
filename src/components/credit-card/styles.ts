import { APP_WIDTH, colors, crossPlaformShadow } from "@constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	card:{
		padding: 31,
		width: APP_WIDTH - 52,
		borderRadius: 13,
		...crossPlaformShadow(6),
		height: 179,
		backgroundColor:colors.plainWhite,
		marginVertical: 15,
		marginHorizontal: 10
	},
	cardRow:{
		flexDirection:'row',
		width:'100%',
	},
	cardNum:{
		fontSize: 24.1,
		fontWeight: '400',
		opacity: 0.5,
		marginVertical: 15.7
	},
	subTitleLabels:{
		color: colors.grey_200,
		fontSize: 10,
		fontWeight: '500'
	},
	subTitleValue:{
		color: colors.plainBlack,
		fontSize: 10,
		fontWeight: '500'
	},
});
