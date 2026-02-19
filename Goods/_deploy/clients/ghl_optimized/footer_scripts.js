<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
    // Copy Function
    function copyToClipboard(text, element) {
        navigator.clipboard.writeText(text).then(() => {
            const original = element.innerHTML;
            element.innerHTML = "✅ Copied!";
            setTimeout(() => {
                element.innerHTML = original;
            }, 2000);
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 3D Flowing Background
    const initThree = () => {
        const canvas = document.querySelector('#bg-canvas');
        if(!canvas) return;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        camera.position.z = 50;

        const particlesGeo = new THREE.BufferGeometry();
        const count = 1000;
        const positions = new Float32Array(count * 3);
        const speeds = new Float32Array(count);

        for(let i=0; i<count; i++) {
            positions[i*3] = (Math.random() - 0.5) * 100; // x
            positions[i*3+1] = (Math.random() - 0.5) * 100; // y
            positions[i*3+2] = (Math.random() - 0.5) * 100; // z
            speeds[i] = Math.random() * 0.1 + 0.05;
        }

        particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particlesMat = new THREE.PointsMaterial({
            color: 0xD4AF37,
            size: 0.3,
            transparent: true,
            opacity: 0.8
        });

        const particleSystem = new THREE.Points(particlesGeo, particlesMat);
        scene.add(particleSystem);

        const animate = () => {
            requestAnimationFrame(animate);
            
            const positions = particleSystem.geometry.attributes.position.array;
            
            for(let i=0; i<count; i++) {
                // Move particles forward (Z axis)
                positions[i*3+2] += speeds[i];
                
                // Reset if too close
                if(positions[i*3+2] > 50) {
                    positions[i*3+2] = -50;
                }
            }
            
            particleSystem.geometry.attributes.position.needsUpdate = true;
            particleSystem.rotation.z += 0.001; // Slight rotation

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
