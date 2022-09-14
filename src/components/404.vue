<script setup>
  import { ref, onMounted} from 'vue'


  // reactive state

  

  
  // lifecycle hooks
  onMounted(() => {
  })
  </script>
  



  <template>
    <div class="main">
      <h1>Page Not Found</h1>
      <div class="Statbutton center">
        <router-link to="/">
          <button>Go back</button>
        </router-link>
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

h1{
  color: rgb(204, 204, 204);
  font-size:4vmax;

}

.center {
display: grid;
place-items: center;
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
  </style>

