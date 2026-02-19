<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
    function copyToClipboard(text, element) {
        navigator.clipboard.writeText(text).then(() => {
            const original = element.innerHTML;
            element.innerHTML = "✅ Copied!";
            setTimeout(() => element.innerHTML = original, 2000);
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

    // 3D Network Background
    const initThree = () => {
        const canvas = document.querySelector('#bg-canvas');
        if(!canvas) return;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        camera.position.z = 40;

        // Create Nodes
        const geometry = new THREE.BufferGeometry();
        const count = 150;
        const positions = new Float32Array(count * 3);
        
        for(let i=0; i<count*3; i++) {
            positions[i] = (Math.random() - 0.5) * 60;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({ color: 0xD4AF37, size: 0.5 });
        const points = new THREE.Points(geometry, material);
        scene.add(points);

        // Connections
        const lineMat = new THREE.LineBasicMaterial({ color: 0xD4AF37, transparent: true, opacity: 0.15 });
        const linesGeometry = new THREE.BufferGeometry();
        const lines = new THREE.LineSegments(linesGeometry, lineMat);
        scene.add(lines);

        const animate = () => {
            requestAnimationFrame(animate);

            points.rotation.y += 0.002;
            lines.rotation.y += 0.002;

            // Update connections dynamically
            const positions = points.geometry.attributes.position.array;
            const linePositions = [];
            
            // transform points for rotation
            // Simplified: Just connect close points in local space for effect
            for(let i=0; i<count; i++) {
                for(let j=i+1; j<count; j++) {
                    const dist = Math.sqrt(
                        Math.pow(positions[i*3] - positions[j*3], 2) +
                        Math.pow(positions[i*3+1] - positions[j*3+1], 2) +
                        Math.pow(positions[i*3+2] - positions[j*3+2], 2)
                    );

                    if(dist < 12) {
                        linePositions.push(
                            positions[i*3], positions[i*3+1], positions[i*3+2],
                            positions[j*3], positions[j*3+1], positions[j*3+2]
                        );
                    }
                }
            }
            
            lines.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

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
