// JavaScript Document

/**
 * Created by Silvia Fortunato, Nazzareno Marziale, Francesco Nobilia
 */

function createLight(){
	// create point light to illuminate the scene
	pointLight = new THREE.PointLight(0xFFFFD0);

	// set its position
	pointLight.position.x = 400;
	pointLight.position.y = 0;
	pointLight.position.z = 600;
	pointLight.intensity = 1.5;
	pointLight.distance = 5000;
	
	// add to the scene on rigth side
	scene.add(pointLight);
	
	var intensitySpot = 0.3;
	var spotLightZ = 700;
		
	// create spot light helpful to create shadow in right screen's side
    spotLight = new THREE.SpotLight(0xFFFFD0);
    spotLight.position.set(-200, -120, spotLightZ);
    spotLight.intensity = intensitySpot;
	spotLight.shadowDarkness = 0.3;
    spotLight.castShadow = true;

    // add spotlight to the scene on left side
    scene.add(spotLight);
	
	// create spot light helpful to create shadow in left screen's side
    spotLight2 = new THREE.SpotLight(0xFFFFD0);
    spotLight2.position.set(-200, 120, spotLightZ);
    spotLight2.intensity = intensitySpot;
    spotLight2.castShadow = true;
    scene.add(spotLight2);
	
}