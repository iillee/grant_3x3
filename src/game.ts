import * as utils from '@dcl/ecs-scene-utils'

//Material 00 - White
const material00 = new Material()
      material00.albedoColor = Color3.White()
      material00.metallic = 0
      material00.roughness = .5


//Material 01 - Cycles white
const material01 = new Material()
      material01.albedoColor = Color3.White()
      material01.metallic = 0
      material01.roughness = 1

      class ColorSystem1 {
                  fraction:number = 0
                  direction: number = 1

                  update(dt:number){
                      this.fraction += this.direction * dt * 0.25
                      if(this.fraction > 1){
                          this.fraction = 1
                          this.direction = -1

                      } else if(this.fraction < 0){
                        this.fraction = 0
                        this.direction = 1

                    }
                      material01.albedoColor = Color4.Lerp(new Color4(3, 3, 3, 1), new Color4(1.5, 1.5, 1.5, .5), this.fraction)
                  }
              }
engine.addSystem(new ColorSystem1())

//Material 02 - cycles slow
const material02 = new Material()
      material02.metallic = 0
      material02.roughness = 1
      material02.castShadows = true

      class ColorSystem2 {
                  fraction:number = 0
                  direction: number = 1

                  update(dt:number){
                      this.fraction += this.direction * dt * 0.01
                      if(this.fraction > 1){
                          this.fraction = 1
                          this.direction = -1

                      } else if(this.fraction < 0){
                        this.fraction = 0
                        this.direction = 1

                    }
                      material02.albedoColor = Color4.Lerp(new Color4(0, 0, .1, 1), new Color4(0, 0, 4, 1), this.fraction)
                  }
              }
engine.addSystem(new ColorSystem2())

//Material 03 cycles fast
const material03 = new Material()
      material03.metallic = 0
      material03.roughness = 1
      material03.castShadows = true

      class ColorSystem3 {
                  fraction:number = 0
                  direction: number = 1

                  update(dt:number){
                      this.fraction += this.direction * dt * 0.05
                      if(this.fraction > 1){
                          this.fraction = 1
                          this.direction = -1

                      } else if(this.fraction < 0){
                        this.fraction = 0
                        this.direction = 1

                    }
                      material03.albedoColor = Color4.Lerp(new Color4(0, 0, .1, 1), new Color4(0, 0, 4, 1), this.fraction)
                  }
              }
engine.addSystem(new ColorSystem3())

//sounds
const sound01 = new AudioClip("sounds/button.mp3")
const click = new AudioSource(sound01)

const sound02 = new AudioClip("sounds/kal_01.mp3")
const music = new AudioSource(sound02)

const sound03 = new AudioClip("sounds/pond.mp3")
const pond = new AudioSource(sound03)

const sound04 = new AudioClip("sounds/wind.mp3")
const wind = new AudioSource(sound04)

//Constant - Ground Plane
const ground = new Entity()
ground.addComponent(new PlaneShape())
ground.addComponent(material00)
ground.addComponent(
      new Transform({
        position: new Vector3(24, 0, 24),
        scale: new Vector3(48, 48, 1),
        rotation: Quaternion.Euler(90, 90, 0)
    }))
engine.addEntity(ground)

//Constant - orb (trigger signifyer)
const orb = new Entity()
orb.addComponent(new SphereShape())
orb.getComponent(SphereShape).withCollisions = false
orb.addComponent(material01)
orb.addComponent(new Transform({
        position: new Vector3(24, 4, 24),
        scale: new Vector3(.5, .5, .5)
}))
engine.addEntity(orb)

// Constant - base
let base = new Entity()
let basePath:string = "models/base.glb"
    base.addComponent(new GLTFShape(basePath))
    base.addComponent(new Transform({
        position: new Vector3(16, 0, 16),
        scale: new Vector3(1, 1, 1),
        rotation: Quaternion.Euler(0, 180, 0)
}))
engine.addEntity(base)

