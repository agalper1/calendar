<template>
  <div id="Calendar">
    <div class="logout-container"><a class="logout" @click="logout" href="/">Logout</a></div>
    <h1 class="title">{{username}}'s Kalender</h1>
    <b-container fluid class="calendar-container">
      <b-row>
        <Day v-for="(day,i) in days" :key="i" 
        :active="days[i].active" :current-day="days[i].currentDay" :current-date="days[i].currentDate" ref="day" :class="days[i] ? days[i].activeClass : '' " @click.native="changeActive(i)"/>
      </b-row>
    </b-container>
    <b-icon @click="lastweek()" class="h2 arrow arrow-left" icon="arrow-left-circle-fill"></b-icon>
    <b-icon @click="nextweek()" class="h2 arrow arrow-right" icon="arrow-right-circle-fill"></b-icon>

  </div>
</template>

<script>
import moment from 'moment';
import Day from '../components/Day.vue'
import { mapState, mapActions } from "vuex";

export default {
  name: 'Calendar',
  data() {
    return {
      weekday : moment().format("d") - 1,
      activeDate:'',
      week: 0,
      days: Array.apply(null, Array(7)).map(function (){ return {}}
      )
    }
  },
  components: {
    Day
  },
  metaInfo: {
    title: 'Mein Kalendar'
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
    }
  },
  created() {
    this.init(0),
    this.activeDate = moment().format("DD.M.YY");
    this.updateDate(this.activeDate);
    this.updateWeekNr(this.weekday);
  },
  mounted() {
    // this.changeActive();
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


</style>