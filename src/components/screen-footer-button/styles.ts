import {colors} from '@constants';
import {APP_WIDTH} from '@constants/styles';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  root: {
    width: APP_WIDTH,
    // color: colors.grey_900,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  pinToBottom: {
    position: 'absolute',
    bottom: 0,
    marginHorizontal: 16,
  },
  button: {
    backgroundColor: colors.cyan_1,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: APP_WIDTH - (16 * 2),
    marginBottom: 15,
    alignSelf: 'center',
  },
  disbledButton: {
    backgroundColor: colors.grey_300,
  },
  buttonText: {
    width: APP_WIDTH -16 * 2,
    // height: '100%',
    textAlignVertical: 'center',
    textAlign: 'center',
    color: colors.plainWhite,
    fontSize: 18,
  },
});
