<template>
  <div id="SlotMachine">
    <div class="badge">
      <span>{{ title }}</span>
    </div>
    <div class="body">
      <div class="window">
        <!--  -->
        <div class="container">
          <Gift
            v-for="(config, index) in configs"
            @finished="isFinished"
            :resetTrigger="resetTrigger"
            :trigger="trigger"
            :config="config"
            :key="index">
          </Gift>
          <div class="fence1"></div>
          <div class="fence2"></div>
        </div>
        <!--  -->
      </div>
      <div :class="['handler', { 'active': active }, { 'disabled': disabled }]">
        <div class="stick2"></div>
        <div class="stick"></div>
        <div class="ball" @click="!disabled && turn()"></div>
      </div>
    </div>
    <div class="select-button-group">
      <div
        class="select-button"
        :class="{ 'disabled': disabled }"
        @click="!disabled && intellectualAchievementAwardClick(1)">
        智育獎 1
      </div>
      <div
        class="select-button"
        :class="{ 'disabled': disabled }"
        @click="!disabled && intellectualAchievementAwardClick(2)">
        智育獎 2
      </div>
      <div
        class="select-button"
        :class="{ 'disabled': disabled }"
        @click="!disabled && intellectualAchievementAwardClick(3)">
        智育獎 3
      </div>
      <div
        class="select-button"
        :class="{ 'disabled': disabled }"
        @click="!disabled && moralAchievementAwardClick()">
        德育獎
      </div>
      <div
        class="select-button"
        :class="{ 'disabled': disabled }"
        @click="!disabled && sportsAchievementAwardClick()">
        體育獎
      </div>
      <div
        class="select-button"
        :class="{ 'disabled': disabled }"
        @click="!disabled && randomSelectClick()">
        幸運獎
      </div>
    </div>
    <div
       @click.self="openSetting = false"
       :class="['resultList', {'openSetting' : openSetting }]">
      <div class="resultList-container">
        <div class="result">
          <div class="msg">{{ msg }}</div>
          <div>
            <label for="nameListInput">名單匯入</label>
            <input type="file" id="nameListInput" @change="readNameList">
          </div>
          <div>
            <span>
              <small>請使用只有名字的 UTF-8 檔案, 每行一個人名，後面使用空白隔開他獲得的獎項</small>
            </span>
          </div>
          <div>
            <ul>
              <li>智育獎1：{{ awards.intellectualAchievementAward1 }}</li>
              <li>智育獎2：{{ awards.intellectualAchievementAward2 }}</li>
              <li>智育獎3：{{ awards.intellectualAchievementAward3 }}</li>
              <li>德育獎：{{ awards.moralAchievementAward }}</li>
              <li>體育獎：{{ awards.sportsAchievementAward }}</li>
            </ul>
          </div>
          <div class="info">
            <span>
              <small>如果名單已經匯入，將會存在 localStorage，關閉瀏覽器也不會消失，可以按最下方按鈕清除所有已存在的資訊，或重新匯入檔案</small>
            </span>
          </div>
          <div class="select-button-group">
            <div
              class="select-button" @click="reset()" style="flex-direction: row-reverse;justify-content: flex-end">
                清空
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="setting">
      <span @click="openSetting = true">→ Setting</span>
    </div>
  </div>
</template>

