<template>
  <div class="item flex">
    <div class="item-title flex">{{this.title}}</div>
    <div class="flex seprate">
      <div class="line line-left"></div>
      <div class="line-title">入参</div>
      <div class="line line-right"></div>
    </div>
    <div class="item-ins flex item-list">
      <div v-for="name in this.in" :key="name" class="flex item-in item-one">
        <div class="dot dot-in"  @click="onChoose"></div>
        <div class="item-name">{{name}}</div>
      </div>
    </div>
    <div class="flex seprate">
      <div class="line line-left"></div>
      <div class="line-title">出参</div>
      <div class="line line-right"></div>
    </div>
    <div class="item-outs flex item-list">
      <div v-for="name in this.out" :key="name" class="flex item-out item-one">
        <div class="item-name">{{name}}</div>
        <div class="dot dot-out"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'item',
  data () {
    return {
      title: 'test-1',
      in: [
        'p1',
        'p2'
      ],
      out: [
        'o1',
        'o2'
      ]
    }
  },
  methods: {
    onChoose (event) {
      console.log(event);
    }
  }
}
</script>

<style lang="css" scoped>
.flex {
  display: flex;
}

.item {
  background-color: black;
  border-radius: 8px;
  min-width: 100px;
  max-width: 200px;
  flex-direction: column;
}

.seprate {
  flex-direction: row;
  align-items: center;
}

.line {
  height: 1px;
  background-color: gray;
}

.line-left {
  width: 20px;
}

.line-title {
  color: white;
  font-size: 10px;
  margin-left: 4px;
  margin-right: 4px;
}

.line-right {
  flex: 1;
}

.item-list {
  margin-left: 16px;
  margin-top: 16px;
  margin-bottom: 16px;
}

.item-title {
  color: white;
  margin-left: 16px;
  margin-top: 16px;
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: bold;
}


.item-one {
  align-items: center;
}

.item-list {
  flex-direction: column;
}

.dot {
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 5px;
}

.dot-in {
  margin-right: 8px;
}

.dot-out {
  margin-left: 8px;
}

.item-name {
  color: white;
}


</style>


