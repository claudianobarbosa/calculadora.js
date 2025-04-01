import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, StatusBar } from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  
  const handlePress = (value) => {
    setInput(input + value);
    setResult('');
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleEvaluate = () => {
  try {
    const sanitizedInput = input.replace(/x/g, '*').replace(/,/g, '.'); 
    const evalResult = eval(sanitizedInput).toString().replace('.', ','); 
    setResult(evalResult);
    setInput(evalResult);
  } catch (error) {
    setResult('Erro');
  }
};


  const handleBackspace = () => {
    setInput(input.slice(0, -1));
  };

  const handleSpace = () => {
    setInput(input + ' ');
  };

  // Componente de botão reutilizável
  const CalcButton = ({ title, onPress, color, bgColor, isOperator = false }) => {
    const buttonSize = (Dimensions.get('window').width / 4) - 15;
    
    return (
      <TouchableOpacity 
        onPress={onPress}
        style={[
          styles.button, 
          { 
            backgroundColor: bgColor || (isOperator ? '#7B2CBF' : '#5A189A'),
            width: buttonSize,
            height: buttonSize,
            shadowColor: isOperator ? '#C77DFF' : '#9D4EDD',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 6,
          }
        ]}
      >
        <Text style={[styles.buttonText, { color: color || '#FFFFFF' }]}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#10002B" barStyle="light-content" />
      
      {/* Área de display com gradiente roxo */}
      <View style={styles.displayContainer}>
        <View style={styles.displayInner}>
          <Text style={styles.inputText} numberOfLines={1}>{input || '0'}</Text>
          <Text style={styles.resultText} numberOfLines={1}>{result}</Text>
        </View>
      </View>
      
      {/* Linha decorativa */}
      <View style={styles.divider} />
      
      {/* Botões */}
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonRow}>
          <CalcButton title="C" onPress={handleClear} color="#FFFFFF" bgColor="#E0AAFF" />
          <CalcButton title="⌫" onPress={handleBackspace} color="#FFFFFF" bgColor="#E0AAFF" />
          <CalcButton title="/" onPress={() => handlePress('/')} isOperator />
        </View>
        <View style={styles.buttonRow}>
          <CalcButton title="7" onPress={() => handlePress('7')} />
          <CalcButton title="8" onPress={() => handlePress('8')} />
          <CalcButton title="9" onPress={() => handlePress('9')} />
          <CalcButton title="x" onPress={() => handlePress('x')} isOperator />
        </View>
        <View style={styles.buttonRow}>
          <CalcButton title="4" onPress={() => handlePress('4')} />
          <CalcButton title="5" onPress={() => handlePress('5')} />
          <CalcButton title="6" onPress={() => handlePress('6')} />
          <CalcButton title="-" onPress={() => handlePress('-')} isOperator />
        </View>
        <View style={styles.buttonRow}>
          <CalcButton title="1" onPress={() => handlePress('1')} />
          <CalcButton title="2" onPress={() => handlePress('2')} />
          <CalcButton title="3" onPress={() => handlePress('3')} />
          <CalcButton title="+" onPress={() => handlePress('+')} isOperator />
        </View>
        <View style={styles.buttonRow}>
          <CalcButton title="0" onPress={() => handlePress('0')} />
          <CalcButton title="," onPress={() => handlePress(',')}/>
          <CalcButton title="." onPress={() => handlePress('.')} />
          <CalcButton title="=" onPress={handleEvaluate} bgColor="#C77DFF" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10002B',
    justifyContent: 'flex-end',
  },
  displayContainer: {
    backgroundColor: '#3C096C',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    shadowColor: '#9D4EDD',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 10,
  },
  displayInner: {
    alignItems: 'flex-end',
  },
  inputText: {
    fontSize: 36,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 5,
    fontFamily: 'sans-serif-light',
  },
  resultText: {
    fontSize: 48,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
  },
  divider: {
    height: 2,
    backgroundColor: '#7B2CBF',
    width: '80%',
    alignSelf: 'center',
    marginBottom: 15,
    opacity: 0.6,
  },
  buttonsContainer: {
    paddingHorizontal: 10,
    paddingBottom: 25,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  buttonText: {
    fontSize: 28,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});