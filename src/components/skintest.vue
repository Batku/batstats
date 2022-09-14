<script setup>
import { SkinViewer, IdleAnimation } from 'skinview3d';
import { nextTick, onMounted } from 'vue'

function renderskin(){
	let skinViewer = new SkinViewer({
		canvas: document.getElementById("skin_container"),
		width: 300,
		height: 400,
		skin: "https://crafatar.com/skins/7e65c65abf4c4311942a666125683103"
	});

	// Change viewer size
	skinViewer.width = 600;
	skinViewer.height = 800;

	// Load another skin
	//skinViewer.loadSkin("img/skin2.png");

	// Load a cape
	//skinViewer.loadCape("img/cape.png");

	// Load an elytra (from a cape texture)
	//skinViewer.loadCape("img/cape.png", { backEquipment: "elytra" });

	// Unload(hide) the cape / elytra
	skinViewer.loadCape(null);


	// Change camera FOV
	skinViewer.fov = 90;

	// Zoom out
	skinViewer.zoom = 0.5;

	// Rotate the player
	skinViewer.autoRotate = false;

	// Apply an animation
	skinViewer.animation = new IdleAnimation();

	// Set the speed of the animation
	skinViewer.animation.speed = 1;

	// Pause the animation
	skinViewer.animation.paused = false;

}

onMounted(() => {
    nextTick(renderskin());
  })

</script>

<template>
  <canvas id="skin_container"></canvas>
</template>

<style scoped>
    
</style>