//Channel 01 - Parent
let channel_01 = new Entity()
    channel_01.addComponent(
        new utils.ToggleComponent(utils.ToggleState.On, value => {
            engine.removeEntity(channel_06),
            engine.addEntity(channel_01)
      })
    )

        //Channel Trigger 01
        const trigger_01 = new Entity()
        trigger_01.addComponent(new PlaneShape())
        trigger_01.getComponent(PlaneShape).withCollisions = false
        trigger_01.getComponent(PlaneShape).visible = false
        trigger_01.addComponent(material00)
        trigger_01.addComponent(click)
        trigger_01.addComponent(new Transform({
          position: new Vector3(24, 6.25, 24),
          scale: new Vector3(1, 1, 1),
          rotation: Quaternion.Euler(90, 0, 0)
        }))
        let triggerBox01 = new utils.TriggerBoxShape()
        trigger_01.addComponent(
          new utils.TriggerComponent(
            triggerBox01,
          {
            onCameraExit :() => {
              log('triggered!')
              channel_02.getComponent(utils.ToggleComponent).toggle()}
        }))
        click.playing = true

        //pavillion
        let pavillion = new Entity()
        let pavillionPath:string = "models/pavillion.glb"
            pavillion.addComponent(new GLTFShape(pavillionPath))
            pavillion.addComponent(new Transform({
                position: new Vector3(16, 0, 16),
                scale: new Vector3(1, 1, 1),
                rotation: Quaternion.Euler(0, 180, 0)
        }))

        //Pre Load main models of each channel in the channel before it scaled to zero. Models always load faster the second time around.

        //preload_01
        let preload_01 = new Entity()
        let preload_01Path:string = "models/gallery.glb"
            preload_01.addComponent(new GLTFShape(preload_01Path))
            preload_01.addComponent(new Transform({
                position: new Vector3(0, 0, 0),
                scale: new Vector3(0, 0, 0),
                rotation: Quaternion.Euler(0, 270, 0)
        }))

//Set parent
trigger_01.setParent(channel_01)
pavillion.setParent(channel_01)
preload_01.setParent(channel_01)

//specify start state to run when the scene begins. move/change this line of code to change the starting channel.
engine.addEntity(channel_01)

