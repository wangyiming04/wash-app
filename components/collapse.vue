<template>
  <div>
    <div class="item">
        <div class="title"><slot name="title"></slot>
            <img src="../static/img/arrow-down.png" @click="boxshow = !boxshow">
        </div>
        <transition name="draw">   
            <div class="box"  v-show="boxshow">
                  <div class="content"><slot name="content"></slot></div>
            </div>
        </transition>
    </div>
  </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
             boxshow:false
        }
    }
}
</script>

<style>
.box{
	display: flex;
    height:200rpx;
	width:800rpx;
    background-color:rgb(230, 230, 230);
}
.item{
	/* width: 380rpx; */
	width: 100%;
    background-color:rgb(230, 230, 230) ;
}
.draw-enter-active, .draw-leave-active {
    /* transition: all 1s ease; */
}
.draw-enter, .draw-leave-to {
    height: 0;
}
.title{
    display: flex;
	width: 100%;
}
.item img{
    width: 30px;
    height: 30px;
    position: relative;
    left: 10px;
}
</style>
</style>
