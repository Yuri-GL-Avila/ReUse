import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  primary: '#9F7AEA',
  primaryDark: '#6B46C1',
  background: '#FDFBF7',
  card: '#FFFFFF',
  text: '#2D3748',
  textLight: '#718096',
  border: '#E2E8F0',
  accentHeart: '#F56565',
  footerBg: '#F7F4F9',
};

const { width: screenWidth } = Dimensions.get('window');

// Banner carrossel
const bannerSlides = [
  {
    id: '1',
    title: 'Troque. Reutilize. Cuide do planeta.',
    subtitle: 'Pequenas ações geram grandes mudanças.',
    image: 'https://picsum.photos/id/1018/800/400',
  },
  {
    id: '2',
    title: 'Comunidade sustentável',
    subtitle: 'Conecte-se com quem pensa como você.',
    image: 'https://picsum.photos/id/1025/800/400',
  },
  {
    id: '3',
    title: 'Economize e ajude o meio ambiente',
    subtitle: 'Itens com nova vida, resíduos com menos destino.',
    image: 'https://picsum.photos/id/1032/800/400',
  },
];

//categorias
const categories = ['Roupas', 'Beleza', 'Eletrônicos', 'Livros', 'Móveis'];

// Itens fake
const itemsByCategory = [
  {
     category: 'Beleza',
    items: [
      { id: 'b2', title: 'Batom matte nude', price: 29.90, location: 'Campinas, SP', image: 'https://picsum.photos/id/1060/400/300' },
      { id: 'b3', title: 'Sérum facial hidratante', price: 89.90, location: 'Campinas, SP', image: 'https://picsum.photos/id/1070/400/300' },
      { id: 'b4', title: 'Máscara de cílios', price: 39.90, location: 'Campinas, SP', image: 'https://picsum.photos/id/1080/400/300' },
      { id: 'b5', title: 'Base cobertura média', price: 110.00, location: 'Campinas, SP', image: 'https://picsum.photos/id/1090/400/300' },
    ],
  },
  {
    category: 'Roupas',
    items: [
      { id: 'r1', title: 'Jaqueta jeans oversized', price: 85.00, location: 'Campinas, SP', image: '' },
      { id: 'r2', title: 'Vestido floral midi', price: 120.00, location: 'Campinas, SP', image: '' },
      { id: 'r3', title: 'Camiseta básica preta', price: 35.00, location: 'Campinas, SP', image: '' },
      { id: 'r4', title: 'Calça cargo bege', price: 95.00, location: 'Campinas, SP', image: '' },
      { id: 'r5', title: 'Blusa cropped tricô', price: 55.00, location: 'Campinas, SP', image: '' },
    ],
  },
  {
    category: 'Eletrônicos',
    items: [
      { id: 'e1', title: 'Fone de ouvido sem fio', price: 149.00, location: 'Campinas, SP', image: '' },
      { id: 'e2', title: 'Carregador portátil 10000mAh', price: 79.00, location: 'Campinas, SP', image: '' },
      { id: 'e3', title: 'Capa de celular biodegradável', price: 45.00, location: 'Campinas, SP', image: '' },
      { id: 'e4', title: 'Mini projetor portátil', price: 299.00, location: 'Campinas, SP', image: '' },
      { id: 'e5', title: 'Teclado mecânico compacto', price: 189.00, location: 'Campinas, SP', image: '' },
    ],
  },
  {
    category: 'Livros',
    items: [
      { id: 'l1', title: 'Sapiens - Yuval Harari', price: 45.00, location: 'Campinas, SP', image: '' },
      { id: 'l2', title: 'O Poder do Hábito', price: 38.00, location: 'Campinas, SP', image: '' },
      { id: 'l3', title: '1984 - George Orwell', price: 29.90, location: 'Campinas, SP', image: '' },
      { id: 'l4', title: 'Atomic Habits', price: 59.90, location: 'Campinas, SP', image: '' },
      { id: 'l5', title: 'A Arte da Guerra', price: 25.00, location: 'Campinas, SP', image: '' },
    ],
  },
  {
    category: 'Móveis',
    items: [
      { id: 'm1', title: 'Cadeira ergonômica', price: 220.00, location: 'Campinas, SP', image: '' },
      { id: 'm2', title: 'Mesa de centro madeira', price: 180.00, location: 'Campinas, SP', image: '' },
      { id: 'm3', title: 'Estante modular pequena', price: 290.00, location: 'Campinas, SP', image: '' },
      { id: 'm4', title: 'Sofá 2 lugares', price: 650.00, location: 'Campinas, SP', image: '' },
      { id: 'm5', title: 'Prateleira flutuante', price: 89.00, location: 'Campinas, SP', image: '' },
    ],
  },
];

