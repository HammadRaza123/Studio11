import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    // flex: 1,
    height:height(100),
    alignItems: 'center',
    backgroundColor: AppColors.textColor,
  },
  whiteText: {
    color: AppColors.white,
    fontSize: width(4),
    textAlign: 'left'
  },
  highlightedDay: {
    borderRadius: width(4),
    borderColor: AppColors.primaryGold,
    borderWidth: width(.50),
    color: AppColors.white,
    width: width(8),
    height: width(8),
    paddingHorizontal: width(1.5),
    paddingVertical: width(1.5)
  },
  headingContainer: {
    marginVertical: height(2),
    alignSelf: 'flex-start',
    width: '100%',
    marginHorizontal: width(8)
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  } 
});
export default styles;
