<template>
  <div id="app">
    <transition name="slide" mode="out-in">
        <router-view/>
    </transition>
  </div>
</template>

<script>


export default {
  name: 'App',

}
</script>

<style>

.slide-enter-active,
.slide-leave-active{
  transition: opacity 1s, transform 1s;
}

.slide-enter,
.slide-leave-to{
  opacity: 0;
  transform: translateY(-100%);
}

</style>
