import Phaser from 'phaser'
import config from '../config'
import enemyTeam from '../enmyConf'
import Enemy from '../enemyClass'
// 游戏界面
export default class Start extends Phaser.Scene{
    preload(){
    }
    create(){
        // 添加背景
        this.bg = this.add.tileSprite(0, 0, config.width*2, config.height*2, 'background');
        // 飞机
        this.myplan = this.physics.add.sprite(config.width/2, config.height/2+100, 'myplane').setOrigin(0.5,0.5).setInteractive()
        this.myplan.setCollideWorldBounds(true); //添加边界
        this.anims.create({  //动画
            key: "fly",
            frames: this.anims.generateFrameNumbers("myplane", { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
        this.myplan.anims.play("fly", true);
        this.myplan.level = 2;
        // 飞机下落动画
        this.tweens.add({
            targets: this.myplan,
            duration: 1000,
            y: config.height-60,
            delay: 0,
            ease: 'Sine.easeInOut',
            repeat: 0,
            yoyo: false,
            onComplete:()=>{this.onStart()}
        });
        // 背景音乐
        this.playback = this.sound.add('playback',{loop:true});
        // this.playback.play();
        // 开火音乐
        this.pi = this.sound.add('pi');
        // 打中敌人音乐
        this.firesound = this.sound.add('fashe');
        // 爆炸音乐
        this.crash1 = this.sound.add('crash1');
        this.crash2 = this.sound.add('crash1');
        this.crash3 = this.sound.add('crash1');
        // 挂了音乐
        this.ao = this.sound.add('ao');
        // 接到了奖音乐
        this.deng = this.sound.add('deng');
    }
    update(){
        // 背景滚动
        this.bg.tilePositionY -= 0.5
        // 自己发射子弹
        this.myFireBullet();
        // 敌人发射子弹
        this.enemy1 && this.enemy1.enemyFire()
    }
    // 开始游戏
    onStart(){
        // 我的子弹
        this.mybullets = this.physics.add.group();
        // this.mybullets.createMultiple({quantity:10, key:'mybullet',active:false});
        this.bulletTime = 0;
        
        // 我的飞机允许拖拽
        this.input.setDraggable(this.myplan);
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
        // 奖
        this.awards = this.physics.add.group();
        this.awardMaxWidth = config.width - 20;
        // 循环生成奖励
        this.time.addEvent({ delay: 30000, callback: this.generateAward, callbackScope: this, loop: true });
        // 分数
        this.score = 0
        this.text = this.add.text(16, 16, "Score: 0", {
            fontSize: "16px",
            fill: "#000"
          })
        // 生成enemy
        const ENEMY_TEAM = enemyTeam.call(this)
        this.enemy1 = new Enemy(ENEMY_TEAM.enemy1)
        this.enemy1.init()

        // 碰撞检测
        this.physics.add.overlap(this.mybullets, this.enemy1.enemys, this.enemy1.hitEnemy, null, this.enemy1);
        this.physics.add.overlap(this.enemy1.enemys, this.myplan, this.crashMyplane, null, this);
        this.physics.add.overlap(this.enemy1.enemyBullets, this.myplan, this.hitMyplane, null, this);
        this.physics.add.overlap(this.awards, this.myplan, this.getAward, null, this);
    }
    // 产生一个奖励
    generateAward(){
        let award = this.awards.getFirstDead(true,Phaser.Math.Between(0,this.awardMaxWidth),0,'award').setOrigin(0,0)
        award.enableBody(true,Phaser.Math.Between(0,this.awardMaxWidth),0,true,true)
        this.outOfBoundsKill(award)
        award.setVelocity(0,500)
    }
    // 自己飞机开火
    myFireBullet(){
        if(this.myplan.active && new Date().getTime() > this.bulletTime){
            try{this.pi.play()} catch(e){} //播放声音
            let bullet;
            this.fireOneBullet(bullet,0,-400)
            if(this.myplan.level >= 2){
                this.fireOneBullet(bullet,-40,-400)
                this.fireOneBullet(bullet,40,-400)
            }
            if(this.myplan.level >= 3){
               this.fireOneBullet(bullet,-80,-400)
               this.fireOneBullet(bullet,80,-400)
            }
        }
    }
    // 超出边界元素disactive
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
    // 发射一颗子弹
    fireOneBullet(bullet,Vx,Vy){
        bullet = this.mybullets.getFirstDead(true,this.myplan.x,this.myplan.y - 5,'mybullet')
            if(bullet){
                this.outOfBoundsKill(bullet)
                bullet.enableBody(true,this.myplan.x, this.myplan.y,true,true)
                bullet.setVelocity(Vx,Vy)
                this.bulletTime = new Date().getTime() + 200
            }
    }
    updateScore(score){
        this.score += score
        this.text.setText(`Score: ${this.score}`)
    }
    goToOver(){
        this.playback.pause()
        this.scene.start('over')
    }
    crashMyplane(myplan,enemy){
        myplan.disableBody(true,true)
        this.dead()
    }
    hitMyplane(myplan,bullet){
        bullet.disableBody(true,true)
        if(myplan.level > 1) {
            myplan.level--;
          } else {
            myplan.disableBody(true,true);
            this.dead();
          }
    }
    getAward(myplan,award){
        award.disableBody(true,true)
        try {
            this.deng.play();
          } catch(e) {}
          if(myplan.level < 3) {
            myplan.level++;
          }
    }
    dead(){
        try {this.ao.play();} catch(e) {}
        this.anims.create({
            key: 'myplanExplode',
            frames: this.anims.generateFrameNumbers('myexplode', { start: 0, end: 2 }),
            frameRate: 30,
            repeat: 1,
            hideOnComplete:true
        })
        let myexplode = this.add.sprite(this.myplan.x, this.myplan.y, 'myexplode').setOrigin(0.5,0.5)
        myexplode.anims.play('myplanExplode',true)
        myexplode.on('animationcomplete',()=>{this.goToOver()}, this)
    }
    
}