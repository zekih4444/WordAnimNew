import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function App() {
  // Создаем переменные для анимации (прозрачность и масштаб)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Запуск бесконечной анимации "дыхания" текста
    Animated.loop(
      Animated.sequence([
        // Слово плавно появляется и увеличивается
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
        // Слово плавно затухает и уменьшается
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0.3,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.9,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <View style={style.container}>
      {/* Декоративный светящийся круг на фоне */}
      <View style={style.glowCircle} />

      {/* Анимированный текст */}
      <Animated.View style={[style.animWrapper, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <Text style={style.mainText}>АНИМАЦИЯ</Text>
        <Text style={style.subText}>СЛОВА</Text>
      </Animated.View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0c', // Глубокий темный фон
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowCircle: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: (width * 0.8) / 2,
    backgroundColor: '#6200ee',
    opacity: 0.15,
    blurRadius: 50, // Настоящий размытый неон
  },
  animWrapper: {
    alignItems: 'center',
  },
  mainText: {
    fontSize: 48,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 8,
    textShadowColor: 'rgba(0, 229, 255, 0.7)', // Бирюзовое свечение текста
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  subText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#8a8a93',
    letterSpacing: 12,
    marginTop: 10,
    textTransform: 'uppercase',
  },
});