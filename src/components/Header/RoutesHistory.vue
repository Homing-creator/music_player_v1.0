<template>
    <section class="container">
      <span @click="back"><i class="el-icon-arrow-left"/></span>
      <span @click="forward"><i class="el-icon-arrow-right"/></span>
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
      /*color: #D74D45;*/
      cursor: pointer;
    }
  }
}
</style>