//Channel 02 - Parent
let channel_02 = new Entity()
    channel_02.addComponent(
        new utils.ToggleComponent(utils.ToggleState.On, value => {
            engine.removeEntity(channel_01),
            engine.addEntity(channel_02)
      })
    )

      //Channel Trigger 02
      const trigger_02 = new Entity()
      trigger_02.addComponent(new PlaneShape())
      trigger_02.getComponent(PlaneShape).withCollisions = false
      trigger_02.getComponent(PlaneShape).visible = false
      trigger_02.addComponent(material00)
      trigger_02.addComponent(click)
      trigger_02.addComponent(new Transform({
        position: new Vector3(24, 6.25, 24),
        scale: new Vector3(1, 1, 1),
        rotation: Quaternion.Euler(90, 0, 0)
      }))
      let triggerBox02 = new utils.TriggerBoxShape()
      trigger_02.addComponent(
        new utils.TriggerComponent(
          triggerBox02,
        {
          onCameraExit :() => {
            log('triggered!')
            channel_03.getComponent(utils.ToggleComponent).toggle()}
      }))
      click.playing = true

      //nft gallery
      let gallery = new Entity()
      let galleryPath:string = "models/gallery.glb"
          gallery.addComponent(new GLTFShape(galleryPath))
          gallery.addComponent(new Transform({
              position: new Vector3(0, 0, 48),
              scale: new Vector3(1, 1, 1),
              rotation: Quaternion.Euler(0, 0, 0)
      }))

      //NFT 01
      const nft_01 = new Entity()
      const shapeComponent01 = new NFTShape(
        'ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/40176',
        { color: Color3.White(), style: PictureFrameStyle.Canvas}
      )
      nft_01.addComponent(shapeComponent01)
      nft_01.addComponent(
        new Transform({
          position: new Vector3(.75, 12, 40),
          scale: new Vector3(8, 8, 7),
          rotation: Quaternion.Euler(180, 90, 180)
      }))
      nft_01.addComponent(
        new OnPointerDown((e) => {
          openNFTDialog(
            "ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/40176"
          )
        })
      )

      //NFT 02
      const nft_02 = new Entity()
      const shapeComponent02 = new NFTShape(
        'ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/41022',
        { color: Color3.White(), style: PictureFrameStyle.Canvas}
      )
      nft_02.addComponent(shapeComponent02)
      nft_02.addComponent(
        new Transform({
          position: new Vector3(.75, 12, 32),
          scale: new Vector3(8, 8, 7),
          rotation: Quaternion.Euler(180, 90, 180)
      }))
      nft_02.addComponent(
        new OnPointerDown((e) => {
          openNFTDialog(
            "ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/41022"
          )
        })
      )

      //NFT 03
      const nft_03 = new Entity()
      const shapeComponent03 = new NFTShape(
        'ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/41098',
        { color: Color3.White(), style: PictureFrameStyle.Canvas}
      )
      nft_03.addComponent(shapeComponent03)
      nft_03.addComponent(
        new Transform({
          position: new Vector3(.75, 12, 24),
          scale: new Vector3(8, 8, 7),
          rotation: Quaternion.Euler(180, 90, 180)
      }))
      nft_03.addComponent(
        new OnPointerDown((e) => {
          openNFTDialog(
            "ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/41098"
          )
        })
      )

      //NFT 04
      const nft_04 = new Entity()
      const shapeComponent04 = new NFTShape(
        'ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/40954',
        { color: Color3.White(), style: PictureFrameStyle.Canvas}
      )
      nft_04.addComponent(shapeComponent04)
      nft_04.addComponent(
        new Transform({
          position: new Vector3(.75, 12, 16),
          scale: new Vector3(8, 8, 7),
          rotation: Quaternion.Euler(180, 90, 180)
      }))
      nft_04.addComponent(
        new OnPointerDown((e) => {
          openNFTDialog(
            "ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/40954"
          )
        })
      )

      //NFT 05
      const nft_05 = new Entity()
      const shapeComponent05 = new NFTShape(
        'ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/40966',
        { color: Color3.White(), style: PictureFrameStyle.Canvas}
      )
      nft_05.addComponent(shapeComponent05)
      nft_05.addComponent(
        new Transform({
          position: new Vector3(.75, 12, 8),
          scale: new Vector3(8, 8, 7),
          rotation: Quaternion.Euler(180, 90, 180)
      }))
      nft_05.addComponent(
        new OnPointerDown((e) => {
          openNFTDialog(
            "ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/40966"
          )
        })
      )

      //NFT 06
      const nft_06 = new Entity()
      const shapeComponent06 = new NFTShape(
        'ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/38540',
        { color: Color3.White(), style: PictureFrameStyle.Canvas}
      )
      nft_06.addComponent(shapeComponent06)
      nft_06.addComponent(
        new Transform({
          position: new Vector3(8, 12, .75),
          scale: new Vector3(8, 8, 7),
          rotation: Quaternion.Euler(180, 0, 180)
      }))
      nft_06.addComponent(
        new OnPointerDown((e) => {
          openNFTDialog(
            "ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/38540"
          )
        })
      )

      //NFT 07
      const nft_07 = new Entity()
      const shapeComponent07 = new NFTShape(
        'ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/39652',
        { color: Color3.White(), style: PictureFrameStyle.Canvas}
      )
      nft_07.addComponent(shapeComponent07)
      nft_07.addComponent(
        new Transform({
          position: new Vector3(16, 12, .75),
          scale: new Vector3(8, 8, 7),
          rotation: Quaternion.Euler(180, 0, 180)
      }))
      nft_07.addComponent(
        new OnPointerDown((e) => {
          openNFTDialog(
            "ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/39652"
          )
        })
      )

      //NFT 08
      const nft_08 = new Entity()
      const shapeComponent08 = new NFTShape(
        'ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/37953',
        { color: Color3.White(), style: PictureFrameStyle.Canvas}
      )
      nft_08.addComponent(shapeComponent08)
      nft_08.addComponent(
        new Transform({
          position: new Vector3(24, 12, .75),
          scale: new Vector3(8, 8, 7),
          rotation: Quaternion.Euler(180, 0, 180)
      }))
      nft_08.addComponent(
        new OnPointerDown((e) => {
          openNFTDialog(
            "ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/37953"
          )
        })
      )

      //NFT 09
      const nft_09 = new Entity()
      const shapeComponent09 = new NFTShape(
        'ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/30917',
        { color: Color3.White(), style: PictureFrameStyle.Canvas}
      )
      nft_09.addComponent(shapeComponent09)
      nft_09.addComponent(
        new Transform({
          position: new Vector3(32, 12, .75),
          scale: new Vector3(8, 8, 7),
          rotation: Quaternion.Euler(180, 0, 180)
      }))
      nft_09.addComponent(
        new OnPointerDown((e) => {
          openNFTDialog(
            "ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/30917"
          )
        })
      )

      //NFT 10
      const nft_10 = new Entity()
      const shapeComponent10 = new NFTShape(
        'ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/40767',
        { color: Color3.White(), style: PictureFrameStyle.Canvas}
      )
      nft_10.addComponent(shapeComponent10)
      nft_10.addComponent(
        new Transform({
          position: new Vector3(40, 12, .75),
          scale: new Vector3(8, 8, 7),
          rotation: Quaternion.Euler(180, 0, 180)
      }))
      nft_10.addComponent(
        new OnPointerDown((e) => {
          openNFTDialog(
            "ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/40767"
          )
        })
      )

      //NFT 11
      const nft_11 = new Entity()
      const shapeComponent11 = new NFTShape(
        'ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/34416',
        { color: Color3.White(), style: PictureFrameStyle.Canvas}
      )
      nft_11.addComponent(shapeComponent11)
      nft_11.addComponent(
        new Transform({
          position: new Vector3(47.25, 12, 8),
          scale: new Vector3(8, 8, 7),
          rotation: Quaternion.Euler(180, 270, 180)
      }))
      nft_11.addComponent(
        new OnPointerDown((e) => {
          openNFTDialog(
            "ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/34416"
          )
        })
      )

      //NFT 12
      const nft_12 = new Entity()
      const shapeComponent12 = new NFTShape(
        'ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/38792',
        { color: Color3.White(), style: PictureFrameStyle.Canvas}
      )
      nft_12.addComponent(shapeComponent12)
      nft_12.addComponent(
        new Transform({
          position: new Vector3(47.25, 12, 16),
          scale: new Vector3(8, 8, 7),
          rotation: Quaternion.Euler(180, 270, 180)
      }))
      nft_12.addComponent(
        new OnPointerDown((e) => {
          openNFTDialog(
            "ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/38792"
          )
        })
      )

      //NFT 13
      const nft_13 = new Entity()
      const shapeComponent13 = new NFTShape(
        'ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/40538',
        { color: Color3.White(), style: PictureFrameStyle.Canvas}
      )
      nft_13.addComponent(shapeComponent13)
      nft_13.addComponent(
        new Transform({
          position: new Vector3(47.25, 12, 24),
          scale: new Vector3(8, 8, 7),
          rotation: Quaternion.Euler(180, 270, 180)
      }))
      nft_13.addComponent(
        new OnPointerDown((e) => {
          openNFTDialog(
            "ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/40538"
          )
        })
      )

      //NFT 14
      const nft_14 = new Entity()
      const shapeComponent14 = new NFTShape(
        'ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/36844',
        { color: Color3.White(), style: PictureFrameStyle.Canvas}
      )
      nft_14.addComponent(shapeComponent14)
      nft_14.addComponent(
        new Transform({
          position: new Vector3(47.25, 12, 32),
          scale: new Vector3(8, 8, 7),
          rotation: Quaternion.Euler(180, 270, 180)
      }))
      nft_14.addComponent(
        new OnPointerDown((e) => {
          openNFTDialog(
            "ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/36844"
          )
        })
      )

      //NFT 15
      const nft_15 = new Entity()
      const shapeComponent15 = new NFTShape(
        'ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/40421',
        { color: Color3.White(), style: PictureFrameStyle.Canvas}
      )
      nft_15.addComponent(shapeComponent15)
      nft_15.addComponent(
        new Transform({
          position: new Vector3(47.25, 12, 40),
          scale: new Vector3(8, 8, 7),
          rotation: Quaternion.Euler(180, 270, 180)
      }))
      nft_15.addComponent(
        new OnPointerDown((e) => {
          openNFTDialog(
            "ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/40421"
          )
        })
      )

      //NFT 16
      const nft_16 = new Entity()
      const shapeComponent16 = new NFTShape(
        'ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/38176',
        { color: Color3.White(), style: PictureFrameStyle.Canvas}
      )
      nft_16.addComponent(shapeComponent16)
      nft_16.addComponent(
        new Transform({
          position: new Vector3(40, 12, 47.25),
          scale: new Vector3(8, 8, 7),
          rotation: Quaternion.Euler(180, 180, 180)
      }))
      nft_16.addComponent(
        new OnPointerDown((e) => {
          openNFTDialog(
            "ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/38176"
          )
        })
      )

      //NFT 17
      const nft_17 = new Entity()
      const shapeComponent17 = new NFTShape(
        'ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/31819',
        { color: Color3.White(), style: PictureFrameStyle.Canvas}
      )
      nft_17.addComponent(shapeComponent17)
      nft_17.addComponent(
        new Transform({
          position: new Vector3(32, 12, 47.25),
          scale: new Vector3(8, 8, 7),
          rotation: Quaternion.Euler(180, 180, 180)
      }))
      nft_17.addComponent(
        new OnPointerDown((e) => {
          openNFTDialog(
            "ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/31819"
          )
        })
      )

      //NFT 18
      const nft_18 = new Entity()
      const shapeComponent18 = new NFTShape(
        'ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/35728',
        { color: Color3.White(), style: PictureFrameStyle.Canvas}
      )
      nft_18.addComponent(shapeComponent18)
      nft_18.addComponent(
        new Transform({
          position: new Vector3(24, 12, 47.25),
          scale: new Vector3(8, 8, 7),
          rotation: Quaternion.Euler(180, 180, 180)
      }))
      nft_18.addComponent(
        new OnPointerDown((e) => {
          openNFTDialog(
            "ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/35728"
          )
        })
      )

      //NFT 19
      const nft_19 = new Entity()
      const shapeComponent19 = new NFTShape(
        'ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/27421',
        { color: Color3.White(), style: PictureFrameStyle.Canvas}
      )
      nft_19.addComponent(shapeComponent19)
      nft_19.addComponent(
        new Transform({
          position: new Vector3(16, 12, 47.25),
          scale: new Vector3(8, 8, 7),
          rotation: Quaternion.Euler(180, 180, 180)
      }))
      nft_19.addComponent(
        new OnPointerDown((e) => {
          openNFTDialog(
            "ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/27421"
          )
        })
      )

      //NFT 20
      const nft_20 = new Entity()
      const shapeComponent20 = new NFTShape(
        'ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/30103',
        { color: Color3.White(), style: PictureFrameStyle.Canvas}
      )
      nft_20.addComponent(shapeComponent20)
      nft_20.addComponent(
        new Transform({
          position: new Vector3(8, 12, 47.25),
          scale: new Vector3(8, 8, 7),
          rotation: Quaternion.Euler(180, 180, 180)
      }))
      nft_20.addComponent(
        new OnPointerDown((e) => {
          openNFTDialog(
            "ethereum://0xd93206BD0062cC054E397eCCCdB8436c3fa5700e/30103"
          )
        })
      )

      //preload_02
      let preload_02 = new Entity()
      let preload_02Path:string = "models/shell.glb"
          preload_02.addComponent(new GLTFShape(preload_02Path))
          preload_02.addComponent(new Transform({
              position: new Vector3(0, 0, 0),
              scale: new Vector3(0, 0, 0),
              rotation: Quaternion.Euler(0, 180, 0)
      }))

