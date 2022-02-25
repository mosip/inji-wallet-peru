import React, { useEffect, useState } from 'react';
import { Asset } from 'expo-asset';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Divider, Icon, ListItem, Overlay } from 'react-native-elements';
import Markdown from 'react-native-simple-markdown'
import { Button, Text, Column, Row } from '../../components/ui';
import { Colors } from '../../components/ui/styleUtils';
const mdFile = require('../../Credits.md')

export const Credits: React.FC<CreditsProps> = (props) => {
  const [isViewing, setIsViewing] = useState(false);
  const [content, setContent] = useState("");
  const images = {
    'newlogic_logo.png' : require('../../docs/images/newlogic_logo.png'),
    'id_pass_logo.png' : require('../../docs/images/id_pass_logo.png'),
  }
  const styles = StyleSheet.create({
    buttonContainer: {
      position: 'absolute',
      left: 0,
      right: 'auto'
    },
    view: {
      flex: 1,
      width: Dimensions.get('screen').width
    },
    markdownView: {
      padding: 20
    }
  });

  const markdownStyles = {
    heading1: {
      fontSize: 24,
    },
    image: {
      maxWidth: 150
    }
  }

  const fetchLocalFile = async () => {
    let file = Asset.fromModule(mdFile)
    file = await fetch(file.uri)
    file = await file.text()
    setContent(file);
  }

  const rules = {
    image: {
      react: (node, output, state) => (
        <View key={`image-${state.key}`}>
          <Image
            style={{ width: 150, height: 50 }}
            source={images[node.target]}
            resizeMode="contain"
          />
        </View>
      ),
    }
  }

  useEffect(() => {
    (async () => {
      await fetchLocalFile();
    })();
  }, [])

  return (
    <ListItem bottomDivider onPress={() => setIsViewing(true)}>
      <ListItem.Content>
        <ListItem.Title>
          <Text>{props.label}</Text>
        </ListItem.Title>
      </ListItem.Content>
      <Overlay
        overlayStyle={{ padding: 24 }}
        isVisible={isViewing}
        onBackdropPress={() => setIsViewing(false)}>
        <View style={styles.view}>
          <Row align="center" crossAlign="center" margin="0 0 10 0">
            <View style={styles.buttonContainer}>
              <Button type="clear" icon={<Icon name="chevron-left" color={Colors.Orange} />} title="Back" onPress={() => setIsViewing(false)}/>
            </View>
            <Text size="small">Credits and legal notices</Text>
          </Row>
          <Divider />
          <View style={styles.markdownView}>
            <Markdown
              rules={rules}
              children={content}
              styles={markdownStyles}/>
          </View>
        </View>

      </Overlay>
    </ListItem>
  );
};

interface CreditsProps {
  label: string;
}
