<template>
    <div>
        <v-netrecommend/>
        <v-myrecommend/>
    </div>
</template>

<script>
import NetReCommend from './Recommend/NetRecommend'
import MyRecommend from './Recommend/MyRecommend'

export default {
  name: 'Recommend',
  components: {
    'v-netrecommend': NetReCommend,
    'v-myrecommend': MyRecommend
  }
}
</script>

<style scoped lang="scss">
</style>
