import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { getLatestGames } from "./metacritic"; 

export default function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const latestGames = await getLatestGames();
        console.log("Juegos obtenidos:", latestGames);
        setGames(latestGames);
      } catch (error) {
        console.error("Error al obtener juegos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  const renderGameItem = ({ item }) => (
    <View style={styles.gameItem}>
      <Text style={styles.title}>{item.title}</Text>
      {item.img ? (
        <Image source={{ uri: item.img }} style={styles.image} />
      ) : (
        <Text style={styles.description}>No hay imagen disponible</Text>
      )}
      <Text style={styles.description}>{item.description || "Descripción no disponible"}</Text>
      <Text style={styles.score}>
        {item.score !== null ? `Puntuación: ${item.score}` : "Puntuación no disponible"}
      </Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#ffffff" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={games}
        renderItem={renderGameItem}
        keyExtractor={(item) => item.slug}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", 
    padding: 16,
    marginTop: 40, 
  },
  gameItem: {
    marginBottom: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#1e1e1e", 
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#ffffff", 
  },
  description: {
    color: "#ffffff", 
  },
  score: {
    color: "#ffffff", 
  },
  image: {
    width: "100%",
    height: 200,
    marginVertical: 10,
  },
});
