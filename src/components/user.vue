<script setup>
  import { reactive, ref, onBeforeMount, nextTick, onMounted, onUnmounted} from 'vue'
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  import { useRouter } from 'vue-router';
  import { SkinViewer, IdleAnimation } from 'skinview3d';

 

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

    const gameStats = {
      'wins':'',
      'losses' : '',
      'wlr' : '',
      'kills' : '',
      'deaths' : '',
      'kdr' : '',
      'assists' : '',
      'games' : '',
      'souls' : ''
    }
// functions that mutate state and trigger updates
  function SendTo2(InputUsername2){
    router.push(`/user/${InputUsername2}`)
    setTimeout(function(){ router.go(0); }, 1);
  }
//ranks
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
//set mode
function setMode(mode){
    switch (mode){
      case 'SwOa':
        gameStats.wins = userdata.data.stats.SkyWars.wins;
        gameStats.losses = userdata.data.stats.SkyWars.losses;
        gameStats.wlr = userdata.data.stats.SkyWars.win_loss_ratio;
        gameStats.kills = userdata.data.stats.SkyWars.kills;
        gameStats.deaths = userdata.data.stats.SkyWars.deaths;
        gameStats.kdr = userdata.data.stats.SkyWars.kill_death_ratio;
        gameStats.assists = userdata.data.stats.SkyWars.assists;
        gameStats.games = userdata.data.stats.SkyWars.games_played;
        gameStats.souls = userdata.data.stats.SkyWars.souls;
        console.log(gameStats.souls);

      case 'SwSoloNormal':
        gameStats.wins = userdata.data.stats.SkyWars.gamemodes.solo_normal.wins;
        gameStats.losses = userdata.data.stats.SkyWars.gamemodes.solo_normal.losses;
        gameStats.wlr = userdata.data.stats.SkyWars.gamemodes.solo_normal.win_loss_ratio;
        gameStats.kills = userdata.data.stats.SkyWars.gamemodes.solo_normal.kills;
        gameStats.deaths = userdata.data.stats.SkyWars.gamemodes.solo_normal.deaths;
        gameStats.kdr = userdata.data.stats.SkyWars.gamemodes.solo_normal.kill_death_ratio;
        gameStats.assists = userdata.data.stats.SkyWars.gamemodes.solo_normal.assists;
        gameStats.games = userdata.data.stats.SkyWars.gamemodes.solo_normal.games_played;
        gameStats.souls = userdata.data.stats.SkyWars.gamemodes.solo_normal.souls;

      case 'SwDuoNormal':
        gameStats.wins = userdata.data.stats.SkyWars.gamemodes.team_normal.wins; 
        gameStats.losses = userdata.data.stats.SkyWars.gamemodes.team_normal.loss;
        gameStats.wlr = userdata.data.stats.SkyWars.gamemodes.team_normal.win_los;
        gameStats.kills = userdata.data.stats.SkyWars.gamemodes.team_normal.kills;
        gameStats.deaths = userdata.data.stats.SkyWars.gamemodes.team_normal.deat;
        gameStats.kdr = userdata.data.stats.SkyWars.gamemodes.team_normal.kill_de;
        gameStats.assists = userdata.data.stats.SkyWars.gamemodes.team_normal.ass;
        gameStats.games = userdata.data.stats.SkyWars.gamemodes.team_normal.games;
        gameStats.souls = userdata.data.stats.SkyWars.gamemodes.team_normal.souls;

        case 'SwSoloInsane':
        gameStats.wins = userdata.data.stats.SkyWars.gamemodes.solo_insane.wins;
        gameStats.losses = userdata.data.stats.SkyWars.gamemodes.solo_insane.losses;
        gameStats.wlr = userdata.data.stats.SkyWars.gamemodes.solo_insane.win_loss_ratio;
        gameStats.kills = userdata.data.stats.SkyWars.gamemodes.solo_insane.kills;
        gameStats.deaths = userdata.data.stats.SkyWars.gamemodes.solo_insane.deaths;
        gameStats.kdr = userdata.data.stats.SkyWars.gamemodes.solo_insane.kill_death_ratio;
        gameStats.assists = userdata.data.stats.SkyWars.gamemodes.solo_insane.assists;
        gameStats.games = userdata.data.stats.SkyWars.gamemodes.solo_insane.games_played;
        gameStats.souls = userdata.data.stats.SkyWars.gamemodes.solo_insane.souls;

        case 'SwDuoInsane':
        gameStats.wins = userdata.data.stats.SkyWars.gamemodes.team_insane.wins;
        gameStats.losses = userdata.data.stats.SkyWars.gamemodes.team_insane.losses;
        gameStats.wlr = userdata.data.stats.SkyWars.gamemodes.team_insane.win_loss_ratio;
        gameStats.kills = userdata.data.stats.SkyWars.gamemodes.team_insane.kills;
        gameStats.deaths = userdata.data.stats.SkyWars.gamemodes.team_insane.deaths;
        gameStats.kdr = userdata.data.stats.SkyWars.gamemodes.team_insane.kill_death_ratio;
        gameStats.assists = userdata.data.stats.SkyWars.gamemodes.team_insane.assists;
        gameStats.games = userdata.data.stats.SkyWars.gamemodes.team_insane.games_played;
        gameStats.souls = userdata.data.stats.SkyWars.gamemodes.team_insane.souls;
    }
    console.log(gameStats);
    console.log(userdata.data.stats.SkyWars.souls);
    console.log(gameStats.souls)
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
    <nav>
		<menu>
      <menuitem>
        <a>Skywars</a>
        <menu>
          <menuitem>
            <a @click="setMode('SwOa')">Overall</a>
          </menuitem>
          <menuitem>
            <a>Solos</a>
            <menu>
               <menuitem><a @click="setMode('SwSoloNormal')">Normal</a></menuitem>
               <menuitem><a @click="setMode('SwSoloInsane')">Insane</a></menuitem>
            </menu>  
          </menuitem>
          <menuitem>
            <a>Doubles</a>
            <menu>
               <menuitem><a @click="setMode('SwDuoNormal')">Normal</a></menuitem>
               <menuitem><a @click="setMode('SwDuoInsane')">Insane</a></menuitem>
            </menu>  
          </menuitem>
        </menu>
      </menuitem>
			<menuitem>
				<a>BedWars</a>
				<menu>
					<menuitem><a>Core</a></menuitem>
          <menuitem><a>Duos</a></menuitem>
          <menuitem><a>Trios</a></menuitem>
          <menuitem><a>Fours</a></menuitem>
          <menuitem><a>4v4</a></menuitem>
				</menu>
			</menuitem>
      <menuitem><a>Overall</a></menuitem>
		</menu>
	</nav>

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
      <div class="info">
          <div class="data11 datacontainer">
            <span class="dataName">Wins</span><br>
            <span class="dataNumber">{{userdata.data.stats.BedWars.wins}}</span>
          </div>
          <div class="data12 datacontainer">
            <span class="dataName">Losses</span><br>
            <span class="dataNumber">{{userdata.data.stats.BedWars.losses}}</span>
          </div>
          <div class="data13 datacontainer">
            <span class="dataName">WLR</span><br>
            <span class="dataNumber">{{userdata.data.stats.BedWars.w_l}}</span>
          </div>

          <div class="data21 datacontainer">
            <span class="dataName">Final Kills</span><br>
            <span class="dataNumber">{{userdata.data.stats.BedWars.final_kills}}</span>
          </div>
          <div class="data22 datacontainer">
            <span class="dataName">Final deaths</span><br>
            <span class="dataNumber">{{userdata.data.stats.BedWars.final_deaths}}</span>
          </div>
          <div class="data23 datacontainer">
            <span class="dataName">FKDR</span><br>
            <span class="dataNumber">{{userdata.data.stats.BedWars.final_k_d}}</span>
          </div>

          <div class="data31 datacontainer">
            <span class="dataName">Kills</span><br>
            <span class="dataNumber">{{userdata.data.stats.BedWars.kills}}</span>
          </div>
          <div class="data32 datacontainer">
            <span class="dataName">Deaths</span><br>
            <span class="dataNumber">{{userdata.data.stats.BedWars.deaths}}</span>
          </div>
          <div class="data33 datacontainer">
            <span class="dataName">KDR</span><br>
            <span class="dataNumber">{{userdata.data.stats.BedWars.k_d}}</span>
          </div>

          <div class="data41 datacontainer">
            <span class="dataName">Beds Broken</span><br>
            <span class="dataNumber">{{userdata.data.stats.BedWars.beds_broken}}</span>
          </div>
          <div class="data42 datacontainer">
            <span class="dataName">Beds Lost</span><br>
            <span class="dataNumber">{{userdata.data.stats.BedWars.beds_lost}}</span>
          </div>
          <div class="data43 datacontainer">
            <span class="dataName">BBLR</span><br>
            <span class="dataNumber">{{userdata.data.stats.BedWars.bed_ratio}}</span>
          </div>

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
.data11{
  grid-row: 1;
  grid-column: 1;
  color: #55FF55;
}
.data12{
  grid-row: 1;
  grid-column: 2;
  color: #FF5555;
}
.data13{
  grid-row: 1;
  grid-column: 3;
  color: #FF00DC;
}
.data21{
  grid-row: 2;
  grid-column: 1;
  color: #55FF55;

}
.data22{
  grid-row: 2;
  grid-column: 2;
  color: #FF5555;
}
.data23{
  grid-row: 2;
  grid-column: 3;
  color: #FF00DC;
}
.data31{
  grid-row: 3;
  grid-column: 1;
  color: #55FF55;
}
.data32{
  grid-row: 3;
  grid-column: 2;
  color: #FF5555;
}
.data33{
  grid-row: 3;
  grid-column: 3;
  color: #FF00DC;
}
.data41{
  grid-row: 4;
  grid-column: 1;
  color: #55FF55;
}
.data42{
  grid-row: 4;
  grid-column: 2;
  color: #FF5555;
}
.data43{
  grid-row: 4;
  grid-column: 3;
  color: #FF00DC;
}
.info{
  display: grid;
  position: absolute;
  top: 30%;
  left: 12%;
  font-family: Minecraft;
  font-size: 30px;
  width: 50%;
  height:60%;
  grid-gap: 5%;
  justify-content: center;
  align-content: center;
}
.dataName{
  font-size: clamp(0.2rem, -0.875rem + 8.333vw, 1.2rem);
}
.datacontainer{
  width: 13vw;
  height: 12vh;
  background-color: rgba(48, 47, 47, 0.493);
  border-radius: 8px;
  text-align: center;
  justify-content: center;
  align-content: center;
}
.username{
  position: absolute;
  top: 11%;
  left: 12%;
  font-family: Minecraft;
  font-size: 35px;
  display: flex;
  width: 50%;
  height:11%;
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

/* nav bar */
html, body{
   padding:0px;
   margin:0px;
   background:#191A1D;
   font-family: 'Karla', sans-serif;
   width:100vw;
}
body * {
   margin:0;
   padding:0;
}

/* HTML Nav Styles */
/* HTML Nav Styles */
/* HTML Nav Styles */
nav menuitem {
   position:relative;
   display:block;
   opacity:0;
   cursor:pointer;
}

nav menuitem > menu {
   position: absolute;
   pointer-events:none;
}
nav > menu { display:flex; }

nav > menu > menuitem { pointer-events: all; opacity:1; }
menu menuitem a { white-space:nowrap; display:block; }
   
menuitem:hover > menu {
   pointer-events:initial;
}
menuitem:hover > menu > menuitem,
menu:hover > menuitem{
   opacity:1;
}
nav > menu > menuitem menuitem menu {
   transform:translateX(100%);
   top:0; right:0;
}
/* User Styles Below Not Required */
/* User Styles Below Not Required */
/* User Styles Below Not Required */

nav { 
   z-index: 100;
   float:right;
}
nav a {
   background:#75F;
   color:#FFF;
   min-width:190px;
   transition: background 0.5s, color 0.5s, transform 0.5s;
   margin:0px 6px 6px 0px;
   padding:20px 40px;
   box-sizing:border-box;
   border-radius:3px;
   box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
   position:relative;
}

nav a:hover:before {
   content: '';
   top:0;left:0;
   position:absolute;
   background:rgba(0, 0, 0, 0.2);
   width:100%;
   height:100%;
}

nav > menu > menuitem > a + menu:after{
   content: '';
   position:absolute;
   border:10px solid transparent;
   border-top: 10px solid white;
   left:12px;
   top: -40px;  
}
nav menuitem > menu > menuitem > a + menu:after{ 
   content: '';
   position:absolute;
   border:10px solid transparent;
   border-left: 10px solid white;
   top: 20px;
   left:-180px;
   transition: opacity 0.6, transform 0s;
}

nav > menu > menuitem > menu > menuitem{
   transition: transform 0.6s, opacity 0.6s;
   transform:translateY(150%);
   opacity:0;
}
nav > menu > menuitem:hover > menu > menuitem,
nav > menu > menuitem.hover > menu > menuitem{
   transform:translateY(0%);
   opacity: 1;
}

menuitem > menu > menuitem > menu > menuitem{
   transition: transform 0.6s, opacity 0.6s;
   transform:translateX(195px) translateY(0%);
   opacity: 0;
} 
menuitem > menu > menuitem:hover > menu > menuitem,  
menuitem > menu > menuitem.hover > menu > menuitem{  
   transform:translateX(0) translateY(0%);
   opacity: 1;
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

