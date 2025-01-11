import { Image, StyleSheet, Platform, ScrollView, View, type ViewProps } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useThemeColor } from '@/hooks/useThemeColor';
import VerseRefresh from '@/components/VerseRefresh';

export default function HomeScreen() {

  type RandomVerse = {
    "random_verse": {
      "book_id": string,
      "book": string,
      "chapter": number,
      "verse": number,
      "text": string,
    }
  }

  const [ randVerse, setRandVerse ] = useState<RandomVerse>({"random_verse": {"book_id": "JHN", "book": "John", "chapter": 3, "verse": 16, "text": "For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life."}});

  async function getRandVerse() {
    const response = await fetch('https://bible-api.com/data/web/random');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setRandVerse(data);
  }
  
  useEffect(() => {
    getRandVerse();
  }, []);

  return (
    <ScrollView style={styles.page}>
      <View style={{...styles.titleContainer, marginVertical: 16}}>
        <Image style={styles.logo} source={require('../../assets/images/logo-placeholder.png')} />
        <ThemedText type="title">Mindful Verses</ThemedText>
        {/* <HelloWave /> */}
      </View>
      <ThemedView style={styles.stepContainer}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          <ThemedText type='verseTitle'>{`${randVerse.random_verse.book} ${randVerse.random_verse.chapter}:${randVerse.random_verse.verse}`}</ThemedText>
          {/* <FontAwesome name="refresh" size={24} color={useThemeColor({ light: '#000000', dark: "#ffffff" }, 'background')} onPress={getRandVerse} /> */}
          <VerseRefresh onRefreshPress={getRandVerse} />
        </View>
        <ThemedText>{randVerse.random_verse.text}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 32,
  },
  logo: {
    height: 40,
    width: 48,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    padding: 16,
    borderRadius: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
