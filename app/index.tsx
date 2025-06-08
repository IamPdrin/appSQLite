import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { selectUsuarios, deleteUsuario } from './banco/crud';
import { Link, useRouter } from 'expo-router';

export default function Index() {
  const [usuarios, setUsuarios] = useState([]);
  const router = useRouter();

  async function exibirUsuarios() {
    const dados = await selectUsuarios();
    setUsuarios(dados);
  }

  useEffect(() => {
    exibirUsuarios();
  }, []);

  async function handleDelete(id: number) {
    Alert.alert(
      'Confirmar',
      'Tem certeza que deseja excluir este usuário?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: async () => {
            await deleteUsuario(id);
            await exibirUsuarios();
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuários</Text>
      
      <Link href="/cadastro" asChild>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Cadastrar Novo Usuário</Text>
        </TouchableOpacity>
      </Link>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.nome}</Text>
              <Text style={styles.userEmail}>{item.email}</Text>
            </View>
            <View style={styles.actions}>
              <Link href={`/editar/${item.id}`} asChild>
                <TouchableOpacity style={styles.editButton}>
                  <Text>Editar</Text>
                </TouchableOpacity>
              </Link>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.deleteButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => router.push('/login')}
              >
                <Text style={styles.deleteButtonText}>Sair</Text>
              </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    marginBottom: 25,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  userItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  userEmail: {
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    backgroundColor: '#FFC107',
    padding: 8,
    borderRadius: 4,
    minWidth: 60,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 8,
    borderRadius: 4,
    minWidth: 60,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
  },
});