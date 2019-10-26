import Phaser from 'phaser'
export default class Enemy{
    constructor(config){
        this.config = config
    }
    init(){
        const config = this.config
        // 敌人
        this.enemys = config.game.physics.add.group()
        // 敌人的子弹
        this.enemyBullets = config.game.physics.add.group();
        // 敌人的随机位置范围
        this.maxWidth = config.game.game.config.width - config.bulletY/2
        // 定时产生敌人
        config.game.time.addEvent({ startAt:1,delay: config.selfTimeInterval*1000, callback: this.generateEnemy, callbackScope: this, loop: true });
        // 敌人的爆炸效果动画创建
        this.explosions = config.game.add.group();
        config.game.anims.create({
            key: config.explodePic,
            frames: config.game.anims.generateFrameNumbers(config.explodePic, { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 1,
            hideOnComplete:true
        });
    }
    generateEnemy(){
        const config = this.config
        this.enemy = this.enemys.getFirstDead(true,Phaser.Math.Between(0,this.maxWidth),0,config.selfPic).setOrigin(0,0)
        // console.log(this.enemy,this.maxWidth)
        this.enemy.enableBody(true,Phaser.Math.Between(0,this.maxWidth),0,true,true)
        this.outOfBoundsKill(this.enemy)
        this.enemy.life = config.life
        this.enemy.setVelocity(0,config.velocity)
    }
    // 敌人开火
    enemyFire(){
        const config = this.config
       this.enemys.children.iterate((enemy)=>{
            if(enemy.active && new Date().getTime() > (enemy.bulletTime || 0)){
                let bullet = this.enemyBullets.getFirstDead(true,enemy.x,enemy.y,config.bulletPic)
                try {config.firesound.play()} catch(e) {} // 播放声音
                this.outOfBoundsKill(bullet)
                bullet.enableBody(true,enemy.x+enemy.width/2, enemy.y+enemy.height/2,true,true)
                bullet.setVelocity(0,config.bulletVelocity)
                enemy.bulletTime = new Date().getTime() + config.bulletTimeInterval
            }
       })
    }
    hitEnemy(myBullet,enemy){
        const config = this.config
        myBullet.setActive(false)
        myBullet.setVisible(false)
        enemy.life--;
        if(enemy.life<=0){
            try {
                config.crashsound.play();
              } catch(e) {}
            let explosion = this.explosions.getFirstDead(true,enemy.x,enemy.y,config.explodePic).setOrigin(0,0)
            explosion.setPosition(enemy.x, enemy.y)
            enemy.disableBody(true,true)
            explosion.setActive(true)
            explosion.setVisible(true)
            explosion.anims.play(config.explodePic,true)
            explosion.on('animationcomplete', ()=>{explosion.setActive(false)}, this);
            config.game.updateScore(config.score)
        }
    }
    outOfBoundsKill(gameObj){
        // bullet.setPosition(this.myplan.x, this.myplan.y - 15)
        gameObj.setCollideWorldBounds(true);
        // Turning this on will allow you to listen to the 'worldbounds' event
        gameObj.body.onWorldBounds = true;
        // 'worldbounds' event listener
        gameObj.body.world.on('worldbounds', function(body) {
        // Check if the body's game object is the sprite you are listening for
        if (body.gameObject === this) {
            // Stop physics and render updates for this object
            this.setActive(false);
            this.setVisible(false);
        }
        }, gameObj);
    }
}