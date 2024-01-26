import { APP_HEIGHT, APP_WIDTH, colors, crossPlaformShadow } from "@constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		width:'100%',
		backgroundColor: colors.plainWhite,
		alignItems:'center'
	},
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
		flexDirection:'row'
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
	emptyListWrap: {
		flex:1,
		flexGrow:1,
		height: APP_HEIGHT* 0.7,
		alignSelf:'center',
		justifyContent:'center',
		alignItems:'center'
	},
	emptyText:{
		textAlign:'center',
		fontSize: 18,
		fontWeight: '400'
	},
	cardIcon:{
		fontSize: 40,
		paddingBottom: 16
	},
	addCardText:{
		color: colors.cyan_1,
		fontSize: 18,
		fontWeight: '500',
		marginTop: 16,
	}
});
