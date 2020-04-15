<template>
    <section class="container">
      <span @click="back"><i class="el-icon-arrow-left"></i></span>
      <span @click="forward"><i class="el-icon-arrow-right"></i></span>
    </section>
</template>

<script>
export default {
  name: 'RoutesHistory',
  methods: {
    back () {
      this.$router.back()
    },
    forward () {
      this.$router.forward()
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  span {
    &:hover {
      background-color: gray;
      cursor: pointer;
    }
  }
}
</style>
