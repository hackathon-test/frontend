import Toast from "react-native-root-toast";

export function show_toast(msg) {
  Toast.show(msg, {
    duration: Toast.durations.LONG,
    position: -120,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor: '#C1E0F3',
    textColor: 'black',
    textStyle: {
      fontSize: 14
    }
  })
}