//Set parent
trigger_02.setParent(channel_02)
gallery.setParent(channel_02)
nft_01.setParent(channel_02)
nft_02.setParent(channel_02)
nft_03.setParent(channel_02)
nft_04.setParent(channel_02)
nft_05.setParent(channel_02)
nft_06.setParent(channel_02)
nft_07.setParent(channel_02)
nft_08.setParent(channel_02)
nft_09.setParent(channel_02)
nft_10.setParent(channel_02)
nft_11.setParent(channel_02)
nft_12.setParent(channel_02)
nft_13.setParent(channel_02)
nft_14.setParent(channel_02)
nft_15.setParent(channel_02)
nft_16.setParent(channel_02)
nft_17.setParent(channel_02)
nft_18.setParent(channel_02)
nft_19.setParent(channel_02)
nft_20.setParent(channel_02)
preload_02.setParent(channel_02)

//Channel 03 - Parent
let channel_03 = new Entity()
    channel_03.addComponent(
      new Transform({
        position: new Vector3(0, 0, 48),
        rotation: Quaternion.Euler(0, 90, 0)
    }))
    channel_03.addComponent(
        new utils.ToggleComponent(utils.ToggleState.On, value => {
            engine.removeEntity(channel_02),
            engine.addEntity(channel_03)
      })
    )

      //Channel Trigger 03
      const trigger_03 = new Entity()
      trigger_03.addComponent(new PlaneShape())
      trigger_03.getComponent(PlaneShape).withCollisions = false
      trigger_03.getComponent(PlaneShape).visible = false
      trigger_03.addComponent(material00)
      trigger_03.addComponent(click)
      trigger_03.addComponent(new Transform({
        position: new Vector3(24, 6.25, 24),
        scale: new Vector3(1, 1, 1),
        rotation: Quaternion.Euler(90, 0, 0)
      }))
      let triggerBox03 = new utils.TriggerBoxShape()
      trigger_03.addComponent(
        new utils.TriggerComponent(
          triggerBox03,
        {
          onCameraExit :() => {
            log('triggered!')
            channel_04.getComponent(utils.ToggleComponent).toggle()}
      }))
      click.playing = true

      //shell
      let shell = new Entity()
      let shellPath:string = "models/shell.glb"
          shell.addComponent(new GLTFShape(shellPath))
          shell.addComponent(new Transform({
              position: new Vector3(0, 0, 0),
              scale: new Vector3(1, 1, 1),
              rotation: Quaternion.Euler(0, 180, 0)
      }))

      //Floor
      const wall_01 = new Entity()
      wall_01.addComponent(new PlaneShape())
      wall_01.addComponent(material02)
      wall_01.addComponent(new Transform({
        position: new Vector3(24, .41, 24),
        scale: new Vector3(43.5, 43.5, 1),
        rotation: Quaternion.Euler(90, 90, 0)
      }))

      //Celing
      const wall_02 = new Entity()
      wall_02.addComponent(new PlaneShape())
      wall_02.addComponent(material03)
      wall_02.addComponent(new Transform({
        position: new Vector3(24, 27.5, 24),
        scale: new Vector3(40, 40, 1),
        rotation: Quaternion.Euler(90, 90, 0)
      }))

      //West Wall
      const wall_03 = new Entity()
      wall_03.addComponent(new PlaneShape())
      wall_03.addComponent(material02)
      wall_03.addComponent(new Transform({
        position: new Vector3(6, 15, 24),
        scale: new Vector3(40, 40, 1),
        rotation: Quaternion.Euler(0, 90, 0)
      }))

      //North Wall
      const wall_04 = new Entity()
      wall_04.addComponent(new PlaneShape())
      wall_04.addComponent(material02)
      wall_04.addComponent(new Transform({
        position: new Vector3(24, 15, 42),
        scale: new Vector3(40, 40, 1),
        rotation: Quaternion.Euler(0, 0, 0)
      }))

      //East wall
      const wall_05 = new Entity()
      wall_05.addComponent(new PlaneShape())
      wall_05.addComponent(material02)
      wall_05.addComponent(new Transform({
        position: new Vector3(42, 15, 24),
        scale: new Vector3(40, 40, 1),
        rotation: Quaternion.Euler(0, 90, 0)
      }))

      //South Wall 01
      const wall_06 = new Entity()
      wall_06.addComponent(new PlaneShape())
      wall_06.addComponent(material02)
      wall_06.addComponent(new Transform({
        position: new Vector3(24, 24, 6),
        scale: new Vector3(40, 40, 1),
        rotation: Quaternion.Euler(0, 0, 0)
      }))

      //South Wall 02
      const wall_07 = new Entity()
      wall_07.addComponent(new PlaneShape())
      wall_07.addComponent(material02)
      wall_07.addComponent(new Transform({
        position: new Vector3(14.5, 5, 6),
        scale: new Vector3(17, 10, 1),
        rotation: Quaternion.Euler(0, 0, 0)
      }))

      //South Wall 03
      const wall_08 = new Entity()
      wall_08.addComponent(new PlaneShape())
      wall_08.addComponent(material02)
      wall_08.addComponent(new Transform({
        position: new Vector3(33.5, 5, 6),
        scale: new Vector3(17, 10, 1),
        rotation: Quaternion.Euler(0, 0, 0)
      }))

      // song
      const song = new Entity()
      song.addComponent(new BoxShape())
      song.addComponent(music)
      song.getComponent(BoxShape).withCollisions = false
      song.getComponent(BoxShape).visible = false
      song.addComponent(new Transform({
          position: new Vector3(24, 12, 24),
          scale: new Vector3(3, 3, 3)
      }))
      music.playing = true
      music.loop = true

      //preload_03
      let preload_03 = new Entity()
      let preload_03Path:string = "models/spiral.glb"
          preload_03.addComponent(new GLTFShape(preload_03Path))
          preload_03.addComponent(new Transform({
              position: new Vector3(0, 0, 0),
              scale: new Vector3(0, 0, 0),
              rotation: Quaternion.Euler(0, 180, 0)
      }))

