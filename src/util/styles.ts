import {StyleSheet} from 'react-native';
import {Colors} from './colors';

export const TextStyles = StyleSheet.create({
  bodyL: {
    fontFamily: 'PT Sans',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Text,
  },
  bodyM: {
    fontFamily: 'PT Sans',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: Colors.Text,
  },
  bodyS: {
    fontFamily: 'PT Sans',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: Colors.Text,
  },
  headingL: {
    fontFamily: 'PT Sans',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 32,
    lineHeight: 40,
    color: Colors.Text,
  },
  headingM: {
    fontFamily: 'PT Sans',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 28,
    lineHeight: 36,
    color: Colors.Text,
  },
  headingS: {
    fontFamily: 'PT Sans',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 24,
    lineHeight: 32,
    color: Colors.Text,
  },
});

export const CommonStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Light0,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  cutoutContainer: {
    backgroundColor: Colors.Dark1,
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cutoutContent: {
    backgroundColor: Colors.Light0,
    display: 'flex',
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});