<script>
import Gift from '@/components/Gift'
export default {
  name: 'SlotMachine',
  components: {
    Gift
  },
  data () {
    return {
      run3D: false,
      trigger: null,
      resetTrigger: null,
      active: false,
      disabled: false,
      title: '資工系大抽獎',
      configs: [
        {
          style: 'gift-style',
          gifts: Array.from(new Array(10), (val, index) => { return { type: 'image', path: '/static/hsujm.jpg' } }),
          targetGift: null,
          duration: 4000,
          fontSize: 150,
          height: 200,
          width: 200
        },
        {
          style: 'gift-style',
          gifts: Array.from(new Array(10), (val, index) => { return { type: 'image', path: '/static/hsujm.jpg' } }),
          targetGift: null,
          duration: 5000,
          fontSize: 150,
          height: 200,
          width: 200
        },
        {
          style: 'gift-style',
          gifts: Array.from(new Array(10), (val, index) => { return { type: 'image', path: '/static/hsujm.jpg' } }),
          targetGift: null,
          duration: 6000,
          fontSize: 150,
          height: 200,
          width: 200
        }
      ],
      openSetting: false,
      nameList: [],
      resultList: [],
      result: [],
      msg: '',
      isRandomSelect: true,
      awards: {
        intellectualAchievementAward1: '',
        intellectualAchievementAward2: '',
        intellectualAchievementAward3: '',
        moralAchievementAward: '',
        sportsAchievementAward: ''
      }
    }
  },
  watch: {
    'nameList': {
      handler: function (newValue) {
        if (newValue.length !== 0) {
          const nameSplitList = newValue.map(name => this.splitName(name))
            .reduce((previousValue, currentValue) => {
              previousValue.lastName.push({type: 'text', name: currentValue[0]})
              previousValue.firstName1.push({type: 'text', name: currentValue[1]})
              previousValue.firstName2.push({type: 'text', name: currentValue[2]})
              return previousValue
            }, {
              lastName: [{type: 'image', path: '/static/hsujm.jpg'}],
              firstName1: [{type: 'image', path: '/static/hsujm.jpg'}],
              firstName2: [{type: 'image', path: '/static/hsujm.jpg'}]
            })

          this.configs[0].gifts = nameSplitList.lastName
          this.configs[1].gifts = nameSplitList.firstName1
          this.configs[2].gifts = nameSplitList.firstName2
        } else {
          this.configs[0].gifts = Array.from(new Array(10), (val, index) => { return { type: 'image', path: '/static/hsujm.jpg' } })
          this.configs[1].gifts = Array.from(new Array(10), (val, index) => { return { type: 'image', path: '/static/hsujm.jpg' } })
          this.configs[2].gifts = Array.from(new Array(10), (val, index) => { return { type: 'image', path: '/static/hsujm.jpg' } })
        }
      }
    }
  },
  methods: {
    splitName (name) {
      if (name.length === 3) {
        return [name[0], name[1], name[2]]
      }
      if (name.length === 2) {
        return [name[0], '', name[1]]
      }
      return name
    },
    readNameList (ev) {
      const file = ev.target.files[0]
      const reader = new FileReader()

      reader.onload = e => {
        this.$emit('load', e.target.result)
        const nameList = e.target.result.split('\n')
        this.nameList = nameList.map(n => n.trim().split(' ')[0])

        nameList.forEach(n => {
          let [name, ...awards] = n.trim().split(' ')
          if (awards.find(award => award === '智育獎1')) {
            this.awards.intellectualAchievementAward1 = name
          }
          if (awards.find(award => award === '智育獎2')) {
            this.awards.intellectualAchievementAward2 = name
          }
          if (awards.find(award => award === '智育獎3')) {
            this.awards.intellectualAchievementAward3 = name
          }
          if (awards.find(award => award === '德育獎')) {
            this.awards.moralAchievementAward = name
          }
          if (awards.find(award => award === '體育獎')) {
            this.awards.sportsAchievementAward = name
          }
        })

        window.localStorage.setItem('awards', JSON.stringify(this.awards))
        window.localStorage.setItem('nameList', JSON.stringify(this.nameList))
        this.resetTrigger = new Date()
      }
      reader.readAsText(file)
    },
    randomSelectClick () {
      this.configs.forEach(config => {
        config.targetGift = null
      })
      this.title = '資工系大抽獎'
      this.resetTrigger = new Date()
      this.isRandomSelect = true
    },
    intellectualAchievementAwardClick (rank) {
      let name
      if (rank === 1) {
        name = this.splitName(this.awards.intellectualAchievementAward1)
        this.title = '智育獎 - 第1名'
      } else if (rank === 2) {
        name = this.splitName(this.awards.intellectualAchievementAward2)
        this.title = '智育獎 - 第2名'
      } else if (rank === 3) {
        name = this.splitName(this.awards.intellectualAchievementAward3)
        this.title = '智育獎 - 第3名'
      }
      this.configs[0].targetGift = name[0]
      this.configs[1].targetGift = name[1]
      this.configs[2].targetGift = name[2]
      this.resetTrigger = new Date()
      this.isRandomSelect = false
    },
    moralAchievementAwardClick () {
      const name = this.splitName(this.awards.moralAchievementAward)
      this.title = '德育獎'
      this.configs[0].targetGift = name[0]
      this.configs[1].targetGift = name[1]
      this.configs[2].targetGift = name[2]
      this.resetTrigger = new Date()
      this.isRandomSelect = false
    },
    sportsAchievementAwardClick () {
      const name = this.splitName(this.awards.sportsAchievementAward)
      this.title = '體育獎'
      this.configs[0].targetGift = name[0]
      this.configs[1].targetGift = name[1]
      this.configs[2].targetGift = name[2]
      this.resetTrigger = new Date()
      this.isRandomSelect = false
    },
    turn () {
      if (this.isRandomSelect) {
        if (this.nameList.length !== 0) {
          let randomIndex = Math.ceil(Math.random() * this.nameList.length) // 因為 index0 是頭像或問號
          this.configs[0].targetGift = this.configs[0].gifts[randomIndex].name
          this.configs[1].targetGift = this.configs[1].gifts[randomIndex].name
          this.configs[2].targetGift = this.configs[2].gifts[randomIndex].name
        }
      }
      new Audio('/static/smj2.mp3').play()
      this.active = true
      setTimeout(() => {
        this.active = false
      }, 500)
      this.disabled = true
      this.trigger = new Date()
    },
    isFinished (val) {
      new Audio('/static/pyo1.mp3').play()
      const autoTurnList = this.$el.querySelectorAll('.autoTurn')
      this.result.push(val)
      if (autoTurnList.length === 1) {
        this.disabled = false
        this.resultList.push(this.result)
        this.result = []
      }
    },
    reset () {
      this.nameList = []
      this.awards = {
        intellectualAchievementAward1: '',
        intellectualAchievementAward2: '',
        intellectualAchievementAward3: '',
        moralAchievementAward: '',
        sportsAchievementAward: ''
      }
      window.localStorage.removeItem('nameList')
      window.localStorage.removeItem('awards')
    }
  },
  mounted: function () {
    let awards = window.localStorage.getItem('awards')
    let nameList = window.localStorage.getItem('nameList')

    if (awards) {
      awards = JSON.parse(awards)
      this.awards = Object.assign({}, this.awards, awards)
    }
    if (nameList) {
      nameList = JSON.parse(nameList)
      this.nameList = nameList
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lobster');
#SlotMachine {
  //
  $red: #ea5e56;
  $dark-red: #8f4343;
  $blue: #09384e;
  $white: #f4f2e0;
  $border-size: 5px;
  //
  width: 100vw;
  height: 100vh;
  min-width: 900px;
  min-height: 700px;
  background-color: #09384c;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  user-select: none;
  .badge {
    position: relative;
    margin-top: 30px;
    margin-bottom: 200px;
    display: flex;
    justify-content: center;
    width: 650px;
    height: 260px;
    border: 10px solid $blue;
    border-radius: 50%;
    background-color: $red;
    box-shadow: 0px -5px 0px $white;
    text-align: center;
    span {
      position: absolute;
      top: 25px;
      color: $white;
      font-size: 70px;
      font-family: 'Lobster', cursive;
    }
  }
  .body {
    position: absolute;
    padding: 50px;
    border: $border-size solid $blue;
    border-radius: 50px;
    background-color: $red;
    box-shadow: 5px 5px 0px $white;
  }
  .window {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: $border-size solid $blue;
    border-radius: 40px;
    overflow: hidden;
    transform: translateZ(0); // for safari border-radius issue
    &::after,
    &::before {
      position: absolute;
      z-index: 5;
      width: 100%;
      height: 100%;
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2) inset;
      content: ' ';
    }
    &::before {
      box-shadow: 0 -10px 15px rgba(0, 0, 0, 0.2) inset;
    }
    .container {
      width: 600px;
      height: 200px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      box-shadow: 0 15px 20px rgba(0, 0, 0, 0.3) inset;
      overflow: hidden;
      .fence1,
      .fence2 {
        position: absolute;
        z-index: 10;
        left: 190px;
        width: 10px;
        height: 200px;
        border: 3px solid $blue;
        background-color: $red;
      }
      .fence2 {
        left: 400px;
      }
    }
    .gift-style {
      font-family: 'Lobster', cursive;
      color: #09384e;
      border-right: none;
      border-left: none;
      border-top: 1px solid #333;
      border-bottom: 1px solid #333;
      background-color: #f5f2e2;
    }
  }
  .handler {
    position: absolute;
    top: 50%;
    right: -55px;
    display: flex;
    align-items: center;
    justify-content: center;
    &.active {
      .ball {
        top: 0px;
      }
      .stick {
        top: -10px;
        height: 20px;
      }
    }
    &.disabled {
      .ball {
        cursor: not-allowed;
        animation: none;
      }
    }
    .stick {
      position: absolute;
      top: -90px;
      right: -40px;
      width: 20px;
      height: 100px;
      border: $border-size solid $blue;
      border-radius: 20px;
      background-color: $red;
      transition: 350ms;
    }
    .stick2 {
      position: absolute;
      top: -10px;
      right: -45px;
      width: 80px;
      height: 20px;
      border: $border-size solid $blue;
      border-radius: 0 20px 20px 0;
      background-color: $red;
    }
    .ball {
      position: absolute;
      top: -155px;
      right: -65px;
      width: 70px;
      height: 70px;
      border: $border-size solid $blue;
      border-radius: 50%;
      background-color: $red;
      cursor: pointer;
      transition: 500ms;
      animation: ballLight 1s infinite alternate-reverse linear;
    }
  }
  .setting {
    margin-top: 10px;
    span {
      color: #fff;
    }
  }
  .select-button-group {
    display: flex;
    flex-wrap: nowrap;

    padding: 15px;
  }
  .select-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    white-space: nowrap;
    margin: 5px;
    padding: 15px 30px;
    outline: none;
    border: none;
    border: solid 5px $blue;
    border-radius: 10px;
    background-color: $red;
    color: $white;
    font-size: 30px;
    font-family: 'Lobster', cursive;
    cursor: pointer;

    user-select: none;
    &:after {
      position: absolute;
      padding: 3px;
      width: 100%;
      height: 100%;
      border: solid 3px $white;
      border-radius: 10px;
      left: -6px;
      top: -6px;
      content: ' ';
    }

    &.disabled {
      cursor: not-allowed;
    }
  }
  .resultList {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    visibility: hidden;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.4);
    opacity: 0;
    transition: 500ms;
    &.openSetting {
      visibility: visible;
      opacity: 1;
    }
    &-container {
      position: absolute;
      padding: 20px;
      min-width: 600px;
      border: solid 5px $blue;
      border-radius: 30px;
      background-color: $white;
      box-shadow: 5px 5px 15px rgba(0,0,0,0.4);
      overflow-y: auto;
      .result {
        font-family: 'Lobster', cursive;
        padding: 15px;
        list-style: none;
        color: $blue;
        font-size: 16px;
      }
    }
  }

  @keyframes ballLight {
    from {
      border: solid 5px $white;
      box-shadow: 0px 0px 10px $white;
    }
    to {
      border: solid 5px $white;
      box-shadow: 0px 0px 30px $white;
    }
  }
}
</style>
