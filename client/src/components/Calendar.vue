<template>
  <div id="Calendar">
    <div class="logout-container"><a class="logout" @click="logout" href="/">Logout</a></div>
    <h1 class="title">{{username}}'s Kalender</h1>
    <b-container v-if="!mobile" fluid class="calendar-container">
      <b-row>
        <Day v-for="(day,i) in days" :key="i" 
        :active="days[i].active" :current-day="days[i].currentDay" :current-date="days[i].currentDate" ref="day" :class="days[i] ? days[i].activeClass : '' " @click.native="changeActive(i)"/>
      </b-row>
    </b-container>
    <carousel v-if="mobile" class="mb-5" :perPage="1" :navigate-to="weekday" :paginationEnabled="false">
      <slide v-for="(day,i) in days" :key="i">
        <Day :active="days[i].active" :current-day="days[i].currentDay" :current-date="days[i].currentDate" ref="day" :class="days[i] ? days[i].activeClass : '' "/>
      </slide>
    </carousel>
    <b-icon @click="lastweek()" class="h2 arrow arrow-left" icon="arrow-left-circle-fill"></b-icon>
    <b-icon @click="nextweek()" class="h2 arrow arrow-right" icon="arrow-right-circle-fill"></b-icon>
    <p v-if="mobile" class="week">Woche</p>

  </div>
</template>

<script>
import moment from 'moment';
import Day from '../components/Day.vue'
import { Carousel, Slide } from 'vue-carousel';
import { mapState, mapActions } from "vuex";
import axios from 'axios';
export default {
  name: 'Calendar',
  data() {
    return {
      weekday : moment().isoWeekday() -1,
      activeDate:'',
      week: this.weekday == 6 ? -1 : 0,
      mobile: false,
      days: Array.apply(null, Array(7)).map(function (){ return {}}
      )
    }
  },
  components: {
    Day,Carousel,Slide
  },
  metaInfo: {
    title: 'Mein Kalender'
  },
  methods: {
    ...mapActions(['updateDate','updateWeekNr']),
    init: function (x) {
      let weekday = this.weekday;
      this.days = Array.apply(null, Array(7)).map(function (_, i) {
        return {
          currentDate: weekday < 0 ? moment(i, 'e').startOf('week').add(i, 'days').add(x,'week').format("DD.M.YY") : moment(i, 'e').startOf('week').add(i + 1, 'days').add(x,'week').format("DD.M.YY"),
          active: weekday === i,
          currentDay: weekday === i ? moment(i, 'e').locale('de').startOf('week').add(i, 'days').format("dddd") : moment(i, 'e').locale('de').startOf('week').add(i, 'days').format("dd"),
          activeClass: weekday === i ? 'active' : 'inactive',
        };
      });
    },
    logout() {
      sessionStorage.clear();
    },
    changeActive(i) {
    let ref = this;

    for(let x=0;x<7;x++){
      if(x === i){
        ref.days[x].active = true;
        ref.days[x].activeClass = 'active';
        ref.days[x].currentDay = moment(x, 'e').locale('de').startOf('week').add(x, 'days').   format("dddd") ;
      }
      else{
        ref.days[x].active = false;
        ref.days[x].activeClass = 'inactive';
        ref.days[x].currentDay = moment(x, 'e').locale('de').startOf('week').add(x, 'days').   format("dd") ;
      }
    }
    if(this.days[i].currentDate != ref.date){
      ref.updateDate(this.days[i].currentDate);
      ref.updateWeekNr(i);
      ref.$refs.day[i].getMeetings();
      } 
    },
    changeActiveMobile(){
      console.log('Event aktiv');
      let mobileActive = [...document.querySelectorAll(".VueCarousel-slide")];
      for(let i=0;i<mobileActive.length;i++){
        if (mobileActive[i].classList.contains('VueCarousel-slide-active')) {
          this.changeActive(i);
        }
      }

    },
    lastweek(){
      this.week--;
      this.weekday = 0;
      this.init(this.week)
      this.updateDate(this.days[0].currentDate);
      this.$refs.day[0].getMeetings();
    },
    nextweek(){
      this.week++;
      this.weekday = 0;
      this.init(this.week);
      this.updateDate(this.days[0].currentDate);
      this.$refs.day[0].getMeetings();
    },
    async send(){ 
      let ref = this;
      let timer = moment().format("HHmm");
      let timerGoal = [];
      let notifMeeting = [];
      const vkey = 'BD_vAQOMuyUoqPhqd4A5x0D6mXe0isJQMJJqKpWrvYECOSgZpPq-CNRLCURa6Ax-65GV2_Ej92JIOgCj-6VhG4U'
      const register = await navigator.serviceWorker.register('/worker.js', {scope: '/'});
      const notification = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(vkey)
      });
  

      setInterval(function () {
        ref.axios.get('http://calendar-api:3000/api/meeting', {
        headers: {
          Authorization: ref.token,
          activedate: moment().format("D.M.YY"),
          username: ref.username,
          weekNr: moment().format("e")-1
        }
      })
        .then(response => {
          for(let i=0;i<response.data.length;i++){
          notifMeeting[i] = response.data[i];
          timerGoal[i] = parseInt(response.data[i].time.replace(":",""));
          }
        })
        .catch(error => {
          console.log(error.response.data);
        });

        if(parseInt(moment().format("mm")) < 55){
          timer = parseInt(moment().format("HHmm"))+5;
        }
        else{
          timer = parseInt(moment().format("HHmm"))+ 45;
        }
       
        for (let i = 0; i < 2; i++) {
          if (timerGoal[i] === timer) {
            axios.post('http://calendar-api:3000/api/notifications', {
                data: notification,
                params:  {              
                  meeting : notifMeeting[i].title,
                  link: notifMeeting[i].link
                  },
                headers: {
                  'content-type': 'application/json',
                }
              })
              .then(response => {
                console.log(response);
              })
              .catch(error => {
                this.output = error;
                console.log(error.response.data);
              });
          }
        }
      }, 60000);


    },
      urlBase64ToUint8Array(base64String) {
      var padding = '='.repeat((4 - base64String.length % 4) % 4);
      var base64 = (base64String + padding)
          .replace(/-/g, '+')
          .replace(/_/g, '/');

      var rawData = window.atob(base64);
      var outputArray = new Uint8Array(rawData.length);

      for (var i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }
  },
  created() {
    if(!this.token){
      this.$router.push('/');
      alert("Bitte loggen sie sich ein!")
    }
    this.init(this.week),
    this.activeDate = moment().format("DD.M.YY");
    this.updateDate(this.activeDate);
    this.updateWeekNr(this.weekday);
    this.send().catch(err => console.log(err))
    let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    if (viewportWidth < 800) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
    // window.addEventListener('resize', function () {
    //   let ref = this;
    //   viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    //   if (viewportWidth < 800) {
    //     ref.mobile = true;
    //   } else {
    //     ref.mobile = false;
    //   }
    // }, false);
  },
  mounted() {
    if(this.mobile){
      let el = document.querySelector(".VueCarousel");
      el.addEventListener("touchend", this.changeActiveMobile, false);
    }
  },
   computed: {
    ...mapState({
      username: 'username',
      date: 'activeDate',
      token: 'token',
      weekNr: 'weekNr'
    })
    // getUsername () {
    //   return this.$store.state.username
    // },
    //  getToken () {
    //   return this.$store.state.token
    // },
    // getDate (){
    //   return this.$store.state.activeDate
    // }
   }

}
</script>