//Set parent
trigger_03.setParent(channel_03)
shell.setParent(channel_03)
wall_01.setParent(channel_03)
wall_02.setParent(channel_03)
wall_03.setParent(channel_03)
wall_04.setParent(channel_03)
wall_05.setParent(channel_03)
wall_06.setParent(channel_03)
wall_07.setParent(channel_03)
wall_08.setParent(channel_03)
song.setParent(channel_03)
preload_03.setParent(channel_03)

//Channel 04 - Parent
let channel_04 = new Entity()
    channel_04.addComponent(
        new utils.ToggleComponent(utils.ToggleState.On, value => {
            engine.removeEntity(channel_03),
            engine.addEntity(channel_04)
      })
    )

      //Channel Trigger 04
      const trigger_04 = new Entity()
      trigger_04.addComponent(new PlaneShape())
      trigger_04.getComponent(PlaneShape).withCollisions = false
      trigger_04.getComponent(PlaneShape).visible = false
      trigger_04.addComponent(material00)
      trigger_04.addComponent(click)
      trigger_04.addComponent(new Transform({
        position: new Vector3(24, 6.25, 24),
        scale: new Vector3(1, 1, 1),
        rotation: Quaternion.Euler(90, 0, 0)
      }))
      let triggerBox04 = new utils.TriggerBoxShape()
      trigger_04.addComponent(
        new utils.TriggerComponent(
          triggerBox04,
        {
          onCameraExit :() => {
            log('triggered!')
            channel_05.getComponent(utils.ToggleComponent).toggle()}
      }))
      click.playing = true

      //spiral
      let spiral = new Entity()
      let spiralPath:string = "models/spiral.glb"
          spiral.addComponent(new GLTFShape(spiralPath))
          spiral.addComponent(new Transform({
              position: new Vector3(0, 0, 0),
              scale: new Vector3(1, 1, 1),
              rotation: Quaternion.Euler(0, 180, 0)
      }))

      // wind
      const windobj = new Entity()
      windobj.addComponent(new BoxShape())
      windobj.addComponent(wind)
      windobj.getComponent(BoxShape).withCollisions = false
      windobj.getComponent(BoxShape).visible = false
      windobj.addComponent(new Transform({
          position: new Vector3(24, 16, 24),
          scale: new Vector3(3, 3, 3)
      }))
      wind.playing = true
      wind.loop = true
      wind.volume = .075

      //preload_04
      let preload_04 = new Entity()
      let preload_04Path:string = "models/topo.glb"
          preload_04.addComponent(new GLTFShape(preload_04Path))
          preload_04.addComponent(new Transform({
              position: new Vector3(0, 0, 0),
              scale: new Vector3(0, 0, 0),
              rotation: Quaternion.Euler(0, 180, 0)
      }))

