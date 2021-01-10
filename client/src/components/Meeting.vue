<template id="Meeting">
  <div class="meeting-container">
    <b-row class="px-4 mt-4 meeting">

      <!-- HTML WENN BEARBEITEN -->

      <b-form @submit="onSubmit" v-if="edit">
        <b-row class="mt-3">
          <b-col>
            <input class="mb-3 ml-1" type="" name="title" id="title" v-model="form.title" placeholder="Titel" required>
          </b-col>
          <b-col>
            <b-form-checkbox switch size="lg" class="mb-4 checkbox" v-model="form.weekly" name="check-button">
              wöchentlich
            </b-form-checkbox>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <input class="mb-4  ml-1" type="url" name="url" id="url" v-model="form.link" placeholder="Meeting Link"
              pattern="https://.*" required>
          </b-col>
          <b-col>
            <input class="mb-4 ml-5" type="time" name="meetingtime" v-model="form.time" required>
          </b-col>
          <b-col>
            <b-button class="addbtn" type="submit" variant="dark">Hinzufügen</b-button>
          </b-col>
        </b-row>
        <b-row><span @click="edit = false" class="mt-4 cancel mx-auto">Abbrechen</span></b-row>
      </b-form>

      <!-- HTML WENN NICHT BEARBEITEN -->

      <p v-if="edit == false" class="time">{{thisTime}}</p>
      <h2 v-if="edit == false" class="title">{{thisTitle}}</h2>
      <b-row v-if="edit == false" class="mt-4">
        <a :href="thisLink" target="_blank">Zum Meeting
          <b-icon icon="arrow-right-square"></b-icon>
        </a>
      </b-row>
      <b-row>
        <b-dropdown v-if="edit == false" variant="link" class="editbtn" toggle-class="text-decoration-none" no-caret>
          <template #button-content>
            <b-icon icon="three-dots"></b-icon>
          </template>
          <b-dropdown-item @click="edit = true">Bearbeiten</b-dropdown-item>
          <b-dropdown-item @click="$emit('delete-meeting')">Löschen</b-dropdown-item>
        </b-dropdown>
      </b-row>
    </b-row>
  </div>
</template>

<script>
import {eventBus} from "../main";
import { mapState } from 'vuex'
export default {
  name: 'Meeting',
  data() {
    return {
      edit: false,
      form: {
        title: '',
        link: '',
        time: '',
        weekly: false
      },
    }
  },
  props: ['thisTitle', 'thisLink', 'thisTime'],
  methods: {
    onSubmit(event) {
      event.preventDefault()
      this.axios.post('http://localhost:3000/api/meeting', {
          username: this.username,
          date: this.date,
          title: this.form.title,
          weekly: this.form.weekly ? this.weekNr : 'unique meeting',
          link: this.form.link,
          time: this.form.time
        })
        .then(response => {
          console.log(response.data);
          eventBus.$emit('fireMethod');
          this.edit = false;
        })
        .catch(error => {
          this.output = error;
          this.alert = error.response.data;
        });
    },
  },
  computed: {
    ...mapState({
      username: 'username',
      date: 'activeDate',
      weekNr: 'weekNr'
    })
  },
}
</script>

<style lang="scss"> 
$primary: $bright;

.meeting-container {
  display: flex;
  justify-content: center;
  width: 100%;

  .meeting {
    background-color: $brighter;
    padding: 2rem 0;
    border-radius: 1rem;
    @include shadow2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative;

    input {
      border-radius: 5px;
      border: 0;
      padding: 5px 5px;
      float: left;
    }

    .addbtn {
      background-color: $bright;
      border: 0;
    }

    // .checkbox {}

    .cancel {
      cursor: pointer;
    }

    a {
      font-size: 1.1rem;
      color: white;
      text-decoration: none;

      &:hover {
        opacity: 0.7;
      }
    }

    .editbtn {
      margin-top: 3rem;

      button {
        color: white;
        font-size: 1.2rem;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);

        &:hover {
          color: $bright;
        }
      }

      & a {
        color: black;
        font-size: 1rem;
      }
    }

    .time{
      position: absolute;
      right: 1rem;
      top: 0.7rem;
    }

    .title{
      font-size: 1.3rem;
      position: absolute;
      left: 1rem;
      top: 0.7rem;
    }

    .row{
      position: relative;
    }

  }
}


</style>