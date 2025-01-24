import { useEffect, useState } from "react";
import { ThemedView } from "../ThemedView";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import VerseRefresh from "../VerseRefresh";

type RandVerseBoxProps = {
  isHomeBox?: boolean,
}
export default function RandVerseBox({ isHomeBox=false }: RandVerseBoxProps) {
  
  // type for random verse object returned from API
  type RandomVerse = {
    "random_verse": {
      "book_id": string,
      "book": string,
      "chapter": number,
      "verse": number,
      "text": string,
    }
  }

  // type for specific verse object returned from API
  type SpecificVerse = {
    "reference": string,
    "text": string,
  }

  // states to store random and specific verses returned from the api
  const [ randVerse, setRandVerse ] = useState<RandomVerse>({"random_verse": {"book_id": "JHN", "book": "John", "chapter": 3, "verse": 16, "text": "For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life."}});
  const [ specVerse, setSpecVerse ] = useState<SpecificVerse>();
  
  // async function to query the api for a random verse and store it to state
  // if the verse is too short, it will query for the verse that follows and add it on
  async function getRandVerse() {
    setSpecVerse(undefined);
    const response = await fetch('https://bible-api.com/data/web/random/NT');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.random_verse.text.length < 70) {
      getSpecificVerse(data.random_verse.book, data.random_verse.chapter, data.random_verse.verse, data.random_verse.verse + 1);
    }
    setRandVerse(data);
  }

  // async function to query the api for a specific verse and store it to state
  async function getSpecificVerse(book: string, chapter: number, verseStart: number, verseEnd?: number) {
    let fetchUrl;
    if (verseEnd) {
      fetchUrl = `https://bible-api.com/${book}+${chapter}:${verseStart}-${verseEnd}`;
    } else {
      fetchUrl = `https://bible-api.com/${book}+${chapter}:${verseStart}`
    }

    const response = await fetch(fetchUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setSpecVerse(data);
  }

  // a useEffect hook to query for a random verse when the component mounts
  useEffect(() => {
    getRandVerse();
  }, []);
  
  return (
    <ThemedView style={isHomeBox ? styles.stepContainer : styles.modalBox}>
      {isHomeBox && 
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          <ThemedText type='verseTitle'>
            {/* the random verse object doesn't have an easily accessible reference, so it needs to be strung together */}
            {specVerse ? 
            specVerse.reference : 
            `${randVerse.random_verse.book} ${randVerse.random_verse.chapter}:${randVerse.random_verse.verse}`}
          </ThemedText>
          <VerseRefresh onRefreshPress={getRandVerse} />
        </View>
      }
      <ThemedText>{specVerse ? specVerse.text : randVerse.random_verse.text}</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    padding: 16,
    borderRadius: 16,
  },
  modalBox: {
    display: 'flex',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
    padding: 16,
    borderRadius: 16,
    height: 250,
  },
  modalText: {
    
  }
});
