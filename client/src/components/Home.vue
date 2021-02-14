<template>
  <div id="Home">
    <b-container fluid class="hero">
      <b-link href='/'>
        <b-icon class="h2 logo" icon="calendar3"></b-icon>
      </b-link>
      <ButtonA  v-b-modal.modal-1 class="btn" btn-text="Login" />
      <h1>Willkommen zum Online Kalender!</h1>
      <ButtonA v-b-modal.modal-1 class="btn-r" btn-text="Zum Kalender" />
    </b-container>
    <LogReg/>
  </div>
</template>

<script>
import ButtonA from '../components/ButtonA.vue'
import LogReg from '../components/LogReg.vue'

export default {

  name: 'Home',
  components: {
    ButtonA,
    LogReg
  },
  props: {
 
  },
  metaInfo: {
    title: 'Willkommen'
  }
}
</script>

<style scoped lang="scss">

  .hero{
    background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    height: 100vh;

    & h1{
      padding-top: 40vh;
      text-align: center;
    }

    & .logo{
      margin-top: 1.8rem !important;
      margin-left: 1rem !important;;

    }

    .btn{
      float: right;
      margin-top: 1.2rem;
      margin-right: 0.5rem;
    }

    .btn-r{
      text-align: center;
      margin-top: 2rem;
      
       &:focus{
         outline: none;
      }
    }

    a{
      color: white;
      opacity: 1;

      &:hover{
        opacity: 0.7;
      }
    }
  }


</style>
