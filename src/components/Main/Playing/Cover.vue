<template>
    <div id="cover-container">
      <div id="cover-black">
        <div id="cover-transparent">
          <img v-if="imgUrl === null" src="../../../assets/images/jitai.png" alt=""/>
          <img v-else :src="imgUrl" alt="">
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Cover',
  data () {
    return {
      imgUrl: 'https://p2.music.126.net/Mqj2AlBSRo3jdE1wB2DnIQ==/109951163335585093.jpg'
    }
  }
}
</script>

<style scoped lang="scss">
#cover-container {
  display: flex;
  justify-content: center;
  align-items: center;
  #cover-black {
    width: 300px;
    height: 300px;
    border: 10px solid rgb(230, 229, 230);
    background-image: linear-gradient(-45deg,#333540,#070708,#333540);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    #cover-transparent {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
}
</style>
