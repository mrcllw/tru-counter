import React from 'react';
import { Alert, View, TouchableOpacity, Text } from 'react-native';
import { KeepAwake } from 'expo';

const corDoBotaoDoGanhador = '#3cba54'

export default class App extends React.Component {



  state = {
    pontoTime1: 0,
    pontoTime2: 0
  }

  adicionarPonto = (time) => {
    let timePontuado = `pontoTime${time}`
    let pontoDoTime = this.state[timePontuado]+1
    this.setState({ [timePontuado]: pontoDoTime })
    this.verificarSeGanhou(pontoDoTime, time)
  }

  verificarSeGanhou = (ponto, time) => {
    if(ponto > 11) this.finalizarOJogo(time)
  }

  finalizarOJogo = (time) => {
    Alert.alert ( 'Fim de jogo', 'Ganhou!',
      [ {text: 'OK', onPress: () => { 
          this.setState({ pontoTime1: 0, pontoTime2: 0 });
          this.reproduzirSomDeVitoria();
        }
      },
        {text: 'Cancelar', onPress: () => this.removerPonto(time), style: 'cancel'} ],
      { cancelable: false }
    )
  }

  removerPonto = (time) => {
    let timePontuado = `pontoTime${time}`
    let pontoDoTime = this.state[timePontuado]
    if(pontoDoTime > 0) this.setState({ [timePontuado]: pontoDoTime-1 })
  }

  reproduzirSomDeVitoria = async () => {
    const somDeVitoria = new Expo.Audio.Sound();
    await somDeVitoria.loadAsync(require('./som-de-vitoria.mp3'));
    await somDeVitoria.playAsync();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <KeepAwake/>
        <TouchableOpacity style={this.estiloBotao(this.state.pontoTime1 == 12 ? corDoBotaoDoGanhador : 'powderblue')} onPress={() => this.adicionarPonto(1)} onLongPress={() => this.removerPonto(1)}>
          <Text style={this.textoBotao()}>{this.state.pontoTime1.toString()}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={this.estiloBotao(this.state.pontoTime2 == 12 ? corDoBotaoDoGanhador : 'skyblue')} onPress={() => this.adicionarPonto(2)} onLongPress={() => this.removerPonto(2)}>
          <Text style={this.textoBotao()}>{this.state.pontoTime2.toString()}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  estiloBotao = (cor) => {
    return {
      flex: 3, 
      alignItems: 'center', 
      justifyContent:'center', 
      backgroundColor: cor
    }
  }

  textoBotao = () => {
    return {
      padding: 20,
      color: 'white',
      fontSize: 80
    }
  }
}