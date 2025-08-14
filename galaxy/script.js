// galaxy/script.js
// This script creates an interactive 3D starfield background using Three.js

let scene, camera, renderer, stars, starGeo;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

// Store original positions and velocities for continuous movement
const originalPositions = [];
const velocities = [];

function initStarfield() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = Math.PI / 2; // Look down the Z-axis

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('starfield-container').appendChild(renderer.domElement);

    // Create a round particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.2, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.4, 'rgba(200,200,200,1)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const particleTexture = new THREE.CanvasTexture(canvas);

    // Stars
    starGeo = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const sizes = [];

    for (let i = 0; i < 6000; i++) {
        const x = Math.random() * 600 - 300;
        const y = Math.random() * 600 - 300;
        const z = Math.random() * 600 - 300;
        positions.push(x, y, z);
        originalPositions.push(x, y, z); // Store original positions

        colors.push(1.0, 1.0, 1.0); // White color
        sizes.push(Math.random() * 2 + 0.5); // Random size for stars, slightly larger

        // Initial random velocity for continuous movement
        velocities.push(
            (Math.random() - 0.5) * 0.02, // x velocity
            (Math.random() - 0.5) * 0.02, // y velocity
            (Math.random() - 0.5) * 0.02  // z velocity
        );
    }

    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    starGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    starGeo.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    const starMaterial = new THREE.PointsMaterial({
        size: 2, // Base size for particles
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        map: particleTexture // Use the custom round texture
    });

    stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);

    // Event Listeners
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);

    animateStarfield();
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animateStarfield() {
    requestAnimationFrame(animateStarfield);

    const positions = starGeo.attributes.position.array;
    const sizes = starGeo.attributes.size.array;

    // Convert mouse coordinates to a more suitable range for 3D interaction
    const mouse3DX = (mouseX / windowHalfX) * 200; 
    const mouse3DY = (mouseY / windowHalfY) * 200; 

    const repulsionRadius = 70; // Smaller radius for closer interaction
    const repulsionStrength = 3; // Adjusted strength for smoother repulsion
    const returnSpeed = 0.01; // Slower return to original position for smoother movement

    for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];

        const originalX = originalPositions[i];
        const originalY = originalPositions[i + 1];
        const originalZ = originalPositions[i + 2];

        // Continuous movement (flying around)
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];

        // Boundary check for continuous movement (wrap around)
        if (positions[i] > 300 || positions[i] < -300) velocities[i] *= -1;
        if (positions[i + 1] > 300 || positions[i + 1] < -300) velocities[i + 1] *= -1;
        if (positions[i + 2] > 300 || positions[i + 2] < -300) velocities[i + 2] *= -1;

        // Mouse repulsion effect
        const dx = x - mouse3DX;
        const dy = y - mouse3DY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < repulsionRadius) {
            const repulsionForce = (1 - distance / repulsionRadius) * repulsionStrength;
            positions[i] += (dx / distance) * repulsionForce;
            positions[i + 1] += (dy / distance) * repulsionForce;
            sizes[i / 3] = Math.random() * 4 + 2; // Make stars glow/bigger when repelled
        } else {
            // Slowly return to original position if not repelled
            positions[i] += (originalX - positions[i]) * returnSpeed;
            positions[i + 1] += (originalY - positions[i + 1]) * returnSpeed;
            sizes[i / 3] = Math.random() * 2 + 0.5; // Return to normal size
        }
    }

    starGeo.attributes.position.needsUpdate = true;
    starGeo.attributes.size.needsUpdate = true;

    renderer.render(scene, camera);
}

// Initialize starfield when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Ensure the container exists before initializing
    if (document.getElementById('starfield-container')) {
        initStarfield();
    } else {
        console.error('Starfield container not found. Make sure an element with id="starfield-container" exists.');
    }
});