//Set parent
trigger_04.setParent(channel_04)
spiral.setParent(channel_04)
windobj.setParent(channel_04)
preload_04.setParent(channel_04)

//Channel 05 - Parent
let channel_05 = new Entity()
    channel_05.addComponent(
        new utils.ToggleComponent(utils.ToggleState.On, value => {
            engine.removeEntity(channel_04),
            engine.addEntity(channel_05)
      })
    )

      //Channel Trigger 05
      const trigger_05 = new Entity()
      trigger_05.addComponent(new PlaneShape())
      trigger_05.getComponent(PlaneShape).withCollisions = false
      trigger_05.getComponent(PlaneShape).visible = false
      trigger_05.addComponent(material00)
      trigger_05.addComponent(click)
      trigger_05.addComponent(new Transform({
        position: new Vector3(24, 6.25, 24),
        scale: new Vector3(1, 1, 1),
        rotation: Quaternion.Euler(90, 0, 0)
      }))
      let triggerBox05 = new utils.TriggerBoxShape()
      trigger_05.addComponent(
        new utils.TriggerComponent(
          triggerBox05,
        {
          onCameraExit :() => {
            log('triggered!')
            channel_06.getComponent(utils.ToggleComponent).toggle()}
      }))
      click.playing = true

      //topo
      let topo = new Entity()
      let topoPath:string = "models/topo.glb"
          topo.addComponent(new GLTFShape(topoPath))
          topo.addComponent(new Transform({
              position: new Vector3(0, 0, 0),
              scale: new Vector3(1, 1, 1),
              rotation: Quaternion.Euler(0, 180, 0)
      }))

      // #1
      const myVideoClip = new VideoClip("videos/water.mp4")
      const alphaTexture = new Texture("images/alpha.png")

      // #2
      const myVideoTexture = new VideoTexture(myVideoClip)

     // #3
      const myMaterial = new Material()
      myMaterial.albedoTexture = myVideoTexture
      myMaterial.alphaTexture = alphaTexture
      myMaterial.roughness = 1
      myMaterial.specularIntensity = 0
      myMaterial.metallic = 0

      // #4

      const pondwater = new Entity()
      pondwater.addComponent(new PlaneShape())
      pondwater.addComponent(myMaterial)
      pondwater.addComponent(pond)
      pondwater.getComponent(PlaneShape).withCollisions = false
      pondwater.addComponent(
        new Transform({
          position: new Vector3(24, .31, 24),
          scale: new Vector3(42, 42, 1),
          rotation: Quaternion.Euler(90, 0, 0)
        })
      )
      pond.volume = 0.1
      pond.playing = true
      pond.loop = true

      // #5
      myVideoTexture.play()
      myVideoTexture.loop = true

      //preload_05
      let preload_05 = new Entity()
      let preload_05Path:string = "models/arena.glb"
          preload_05.addComponent(new GLTFShape(preload_05Path))
          preload_05.addComponent(new Transform({
              position: new Vector3(0, 0, 0),
              scale: new Vector3(0, 0, 0),
              rotation: Quaternion.Euler(0, 0, 0)
      }))

