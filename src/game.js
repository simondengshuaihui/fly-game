import Phaser from 'phaser'
import config from './config'
import Boot from './scenes/boot'
import Load from './scenes/load'
import Main from './scenes/main' 
import Start from './scenes/start'
import Over from './scenes/over'
export default function startGame(){
    const game = new Phaser.Game(config)
    game.scene.add('boot', Boot)
    game.scene.add('load', Load)
    game.scene.add('main', Main)
    game.scene.add('start', Start)
    game.scene.add('voer',Over)
    game.scene.start('boot')
}