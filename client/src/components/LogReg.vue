<template>
  <div>
    <b-modal id="modal-1" hide-footer>
      <template #modal-header>
        <b-tabs content-class="mt-3" align="center" class="full-width">
          <b-tab active><template #title >Login</template>
            <b-form class="px-3" action='#' @submit.prevent="login">
              <b-form-group id="input-group-1" label="Username:" label-for="input-1">
                <b-form-input id="input-1" v-model="username" type="name" required placeholder="Username eingeben">
                </b-form-input>
              </b-form-group>

              <b-form-group id="input-group-2" label="Passwort:" label-for="input-2">
                <b-form-input id="input-2" v-model="password" type="password" required placeholder="Passwort eingeben">
                </b-form-input>
              </b-form-group>
                 <b-alert v-if="alert" variant="warning" show class="mt-4">{{alert}}</b-alert>
              <div class="btncenter">
                <b-button type="submit" class="submit-btn my-2" variant="primary">Login</b-button>
              </div>
            </b-form>
          </b-tab>

          <b-tab> <template #title>Registrieren</template>
            <b-form class="px-3" action='#' @submit.prevent="register">
              <b-form-group id="input-group-1" label="Username:" label-for="input-1">
                <b-form-input id="input-3" type="name" v-model="username" required placeholder="Username eingeben">
                </b-form-input>
              </b-form-group>

              <b-form-group id="input-group-2" label="Passwort:" label-for="input-2">
                <b-form-input id="input-4" type="password" v-model="password" required placeholder="Passwort eingeben">
                </b-form-input>
              </b-form-group>
               <b-alert v-if="alert" variant="warning" show class="mt-4">{{alert}}</b-alert>
              <div class="btncenter">
                <b-button type="submit" class="submit-btn  my-2" variant="primary">Registrieren</b-button>
              </div>
            </b-form>
          </b-tab>

        </b-tabs>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'LogReg',
  data() {
    return {
        username:'',
        password:'',
        alert:'',
    }
  },  
  methods: {
    login() {
      this.axios.post('http://calendar-api:3000/api/login', {
          username: this.username,
          password: this.password
        })
        .then(response => {
          const token = response.data.token;
          const username = response.data.username;
          this.$store.commit('setToken', token);
          this.$store.commit('setUsername', username);
          this.$router.push('/calendar');
        })
        .catch(error => {
          this.output = error;
          this.alert = error.response.data;
        });
    },
    register() {
      this.axios.post('http://calendar-api:3000/api/register', {
          username: this.username,
          password: this.password
        })
        .then(response => {
          this.output = response.data;
          this.alert = "Registrierung erfolgreich";
        })
        .catch(error => {
          this.output = error.response;
          this.alert = error.response.data;
        });
    }
  },
  
}
  
</script>

<style scoped lang="scss">
.full-width {
  width: 100%;
}

.btncenter {
  text-align: center;

  .submit-btn {
    background-color: $bright;
    border: 0px;
    transition: opacity 0.2s ease-in-out;
    @include shadow;

    &:hover {
      background-color: $bright;
      opacity: 0.7;
    }
  }
}

</style>