<style scoped lang="scss">

  .calendar-container{
    margin: 1vh 10vw;
    height: 80vh;
    width: 80vw;
    background-color: $grey;
    color: $mid;
    text-align: center;
    border-radius: 1rem;
  }

  .active{
    color: white;
    background-color: $bright;
    width: 36%;
    margin-left: 2%;
    margin-right: 2%;
    @include shadow2;
  }

  .inactive{
    width: 10%;
    cursor: pointer;

    &:hover{
      opacity: 0.7;
    }
  }


.logout-container{
  display: flex;
  justify-content: flex-end;
  .logout{
    color: $bright;
    font-size: 1.2rem;
    text-decoration: none;
    border: 1px solid $bright;
    padding: 5px 10px 8px 10px;
    margin: 2rem 10vw;
    border-radius: 0.5rem;

    &:hover{
      opacity: 0.6;
    }
  }
}

.title{
  color: $bright;
  position: absolute;
  top: 1.7rem;
  left: 10vw;
  font-weight: bold;
}

.arrow{
  color: $bright;
  position: absolute;
  top: 11rem;
  opacity: 0.3;
  cursor: pointer;

  &:hover{
    opacity: 1;
  }
}

.arrow-left{
  left: 5vw;
}

.arrow-right{
  right: 5vw;
}


//MOBILE

@media (max-width: 800px) { 

  .title{
    font-size: 2rem;
    width: 100vw;
    text-align: center;
    left: 0;
  }

  .logout-container{
  display: flex;
  justify-content: center;
  .logout{
    font-size: 0.8rem;
    margin: 0;
    margin-top: 5.5rem;
    margin-bottom: 1rem;
  }
}

  .active{
    width: 80%;
    margin-left: 10%;
  }

  .inactive{
    width: 80%;
    margin-left: 10%;
  }

  .arrow{
    font-size: 1rem;
    opacity: 0.8;
    position: absolute;
    top: auto;
    bottom: 3vh;
  }

  .arrow-left{
    left: 35vw;
  }

  .arrow-right{
    right: 35vw;
  }

  .week{
    font-size: 0.8rem;
    color: $mid;
    position: absolute;
    bottom: 3vh;
    left: 50%;
    transform: translate(-50%,0);
  }

}

.VueCarousel{
  
}




</style>