function AnimatedItemCard({ item, fontSize }) {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View style={[styles.itemCard, { transform: [{ scale: scaleValue }] }]}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={[styles.itemTitle, { fontSize }]} numberOfLines={1}>{item.title}</Text>
          <Text style={[styles.itemPrice, { fontSize }]}>R$ {item.price.toFixed(2)}</Text>
          <Text style={[styles.itemLocation, { fontSize: fontSize - 2 }]}>{item.location}</Text>
        </View>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={22} color={COLORS.accentHeart} />
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function App() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [0, -60],
    extrapolate: 'clamp',
  });

  const cardWidth = Math.min(screenWidth * 0.8, 300);
  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Header fixo */}
      <Animated.View style={[styles.headerWrapper, { transform: [{ translateY: headerTranslate }] }]}>
        <View style={styles.header}>
          <Text style={styles.logoText}>RE.USE</Text>

          <View style={styles.rightIcons}>
            <TouchableOpacity 
              onPress={() => setFontSize(prev => prev + 2)}
              style={styles.iconButton}
            >
              <Ionicons name="add-circle-outline" size={26} color={COLORS.primary} />
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setFontSize(prev => Math.max(14, prev - 2))}
              style={styles.iconButton}
            >
              <Ionicons name="remove-circle-outline" size={26} color={COLORS.primary} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="person-circle-outline" size={28} color={COLORS.primary} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="menu" size={28} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Carrossel de banners */}
        <FlatList
          data={bannerSlides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.bannerSlide}>
              <Image source={{ uri: item.image }} style={styles.bannerImage} />
              <View style={styles.bannerOverlay}>
                <Text style={styles.bannerTitle}>{item.title}</Text>
                <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
                <TouchableOpacity style={styles.bannerButton}>
                  <Text style={styles.bannerButtonText}>Saiba mais</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        {/* Busca */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS.textLight} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="O que você quer trocar hoje?"
            placeholderTextColor={COLORS.textLight}
          />
        </View>

        {/* Categorias */}
        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((cat) => (
              <TouchableOpacity key={cat} style={styles.categoryChip}>
                <Text style={styles.categoryText}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Cards animados */}
        {itemsByCategory.map((group) => (
          <View key={group.category} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{group.category}</Text>
            <FlatList
              data={group.items}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={(props) => <AnimatedItemCard {...props} fontSize={fontSize} />}
            />
          </View>
        ))}

        {/* Quiz */}
        <View style={styles.quizSection}>
          <Text style={styles.quizTitle}>Você sabe o impacto da reutilização?</Text>
          <Text style={styles.quizText}>Responda rápido e descubra!</Text>
          <TouchableOpacity style={styles.quizButton}>
            <Text style={styles.quizButtonText}>Fazer quiz rápido</Text>
          </TouchableOpacity>
        </View>

        {/* Rodapé bonito, centralizado e responsivo */}
        <View style={styles.footer}>
          <View style={styles.footerInner}>
            <View style={styles.footerTop}>
              <Text style={styles.footerLogo}>RE.USE</Text>
              <Text style={styles.footerSlogan}>
                Reutilize. Economize. Conecte-se.
              </Text>
            </View>

            <View style={styles.footerMiddle}>
              <View style={styles.footerLinksColumn}>
                <Text style={styles.footerColumnTitle}>Navegação</Text>
                {['Início', 'Categorias', 'Sobre', 'Conscientização'].map(link => (
                  <TouchableOpacity key={link}>
                    <Text style={styles.footerLink}>{link}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.footerLinksColumn}>
                <Text style={styles.footerColumnTitle}>Suporte</Text>
                <TouchableOpacity><Text style={styles.footerLink}>Contato</Text></TouchableOpacity>
                <TouchableOpacity><Text style={styles.footerLink}>Política de Privacidade</Text></TouchableOpacity>
                <TouchableOpacity><Text style={styles.footerLink}>Termos de Uso</Text></TouchableOpacity>
              </View>

              <View style={styles.socialSection}>
                <Text style={styles.footerColumnTitle}>Siga-nos</Text>
                <View style={styles.socialIcons}>
                  <TouchableOpacity style={styles.socialButton}>
                    <Ionicons name="logo-instagram" size={28} color={COLORS.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialButton}>
                    <Ionicons name="logo-whatsapp" size={28} color={COLORS.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialButton}>
                    <Ionicons name="mail-outline" size={28} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <Text style={styles.copyright}>
              © {new Date().getFullYear()} ReUse. Todos os direitos reservados.
            </Text>
          </View>
        </View>
      </Animated.ScrollView>
    </Animated.View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
  },
  bannerSlide: {
    width: screenWidth,
    height: 300,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'center',
  },
  bannerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 8,
    textAlign: 'center',
  },
  bannerButton: {
    marginTop: 16,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
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
    backgroundColor: COLORS.card,
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
  categoryChip: {
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
  },
  categoryText: {
    color: COLORS.primaryDark,
    fontWeight: '600',
    fontSize: 15,
  },
  categorySection: {
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
  },
  itemCard: {
    width: Math.min(screenWidth * 0.8, 300),
    backgroundColor: COLORS.card,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 32,
    marginRight: 24, 
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  itemImage: {
    width: '100%',
    height: 180,
  },
  itemInfo: {
    padding: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primaryDark,
    marginTop: 4,
  },
  itemLocation: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 4,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 20,
    padding: 6,
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
  footer: {
    backgroundColor: COLORS.footerBg,
    paddingVertical: 60,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    alignItems: 'center',
  },
  footerInner: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  footerTop: {
    alignItems: 'center',
    marginBottom: 40,
  },
  footerLogo: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primaryDark,
    marginBottom: 8,
  },
  footerSlogan: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    maxWidth: 400,
  },
  footerMiddle: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  footerLinksColumn: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 16,
  },
  footerColumnTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
  },
  footerLink: {
    fontSize: 15,
    color: COLORS.textLight,
    marginBottom: 12,
  },
  socialSection: {
    alignItems: 'center',
    marginVertical: 16,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    marginHorizontal: 16,
  },
  copyright: {
    fontSize: 13,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 20,
  },
});