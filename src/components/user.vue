<script setup>
  import { reactive, ref, onBeforeMount, nextTick, onMounted, onUnmounted} from 'vue'
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  import { useRouter } from 'vue-router';
  import { SkinViewer, IdleAnimation } from 'skinview3d';
import { TextureLoader } from 'three';

 

  // reactive state
    const route = useRoute();
    const router = useRouter();
    const userdata = reactive({data:[], exists:true, loaded: false, rank: "", rank_color: "", plus_color: "", plusses: ""});
    const InputUsername2 = ref(route.params.username)
    const colorCodes={
      '0':'#000000',
      '1':'#0000AA',
      '2':'#00AA00',
      '3':'#00AAAA',
      '4':'#00AAAA',
      '5':'#AA00AA',
      '6':'#FFAA00',
      '7':'#AAAAAA',
      '8':'#555555',
      '9':'#5555FF',
      'a':'#55FF55',
      'b':'#55FFFF',
      'c':'#FF5555',
      'd':'#FF55FF',
      'e':'#FFFF55',
      'f':'#FFFFFF'
    }
// functions that mutate state and trigger updates
  function SendTo2(InputUsername2){
    router.push(`/user/${InputUsername2}`)
    setTimeout(function(){ router.go(0); }, 1);
  }

  function getRank(rank, plusColor, rankFormatted){
    switch(rank){
      case "MVP_PLUS_PLUS":
        userdata.rank = '[MVP'
        userdata.rank_color = colorCodes[rankFormatted.charAt(1)]
        userdata.plus_color = colorCodes[plusColor.charAt(1)]
        userdata.plusses = '++'
        break;
      case "MVP_PLUS":
        userdata.rank = '[MVP'
        userdata.rank_color = colorCodes[rankFormatted.charAt(1)]
        userdata.plus_color = colorCodes[plusColor.charAt(1)]
        userdata.plusses = '+'
        break;
      case "MVP":
        userdata.rank = '[MVP'
        userdata.rank_color = colorCodes[rankFormatted.charAt(1)]
        userdata.plus_color = colorCodes[plusColor.charAt(1)]
        break;
      case "VIP_PLUS":
        userdata.rank = '[VIP'
        userdata.rank_color = colorCodes[rankFormatted.charAt(1)]
        userdata.plus_color = colorCodes[plusColor.charAt(1)]
        userdata.plusses = '+'
        break;
      case "VIP":
        userdata.rank = '[VIP'
        userdata.rank_color = colorCodes[rankFormatted.charAt(1)]
        userdata.plus_color = colorCodes[plusColor.charAt(1)]
        break;
      case null:
      userdata.rank = ''
        break;
      case "YOUTUBER":
        userdata.rank = '['
        userdata.rank_color = colorCodes[rankFormatted.charAt(1)]
        userdata.plus_color = '#FFFFFF'
        userdata.plusses = 'YOUTUBE'
        break;
      default:
        userdata.rank = ''
        userdata.rank_color = colorCodes[rankFormatted.charAt(1)]
        userdata.plus_color = colorCodes[plusColor.charAt(1)]
        break;
    }
    console.log(userdata.rank)
  }

  function resizeCanv(skinViewer){
      nextTick(function(){
        skinViewer.width = window.innerWidth*0.243;
        skinViewer.height = window.innerHeight*0.8*0.9;
      })
  }

  function getData(username){
    axios
      .get(`https://api.slothpixel.me/api/players/${username}`)
      .catch(function (error) {
        userdata.exists = false
      })
      .then((response) => {
        if (response){
          userdata.data=response.data;
          userdata.loaded = true;
          console.log(response.data);
          getRank(response.data.rank, response.data.rank_plus_color, response.data.rank_formatted)
        }
        else{
          userdata.loaded = true;
        }
      })
  }
  
  function renderskin(){
    let skinViewer = new SkinViewer({
    	canvas: document.getElementById("skin_container"),
      width: window.innerWidth*0.243,
    	height: window.innerHeight*0.8*0.9,
    	skin: `https://crafatar.com/skins/${userdata.data.uuid}`
    });
    window.addEventListener("resize", function(){resizeCanv(skinViewer);});
    // Change viewer size
    skinViewer.loadCape(null);
    // Change camera FOV
    skinViewer.fov = 90;
    // Zoom out
    skinViewer.zoom = 0.7;
    // Apply an animation
    skinViewer.animation = new IdleAnimation();
    // Set the speed of the animation
    skinViewer.animation.speed = 1;
}
function runRender(){
  if (userdata.loaded == true) {
    nextTick(function(){if(userdata.exists == true){renderskin()}});
  } else {
    setTimeout(runRender, 15);
  }
}
  // lifecycle hooks
  onBeforeMount(() => {
    const user = route.params.username
    getData(user)
  })

  onMounted(() => {
    runRender();
  })

  onUnmounted(() => {
    window.removeEventListener("resize", resizeCanv());
  })

  </script>
  


