import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../utils/constants';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  
  content: {
    flex: 1,
    padding: SIZES.padding,
  },
  
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Text styles
  title: {
    fontSize: SIZES.h1,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: SIZES.margin,
  },
  
  subtitle: {
    fontSize: SIZES.h3,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: SIZES.margin,
  },
  
  body: {
    fontSize: SIZES.body1,
    fontFamily: FONTS.regular,
    color: COLORS.black,
    lineHeight: 24,
  },
  
  arabicText: {
    fontSize: SIZES.body1,
    fontFamily: FONTS.regular,
    color: COLORS.black,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  
  // Button styles
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.body1,
    fontFamily: FONTS.bold,
  },
  
  secondaryButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  
  outlineButtonText: {
    color: COLORS.primary,
    fontSize: SIZES.body1,
    fontFamily: FONTS.bold,
  },
  
  // Input styles
  input: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: SIZES.body1,
    backgroundColor: COLORS.white,
    marginVertical: 8,
    textAlign: 'right', // RTL support
  },
  
  inputLabel: {
    fontSize: SIZES.body2,
    fontFamily: FONTS.regular,
    color: COLORS.black,
    marginBottom: 4,
    textAlign: 'right',
  },
  
  // Card styles
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginVertical: 8,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  // Layout helpers
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Spacing
  marginTop: {
    marginTop: SIZES.margin,
  },
  
  marginBottom: {
    marginBottom: SIZES.margin,
  },
  
  paddingHorizontal: {
    paddingHorizontal: SIZES.padding,
  },
  
  // Error styles
  errorText: {
    color: COLORS.error,
    fontSize: SIZES.body3,
    textAlign: 'right',
    marginTop: 4,
  },
  
  successText: {
    color: COLORS.success,
    fontSize: SIZES.body3,
    textAlign: 'right',
    marginTop: 4,
  },
});
