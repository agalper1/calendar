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
    <b-container fluid class="description">
      <b-card-group deck>
          <b-card no-body class="overflow-hidden">
            <b-row no-gutters>
              <b-col md="12" class="img-row">
                <b-card-img src="./img/illustrations/meeting.png" alt="Image" class="rounded-0"></b-card-img>
              </b-col>
              <b-col md="12" class="text-row">
                <b-card-body title="Kalender">
                  <b-card-text class="pt-3">
                    Ein strukturierter und moderner Kalender für Online Meetings
                  </b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
          <b-card no-body class="overflow-hidden">
            <b-row no-gutters>
              <b-col md="12" class="img-row">
                <b-card-img src="./img/illustrations/notification.png" alt="Image" class="rounded-0"></b-card-img>
              </b-col>
              <b-col md="12" class="text-row">
                <b-card-body title="Push Benachrichtigungen">
                  <b-card-text class="pt-3">
                   Sie werden vor jedem Meeting benachrichtigt, sodass sie kein Meeting mehr verpassen
                  </b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
          <b-card no-body class="overflow-hidden">
            <b-row no-gutters>
              <b-col md="12" class="img-row">
                <b-card-img src="./img/illustrations/notes.png" alt="Image" class="rounded-0"></b-card-img>
              </b-col>
              <b-col md="12" class="text-row">
                <b-card-body title="Notizen">
                  <b-card-text class="pt-3">
                    Mit der Web App lassen sich ganz einfach Notizen erstellen
                  </b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
      </b-card-group>
    </b-container>
    <b-container class="footer">
      <p>© 2021 Alexander Galperin </p>
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
    height: 80vh;

    & h1{
      padding-top: 30vh;
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

  .description{
    margin-top: 3rem;
    margin-bottom: 1rem;

    .card-deck{
      display: flex;
      justify-content: center;
    .card{
      transform: translate(0,-30%);
      top: 0;
      @include shadow2;
      max-width: 25vw;
      min-height: 45vh;
      
      .img-row{
        display: flex;
        justify-content: center;
        img{
          margin-top: 5%;
          max-height: 20vh;
          width: auto;
        }
      }

      .text-row{
        margin-top: 10%;
      }

      .card-body{
        h4{
          font-size: 1.3rem;
        }
      }

    }
    }

    .no-gutters{

    }
  }

  .footer{
    display: flex;
    justify-content: center;

    p{
      font-size: 0.8rem;
      color: rgba($mid,0.6);
      padding-bottom: 1rem;
    }
  }

  //MOBILE

@media (max-width: 800px) { 
  .card-deck{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transform: translate(0,-7%);

    .card{
      transform: translate(0,0) !important;
      min-width: 80vw !important;
      margin-bottom: 3rem;
      
    }

  }
}

</style>