<template>
  <div v-if="userdata.loaded == false">
    <div class="main">
      <div class="spinner">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>


  <div key='User' v-else-if="userdata.exists == true">
    <div class="mainuser">
      <div class="skinimg">
        <canvas id="skin_container"></canvas>
      </div>
      <div class="username">
        <span :style="{'color': userdata.rank_color}">{{userdata.rank}}</span>
        <span :style="{'color': userdata.plus_color}">{{userdata.plusses}}</span>
        <span v-if="userdata.rank != ''" :style="{'color': userdata.rank_color}">] {{userdata.data.username}}</span>
        <span v-else :style="{'color': userdata.rank_color}">{{userdata.data.username}}</span>
        <span></span>
      </div>
    </div>
  </div>


  <div key='noUser' v-else>
    <div class="main">
      <div class="form__group field">
        <input required="" placeholder="Name" class="form__field" type="input" v-model="InputUsername2" @keyup.enter="SendTo2(InputUsername2)">
        <label class="form__label" for="name">Username</label>
      </div>
      <label class="unf">User not found</label>
      <div class="Statbutton center">
        <button @click="SendTo2(InputUsername2)">Get Stats</button>
      </div>
    </div>  
  </div>
</template>
    
    

<style scoped>
html, body {margin: 0; padding: 0}
.username{
  bottom: 43%;
  right: 15%;
  font-family: Minecraft;
  font-size: 35px;
  display: flex;
  width: 60%;
  height:13%;
  background-color: rgba(48, 47, 47, 0.493);
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  border-radius: 27px;
}
#skin_container{
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  border-radius: 27px;
}
.skinimg{
  position: absolute;
  right: 3%;
  width: 27%;
  height:90%;
  background-color: rgba(48, 47, 47, 0.493);
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  border-radius: 27px;
}
.mainuser{
  display: grid;
  left: 5vw;
  right: 5wv;
  width: 90vw;
  height: 80vh;
  background-color: rgba(85, 63, 99, 0.425);
  place-items: center;
  padding:5%;
  backdrop-filter: blur(7px);
  border-radius: 27px;
}
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

.unf{
  color: rgb(248, 64, 64);
}
.Statbutton {
  top:-4.5em;
}

/* From uiverse.io by @satyamchaudharydev */
.spinner {
 --clr: #17C3B2;
 --gap: 6px;
   /* gap between each circle */
 width: 100px;
 height: 100px;
 display: flex;
 justify-content: center;
 align-items: center;
 gap: var(--gap);
}

.spinner span {
 width: 20px;
 height: 20px;
 border-radius: 100%;
 background-color: var(--clr);
 opacity: 0;
}

.spinner span:nth-child(1) {
 animation: fade 1s ease-in-out infinite;
}

.spinner span:nth-child(2) {
 animation: fade 1s ease-in-out 0.33s infinite;
}

.spinner span:nth-child(3) {
 animation: fade 1s ease-in-out 0.66s infinite;
}

@keyframes fade {
 0%, 100% {
  opacity: 1;
 }

 60% {
  opacity: 0;
 }
}

/* From uiverse.io by @mrhyddenn */
.form__group {
  position: relative;
  padding: 20px 0 0;
  margin-top: 10px;
  width: 35%;
  top: 4em;
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

