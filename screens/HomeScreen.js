import React, { useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import Header from '../components/Header';
import CategoryChip from '../components/CategoryChip';
import ItemCard from '../components/ItemCard';

const { width } = Dimensions.get('window');

const categories = ['Roupas', 'Beleza', 'Eletrônicos', 'Livros', 'Móveis', 'Decoração', 'Esportes', 'Acessórios'];

const itemsByCategory = [
  {
    category: 'Roupas',
    items: [
      { id: 'r1', title: 'Jaqueta jeans oversized', price: 85.00, location: 'Campinas, SP', image: 'https://picsum.photos/id/1015/400/300' },
      { id: 'r2', title: 'Vestido floral midi', price: 120.00, location: 'Campinas, SP', image: 'https://picsum.photos/id/1025/400/300' },
      { id: 'r3', title: 'Camiseta básica preta', price: 35.00, location: 'Campinas, SP', image: 'https://picsum.photos/id/1032/400/300' },
    ],
  },
  {
    category: 'Beleza',
    items: [
      { id: 'b1', title: 'Paleta de sombras neutras', price: 68.00, location: 'Campinas, SP', image: 'https://picsum.photos/id/1040/400/300' },
      { id: 'b2', title: 'Batom matte nude', price: 29.90, location: 'Campinas, SP', image: 'https://picsum.photos/id/1050/400/300' },
    ],
  },

];

export default function HomeScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [0, -60],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* Header fixo com parallax */}
      <Animated.View style={[styles.headerWrapper, { transform: [{ translateY: headerTranslate }] }]}>
        <Header
          onLoginPress={() => alert('Tela de login em breve')}
          onMenuPress={() => alert('Menu sanduíche em breve')}
        />
      </Animated.View>

      <Animated.ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Troque. Reutilize. Cuide do planeta.</Text>
          <Text style={styles.bannerSubtitle}>
            Pequenas trocas criam grandes mudanças. Junte-se à comunidade que já evitou toneladas de resíduos.
          </Text>
          <TouchableOpacity style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>Saiba mais sobre sustentabilidade</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS.textLight} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="O que você quer trocar hoje?"
            placeholderTextColor={COLORS.textLight}
          />
        </View>
        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((cat) => (
              <CategoryChip key={cat} label={cat} onPress={() => alert(`Filtrar por ${cat}`)} />
            ))}
          </ScrollView>
        </View>
        {itemsByCategory.map((group) => (
          <View key={group.category} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{group.category}</Text>
            <FlatList
              data={group.items}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={{ width: 240, marginRight: 16 }}>
                  <ItemCard item={item} />
                </View>
              )}
            />
          </View>
        ))}
        <View style={styles.quizSection}>
          <Text style={styles.quizTitle}>Você sabe o impacto da reutilização?</Text>
          <Text style={styles.quizText}>Responda rápido e descubra!</Text>
          <TouchableOpacity style={styles.quizButton}>
            <Text style={styles.quizButtonText}>Fazer quiz rápido</Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  banner: {
    marginTop: 140,
    marginHorizontal: 20,
    padding: 28,
    backgroundColor: COLORS.primary + '15',
    borderRadius: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primaryDark,
    textAlign: 'center',
  },
  bannerSubtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 24,
  },
  bannerButton: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
  },
  bannerButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categorySection: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },
  quizSection: {
    margin: 20,
    padding: 28,
    backgroundColor: COLORS.primary + '10',
    borderRadius: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
  },
  quizTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.primaryDark,
    textAlign: 'center',
  },
  quizText: {
    fontSize: 16,
    color: COLORS.textLight,
    marginTop: 8,
    marginBottom: 16,
    textAlign: 'center',
  },
  quizButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  quizButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});