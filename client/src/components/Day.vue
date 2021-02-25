<template id="Day">
  <b-col md="auto" class="day pt-3">
    <h1 class="mb-2">{{currentDay}}</h1>
    <p :class="active ? '':'p-date'">{{currentDate}}</p>
<transition name="fade" mode="in-out">
    <div v-if="active">
      <Meeting  ref="meeting" v-for="(meeting,index) in meetings" :key="index" :thisTitle="meetings[index].title" :thisTime="meetings[index].time" :thisLink="meetings[index].link" :thisWeekly="meetings[index].weekly" :thisNotes="meetings[index].notes" v-on:delete-meeting="deleteMeeting (index)" :meetingId="meetings[index]._id"/>
    </div>
</transition>
   

    <div  v-if="active" class="gradient"></div>

<transition name="fade" mode="in-out">
    <div @click="addMeeting()" class="add-btn" v-if="active">
      <b-icon class="h3" icon="plus" ></b-icon>
    </div>
 </transition>
  </b-col>
</template>

<script>
import {eventBus} from "../main";
import Meeting from '../components/Meeting.vue'
import { mapState } from 'vuex'

export default {
  name: 'Day',
  components: {
    Meeting
  },
  data() {
    return {
      meetings: [],
    }
  },
  props: ['currentDay', 'currentDate', 'active'],
  methods: {
    addMeeting() {
      this.meetings.push(1);
      this.$nextTick( () => this.$refs.meeting[this.$refs.meeting.length-1].newMeeting());
    },
    updateMeeting() {
      this.getMeetings();
    },
    deleteMeeting(index){
      if(this.meetings[index].title){
       const deletedId = this.meetings[index]._id;
       this.axios.delete('http://calendar-api:3000/api/meeting' + deletedId, {
        headers: {
          id: deletedId
        }
      })
        .then(response => {
          console.log(response.data)
          this.updateMeeting();
        })
        .catch(error => {
          this.output = error;
          console.log(error.response.data);
        });
        }
        else{
          this.meetings.splice(index,1);
        }
    },
    getMeetings() {
      this.axios.get('http://calendar-api:3000/api/meeting', {
        headers: {
          Authorization: this.token,
          activedate: this.date,
          username: this.username,
          weekNr: this.weekNr
        }
      })
        .then(response => {
          this.meetings = response.data;
          this.meetings.sort((a, b) => parseFloat(a.time) - parseFloat(b.time));

        })
        .catch(error => {
          this.output = error;
          console.log(error.response.data);
        });
    },
  },
  computed: {
    ...mapState({
      username: 'username',
      date: 'activeDate',
      token: 'token',
      weekNr: 'weekNr'
    }),
  },
  mounted() {
    this.getMeetings();
    eventBus.$on('fireMethod', () => {
      this.updateMeeting();
    })
  },

}
</script>

<style lang="scss"> 
  .day {
    margin-top: 2%;
    border-radius: 1rem;
    height: 74vh;
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-content: center;
    scrollbar-width: none;

    h1 {
      font-size: 2rem;
      font-weight: bold;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }



  .add-btn {
    background-color: $grey;
    width: 50px;
    min-height: 50px;
    border-radius: 100px;
    color: $bright;
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    margin-top: 30px;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: 30px;
    z-index: 200;
    cursor: pointer;
    @include shadow2;
  }


  .fade-enter-active {
    transition: opacity .5s;
  }

  .fade-enter{
    opacity: 0;
  }
</style>