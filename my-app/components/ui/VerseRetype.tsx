import { StyleSheet, TextInput, View } from "react-native";
import RandVerseBox from "./RandVerseBox";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function VerseRetype() {
  const color = useThemeColor({ light: '#11181c', dark: '#ecedee' }, 'text');
  
  
  return (
    <View>
      <RandVerseBox />
      <TextInput
        style={{...styles.textInput, color: color, borderColor: color}}
        editable
        multiline
        numberOfLines={10}
        placeholder='Retype the verse above to continue'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    padding: 16,
    height: 250,
    borderWidth: 1,
    borderRadius: 8,
    fontFamily: 'QuicksandRegular',
    fontSize: 16,
  }
});