//Set parent
trigger_05.setParent(channel_05)
topo.setParent(channel_05)
pondwater.setParent(channel_05)
preload_05.setParent(channel_05)

//Channel 06 - Parent
let channel_06 = new Entity()
    channel_06.addComponent(
        new utils.ToggleComponent(utils.ToggleState.On, value => {
            engine.removeEntity(channel_05),
            engine.addEntity(channel_06)
      })
    )

      //Channel Trigger 06
      const trigger_06 = new Entity()
      trigger_06.addComponent(new PlaneShape())
      trigger_06.getComponent(PlaneShape).withCollisions = false
      trigger_06.getComponent(PlaneShape).visible = false
      trigger_06.addComponent(material00)
      trigger_06.addComponent(click)
      trigger_06.addComponent(new Transform({
        position: new Vector3(24, 6.25, 24),
        scale: new Vector3(1, 1, 1),
        rotation: Quaternion.Euler(90, 0, 0)
      }))
      let triggerBox06 = new utils.TriggerBoxShape()
      trigger_06.addComponent(
        new utils.TriggerComponent(
          triggerBox06,
        {
          onCameraExit :() => {
            log('triggered!')
            channel_01.getComponent(utils.ToggleComponent).toggle()}
      }))
      click.playing = true

      //arena
      let arena = new Entity()
      let arenaPath:string = "models/arena.glb"
          arena.addComponent(new GLTFShape(arenaPath))
          arena.addComponent(new Transform({
              position: new Vector3(0, 0, 0),
              scale: new Vector3(1, 1, 1),
              rotation: Quaternion.Euler(0, 180, 0)
      }))

      //pors
      let pots = new Entity()
      let potsPath:string = "models/pots.glb"
          pots.addComponent(new GLTFShape(potsPath))
          pots.addComponent(new Transform({
              position: new Vector3(0, 0, 0),
              scale: new Vector3(1, 1, 1),
              rotation: Quaternion.Euler(0, 180, 0)
      }))

      //preload_06
      let preload_06 = new Entity()
      let preload_06Path:string = "models/pavillion.glb"
          preload_06.addComponent(new GLTFShape(preload_06Path))
          preload_06.addComponent(new Transform({
              position: new Vector3(0, 0, 0),
              scale: new Vector3(0, 0, 0),
              rotation: Quaternion.Euler(0, 180, 0)
      }))

//Set parent
trigger_06.setParent(channel_06)
arena.setParent(channel_06)
pots.setParent(channel_06)
preload_06.setParent(channel_06)
