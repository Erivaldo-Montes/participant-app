import { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native'
import {styles} from './styles'
import {Participant} from '../../components/Participant'

export function Home(){
  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParticipantName] = useState('')

  function handleParticipantAdd(){
   if(participants.includes(participantName)){
    return Alert.alert('Participante existe', 'já existe um participante com esse nome')
   }
    setParticipants(state => [...state, participantName])
    setParticipantName('')

  }

  function handleParticipantRemove(name: string){
   Alert.alert('Remover', `Remover o participante ${name}`, [
    {
      text: 'Sim',
      onPress: () => setParticipants(state => state.filter(item => item !==name))
    },
    {
      text: 'Não', 
      style: 'cancel'
    }
   ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        nome do evento
      </Text>
      
      <Text
        style={styles.eventDate}
      >
        Sexta, 4 de julho de 2023.
      </Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          placeholder='Nome de um evento'
          placeholderTextColor='#6b6b6b'
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd }>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>
        <FlatList
          data={participants}
          keyExtractor={item => item}
          renderItem={({ item })=> (
            <Participant 
            key={item}
            name={item} 
            onRemove={handleParticipantRemove}
          />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.listEmptyText}>
              Se liga mlk.
            </Text>
          )}
        />    
       
    </View>
  )
}