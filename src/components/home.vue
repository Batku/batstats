<script setup>
  import { ref, onMounted} from 'vue'
  import { useRouter } from 'vue-router';

  // reactive state
  const router = useRouter();
  
  // functions that mutate state and trigger updates
  function SendTo(username){
    router.push(`user/${username}`)
  }
  
  // lifecycle hooks
  onMounted(() => {
  })
  </script>
  



  <template>
    <div class="main">
      <div class="form__group field">
          <input required="" placeholder="Name" class="form__field" type="input" v-model="InputUsername" @keyup.enter="SendTo(InputUsername)">
          <label class="form__label" for="name">Username</label>
      </div>
      <div class="Statbutton center">
          <button @click="SendTo(InputUsername)">Get Stats</button>
      </div>
    </div>
  </template>
  



<style scoped>
html, body {margin: 0; padding: 0}
.main{
  display: grid;
  left: 25vw;
  right: 25vw;
  width: 50vw;
  height: 50vh;
  background-color: rgba(85, 63, 99, 0.425);
  border-radius: 27px;
  place-items: center;
  padding:5%;
  backdrop-filter: blur(7px);
}
.center {
display: grid;
place-items: center;
}

.Statbutton {
  top:-5em;
}


/* From uiverse.io by @mrhyddenn */
.form__group {
  position: relative;
  padding: 20px 0 0;
  margin-top: 10px;
  width: 35%;
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: none;
  border-bottom: 2px solid #ffffff;
  outline: 0;
  font-size: 23px;
  color: #fff;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
}

.form__field::placeholder {
  color: transparent;
}

.form__field:placeholder-shown ~ .form__label {
  font-size: 23px;
  cursor: text;
  top: 20px;
}

.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 17px;
  color: #ffffff;
  pointer-events: none;
}

.form__field:focus {
  padding-bottom: 6px;
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, #063530, #17C3B2);
  border-image-slice: 1;
}

.form__field:focus ~ .form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 17px;
  color: #17C3B2;
  font-weight: 700;
}

/* reset input */
.form__field:required, .form__field:invalid {
  box-shadow: none;
}

/* From uiverse.io by @nikk7007 */
button {
 padding: 0.8em 1.8em;
 border: 2px solid #17C3B2;
 position: relative;
 overflow: hidden;
 background-color: transparent;
 text-align: center;
 text-transform: uppercase;
 font-size: 16px;
 transition: .3s;
 z-index: 1;
 font-family: inherit;
 color: #17C3B2;
}

button::before {
 content: '';
 width: 0;
 height: 300%;
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%) rotate(45deg);
 background: #17C3B2;
 transition: .5s ease;
 display: block;
 z-index: -1;
}

button:hover::before {
 width: 105%;
}

button:hover {
 color: #111;
}

@media only screen and (max-width: 600px) {
.main{
  left: 10vw;
  right: 10vw;
  width: 80vw;
  height: 35vh;
  background-color: rgba(85, 63, 99, 0.425);
  border-radius: 27px;
  place-items: center;
  padding:0;
}
}

  </style>

