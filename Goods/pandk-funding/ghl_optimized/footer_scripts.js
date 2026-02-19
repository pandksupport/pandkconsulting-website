<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
    function copyToClipboard(text, element) {
        navigator.clipboard.writeText(text).then(() => {
            const original = element.innerHTML;
            element.innerHTML = "✅ Copied!";
            setTimeout(() => element.innerHTML = original, 2000);
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 3D Ascending Cubes (Growth)
    const initThree = () => {
        const canvas = document.querySelector('#bg-canvas');
        if(!canvas) return;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        const scene = new THREE.Scene();
        
        // Fog for depth
        scene.fog = new THREE.FogExp2(0x0a0a0a, 0.02);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        camera.position.set(0, 10, 30);
        camera.lookAt(0, 0, 0);

        // Create Cubes
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ 
            color: 0xD4AF37, 
            roughness: 0.2, 
            metalness: 0.8,
            emissive: 0xaa8c2c,
            emissiveIntensity: 0.2
        });

        const cubes = [];
        const count = 50;

        for(let i=0; i<count; i++) {
            const mesh = new THREE.Mesh(geometry, material);
            
            // Random position spread
            mesh.position.x = (Math.random() - 0.5) * 60;
            mesh.position.z = (Math.random() - 0.5) * 60 - 20;
            mesh.position.y = Math.random() * -10; // Start below

            // Random scale (skyscrapers)
            mesh.scale.x = Math.random() * 2 + 0.5;
            mesh.scale.z = Math.random() * 2 + 0.5;
            mesh.scale.y = Math.random() * 5 + 1;

            // Store initial data for animation
            mesh.userData = {
                speed: Math.random() * 0.05 + 0.01,
                maxHeight: Math.random() * 15 + 5
            };

            scene.add(mesh);
            cubes.push(mesh);
        }

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const pointLight = new THREE.PointLight(0xD4AF37, 1);
        pointLight.position.set(10, 20, 10);
        scene.add(pointLight);

        const animate = () => {
            requestAnimationFrame(animate);

            cubes.forEach(cube => {
                // Ascend
                cube.position.y += cube.userData.speed;
                
                // Reset if too high
                if(cube.position.y > cube.userData.maxHeight) {
                    cube.position.y = -20;
                    cube.position.x = (Math.random() - 0.5) * 60;
                    cube.position.z = (Math.random() - 0.5) * 60 - 20;
                }
            });

            // Camera subtle movement
            camera.position.x = Math.sin(Date.now() * 0.0002) * 5;
            camera.lookAt(0, 5, 0);

            renderer.render(scene, camera);
        };

        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    };

    document.addEventListener('DOMContentLoaded', initThree);
</script>
