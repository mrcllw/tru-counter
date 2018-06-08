import React from 'react';
import { Alert, View, TouchableOpacity, Text, Image } from 'react-native';
import { KeepAwake } from 'expo';
import logo from './assets/logo_dark.png';

const corDoBotaoDoGanhador = '#3cba54'

export default class App extends React.Component {



  state = {
    pontoTime1: 0,
    pontoTime2: 0
  }

  adicionarPonto = (time) => {
    let timePontuado = `pontoTime${time}`
    let pontoDoTime = this.state[timePontuado] + 1
    this.setState({ [timePontuado]: pontoDoTime })
    this.verificarSeGanhou(pontoDoTime, time)
  }

  verificarSeGanhou = (ponto, time) => {
    if (ponto > 11) this.finalizarOJogo(time)
  }

  finalizarOJogo = (time) => {
    Alert.alert('Fim de jogo', 'Ganhou!',
      [{
        text: 'OK', onPress: () => {
          this.setState({ pontoTime1: 0, pontoTime2: 0 });
          this.reproduzirSomDeVitoria();
        }
      },
      { text: 'Cancelar', onPress: () => this.removerPonto(time), style: 'cancel' }],
      { cancelable: false }
    )
  }

  removerPonto = (time) => {
    let timePontuado = `pontoTime${time}`
    let pontoDoTime = this.state[timePontuado]
    if (pontoDoTime > 0) this.setState({ [timePontuado]: pontoDoTime - 1 })
  }

  reproduzirSomDeVitoria = async () => {
    const somDeVitoria = new Expo.Audio.Sound();
    await somDeVitoria.loadAsync(require('./som-de-vitoria.mp3'));
    await somDeVitoria.playAsync();
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#333333' }}>
        <KeepAwake />
        <View style={{ flex: .2, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            style={{ flex: .4, marginTop: 10 }}
            resizeMode='contain'
            source={logo}
          />
        </View>
        <View style={{ flex: .8, alignItems: 'center', justifyContent: 'flex-start'}} resizeMode='cover'>
          <TouchableOpacity style={[this.estiloBotao(this.state.pontoTime1 == 12 ? corDoBotaoDoGanhador : 'red'), {borderTopLeftRadius: 50,}]} resizeMode='cover' onPress={() => this.adicionarPonto(1)} onLongPress={() => this.removerPonto(1)}>
            <Text style={this.textoBotao()}>{this.state.pontoTime1.toString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.estiloBotao(this.state.pontoTime2 == 12 ? corDoBotaoDoGanhador : 'white'), {borderBottomRightRadius: 50,}]} resizeMode='cover' onPress={() => this.adicionarPonto(2)} onLongPress={() => this.removerPonto(2)}>
            <Text style={this.textoBotao()}>{this.state.pontoTime2.toString()}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  estiloBotao = (cor) => {
    return {
      flex: 0.47,
      alignItems: 'center',
      justifyContent: 'center',
      width: 280,
      backgroundColor: cor
    }
  }

  textoBotao = () => {
    return {
      paddingRight: 0,
      paddingLeft: 0,
      color: '#333',
      fontSize: 120,
    }
  }
}