import React, {useState, useCallback, useEffect} from 'react';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import Voice from '@react-native-voice/voice';
import {GiftedChat, Composer} from 'react-native-gifted-chat';
import Tts from 'react-native-tts';
import {MaterialIcon} from '../../../utils/MaterialIcon';

function FarmAssistBot(): JSX.Element {
  const [inputMessage, setInputMessage] = useState('');
  const [outputMessage, setOutputMessage] = useState(null);
  const [messages, setMessages] = useState([]);

  const [language, setLanguage] = useState('');

  const [speech, setSpeech] = useState('');

  useEffect(() => {
    setMessages([
      {
        _id: Math.random(),
        text: 'कृपया शुरू करने के लिए भाषा चुनें',
        createdAt: new Date(),
        quickReplies: {
          type: 'radio', // or 'checkbox',
          keepIt: true,
          values: [
            {
              title: 'हिंदी',
              value: 'hindi',
            },
            {
              title: 'English',
              value: 'english',
            },
          ],
        },
        user: {
          _id: 2,
          name: 'bot',
          avatar: 'https://images.indianexpress.com/2018/01/indian-farmer.jpg',
        },
        sent: true,
        received: true,
        pending: true,
      },
      {
        _id: Math.random(),
        text: 'नमस्ते, मैं फार्म असिस्टबॉट हूं।',
        createdAt: new Date(),
        quickReplies: {
          type: 'checkbox', // or 'radio',
          values: [
            {
              title: 'Selected hindi',
              value: 'hindi',
            },
            {
              title: 'Selected english',
              value: 'english',
            },
          ],
        },
        user: {
          _id: 2,
          name: 'bot',
          avatar: 'https://images.indianexpress.com/2018/01/indian-farmer.jpg',
        },
        sent: true,
        received: true,
        // pending: true,
      },
    ]);
  }, []);

  useEffect(() => {
    Tts.setDefaultLanguage('hi-IN');

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;

    return () => Voice.destroy().then(Voice.removeAllListeners);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const handleButtonClick = () => {
    const message = {
      _id: Math.random(),
      text: inputMessage,
      createdAt: new Date(),
      user: {_id: 1, name: 'you'},
    };
    setMessages(prevMessage => GiftedChat.append(prevMessage, message));
    callChatGptAPI(inputMessage);
  };

  const callChatGptAPI = inputMessage => {
    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer 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',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo-0301',
        // prompt: inputMessage,
        messages: [{role: 'user', content: inputMessage}],
      }),
    })
      .then(response => {
        setInputMessage('');
        return response.json();
      })
      .then(data => {
        setOutputMessage(data?.choices[0]?.message.content.trim());
        console.log(
          'LANGUAGE:::::::::::::::::::::::::::::::::',
          language,
          data?.choices[0]?.message.content.trim(),
        );

        const message = {
          _id: Math.random(),
          text: data?.choices[0]?.message.content.trim(),
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'bot',
            avatar:
              'https://images.indianexpress.com/2018/01/indian-farmer.jpg',
          },
        };
        setMessages(prevMessage => GiftedChat.append(prevMessage, [message]));

        Tts.speak(data?.choices[0]?.message.content.trim(), {
          androidParams: {
            KEY_PARAM_PAN: -1,
            KEY_PARAM_VOLUME: 0.5,
            KEY_PARAM_STREAM: 'STREAM_MUSIC',
          },
        });
        // handleTranslate(data?.choices[0]?.message.content.trim(), 'hi');

        // if (language === 'hindi') {
        //   handleTranslate(data?.choices[0]?.message.content.trim(), 'hi');
        // } else {
        //   handleTranslate(data?.choices[0]?.message.content.trim(), 'en');
        // }
      })
      .catch(error => {
        console.error('Error:::::', error);
      });
  };

  const handleTextInput = (text: React.SetStateAction<string>) => {
    setInputMessage(text);
  };

  const onSpeechStart = () => {};

  const onSpeechEnd = () => {};

  const onSpeechError = () => {};

  const onSpeechResults = e => {
    setSpeech(e.value[0]);
    const message = {
      _id: Math.random(),
      text: e.value[0],
      createdAt: new Date(),
      user: {_id: 1, name: 'you'},
    };
    setMessages(prevMessage => GiftedChat.append(prevMessage, message));
    callChatGptAPI(e.value[0]);
  };

  const onSpeechPartialResults = e => {
    setSpeech(e.value[0]);
  };

  const startListening = () => {
    // You can set the locale to any language you want it to recognize, I am using Nigerian English.
    Voice.start('en-NG');
  };

  const _startRecognizing = () => {
    if (language == 'hindi') {
      Voice.start('hi-IN');
    } else {
      Voice.start('en-US');
    }
  };

  const _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const renderComposer = props => {
    // Adds a Mic Button in the text box, you can style it as you want
    return (
      <View style={{flexDirection: 'row'}}>
        <Composer
          {...props}
          text={inputMessage}
          onTextChanged={handleTextInput}
          placeholder="Type a message"
          textInputAutoFocus={true}
        />
        {/* <MicrophoneButton onPress={startListening} /> */}
        <TouchableOpacity
          onPress={() =>
            inputMessage.length > 0 ? handleButtonClick() : _startRecognizing()
          }>
          <View
            style={{
              backgroundColor: '#47A884',
              padding: 7,
              // marginRight: 10,
              // marginBottom: 20,
              borderRadius: 9999,
              width: 40,
              height: 40,
              justifyContent: 'center',
            }}>
            {inputMessage.length > 0 ? (
              <MaterialIcon size="large" color="white" name="send" />
            ) : (
              <MaterialIcon size="large" color="white" name="microphone" />
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <GiftedChat
          renderComposer={renderComposer}
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
          onInputTextChanged={() => setSpeech()}
          renderUsernameOnMessage={true}
          renderAvatarOnTop={true}
          isTyping={true}
          onQuickReply={(replies: Any[]) => {
            setLanguage(replies[0].value);
            if (replies[0].value === 'hindi') {
              const message = {
                _id: Math.random(),
                text: 'कृपया हिंदी में कुछ पूछें',
                createdAt: new Date(),
                user: {_id: 1, name: 'you'},
              };
              setMessages(prevMessage =>
                GiftedChat.append(prevMessage, message),
              );
            } else {
              const message = {
                _id: Math.random(),
                text: 'Please, Ask something in English',
                createdAt: new Date(),
                user: {_id: 1, name: 'you'},
              };
              setMessages(prevMessage =>
                GiftedChat.append(prevMessage, message),
              );
            }
          }}
          renderLoading={() => {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialIcon size="30" color="black" name="send" />
                <Text>{language}</Text>
              </View>
            );
          }}
          showUserAvatar={true}
        />
      </View>
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default FarmAssistBot;