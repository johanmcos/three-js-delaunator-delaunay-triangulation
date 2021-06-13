let scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 1, 1, 1000);
camera.position.setScalar(150);
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
const canvas = renderer.domElement;
document.body.appendChild(canvas);

const controls = new THREE.OrbitControls(camera, canvas);

const light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.setScalar(100);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
//
// const cornerPoints = [[0, 0, 0], [2, 3, 12], [-9, 0, 12], [-12, 3, 0]]
//
// const centerPoints = cornerPoints.map((point, index) => [(point[0] + cornerPoints[(index + 1) % 4][0]) / 2, (point[1] + cornerPoints[index + 1 % 4][1]) / 2])
// console.log(centerPoints)
const receivedPoints = [[0., 0., 0.],
    [-1.33333333, 0.33333333, 0.],
    [-2.66666667, 0.66666667, 0.],
    [-4., 1., 0.],
    [-5.33333333, 1.33333333, 0.],
    [-6.66666667, 1.66666667, 0.],
    [-8., 2., 0.],
    [-9.33333333, 2.33333333, 0.],
    [-10.66666667, 2.66666667, 0.],
    [-12., 3., 0.],
    [0.22222222, 0.33333333, 1.33333333],
    [-1.09876543, 0.59259259, 1.33333333],
    [-2.41975309, 0.85185185, 1.33333333],
    [-3.74074074, 1.11111111, 1.33333333],
    [-5.0617284, 1.37037037, 1.33333333],
    [-6.38271605, 1.62962963, 1.33333333],
    [-7.7037037, 1.88888889, 1.33333333],
    [-9.02469136, 2.14814815, 1.33333333],
    [-10.34567901, 2.40740741, 1.33333333],
    [-11.66666667, 2.66666667, 1.33333333],
    [0.44444444, 0.66666667, 2.66666667],
    [-0.86419753, 0.85185185, 2.66666667],
    [-2.17283951, 1.03703704, 2.66666667],
    [-3.48148148, 1.22222222, 2.66666667],
    [-4.79012346, 1.40740741, 2.66666667],
    [-6.09876543, 1.59259259, 2.66666667],
    [-7.40740741, 1.77777778, 2.66666667],
    [-8.71604938, 1.96296296, 2.66666667],
    [-10.02469136, 2.14814815, 2.66666667],
    [-11.33333333, 2.33333333, 2.66666667],
    [0.66666667, 1., 4.],
    [-0.62962963, 1.11111111, 4.],
    [-1.92592593, 1.22222222, 4.],
    [-3.22222222, 1.33333333, 4.],
    [-4.51851852, 1.44444444, 4.],
    [-5.81481481, 1.55555556, 4.],
    [-7.11111111, 1.66666667, 4.],
    [-8.40740741, 1.77777778, 4.],
    [-9.7037037, 1.88888889, 4.],
    [-11., 2., 4.],
    [0.88888889, 1.33333333, 5.33333333],
    [-0.39506173, 1.37037037, 5.33333333],
    [-1.67901235, 1.40740741, 5.33333333],
    [-2.96296296, 1.44444444, 5.33333333],
    [-4.24691358, 1.48148148, 5.33333333],
    [-5.5308642, 1.51851852, 5.33333333],
    [-6.81481481, 1.55555556, 5.33333333],
    [-8.09876543, 1.59259259, 5.33333333],
    [-9.38271605, 1.62962963, 5.33333333],
    [-10.66666667, 1.66666667, 5.33333333],
    [1.11111111, 1.66666667, 6.66666667],
    [-0.16049383, 1.62962963, 6.66666667],
    [-1.43209877, 1.59259259, 6.66666667],
    [-2.7037037, 1.55555556, 6.66666667],
    [-3.97530864, 1.51851852, 6.66666667],
    [-5.24691358, 1.48148148, 6.66666667],
    [-6.51851852, 1.44444444, 6.66666667],
    [-7.79012346, 1.40740741, 6.66666667],
    [-9.0617284, 1.37037037, 6.66666667],
    [-10.33333333, 1.33333333, 6.66666667],
    [1.33333333, 2., 8.],
    [0.07407407, 1.88888889, 8.],
    [-1.18518519, 1.77777778, 8.],
    [-2.44444444, 1.66666667, 8.],
    [-3.7037037, 1.55555556, 8.],
    [-4.96296296, 1.44444444, 8.],
    [-6.22222222, 1.33333333, 8.],
    [-7.48148148, 1.22222222, 8.],
    [-8.74074074, 1.11111111, 8.],
    [-10., 1., 8.],
    [1.55555556, 2.33333333, 9.33333333],
    [0.30864198, 2.14814815, 9.33333333],
    [-0.9382716, 1.96296296, 9.33333333],
    [-2.18518519, 1.77777778, 9.33333333],
    [-3.43209877, 1.59259259, 9.33333333],
    [-4.67901235, 1.40740741, 9.33333333],
    [-5.92592593, 1.22222222, 9.33333333],
    [-7.17283951, 1.03703704, 9.33333333],
    [-8.41975309, 0.85185185, 9.33333333],
    [-9.66666667, 0.66666667, 9.33333333],
    [1.77777778, 2.66666667, 10.66666667],
    [0.54320988, 2.40740741, 10.66666667],
    [-0.69135802, 2.14814815, 10.66666667],
    [-1.92592593, 1.88888889, 10.66666667],
    [-3.16049383, 1.62962963, 10.66666667],
    [-4.39506173, 1.37037037, 10.66666667],
    [-5.62962963, 1.11111111, 10.66666667],
    [-6.86419753, 0.85185185, 10.66666667],
    [-8.09876543, 0.59259259, 10.66666667],
    [-9.33333333, 0.33333333, 10.66666667],
    [2., 3., 12.],
    [0.77777778, 2.66666667, 12.],
    [-0.44444444, 2.33333333, 12.],
    [-1.66666667, 2., 12.],
    [-2.88888889, 1.66666667, 12.],
    [-4.11111111, 1.33333333, 12.],
    [-5.33333333, 1., 12.],
    [-6.55555556, 0.66666667, 12.],
    [-7.77777778, 0.33333333, 12.],
    [-9., 0., 12.]]

// const size = {x: 200, z: 200};
// const pointsCount = 1000;
const points3d = receivedPoints.map(arr => new THREE.Vector3(...arr))
// for (let i = 0; i < pointsCount; i++) {
//     let x = THREE.Math.randFloatSpread(size.x);
//     let z = THREE.Math.randFloatSpread(size.z);
//     let y = noise.perlin2(x / size.x * 5, z / size.z * 5) * 50;
//     points3d.push(new THREE.Vector3(x, y, z));
// }
// const points2d = points3d.map(point => new THREE.Vector2(point.x, point.z))

const cornerPoints = [[0, 0, 0], [2, 3, 12], [-9, 0, 12], [-12, 3, 0]].map((point) => new THREE.Vector3(...point))


const centerPoint = new THREE.Vector3()
cornerPoints.forEach(point => {
    centerPoint.add(point)
})
centerPoint.divideScalar(cornerPoints.length)

const centerSphere = new THREE.Mesh(new THREE.SphereGeometry(0.5), new THREE.MeshBasicMaterial({color: 0xffff00}))
scene.add(centerSphere)

// red = x-axis
scene.add(new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 3, 0xff0000))
// green = y-axis
scene.add(new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(), 3, 0x00ff00))
// blue = z-axis
scene.add(new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(), 3, 0x0000ff))

const centeredPoints = points3d.map(point => point.sub(centerPoint))
const centeredCornerPoints = cornerPoints.map(point => point.sub(centerPoint))


const cornerPointGeometry = new THREE.BufferGeometry().setFromPoints(centeredCornerPoints)
const cornerCloud = new THREE.Points(
    cornerPointGeometry,
    new THREE.PointsMaterial({color: 0xff0000, size: 0.25})
)
scene.add(cornerCloud)

const midpoints = centeredCornerPoints.map((point, index) => new THREE.Vector3().addVectors(point, centeredCornerPoints[(index + 1) % 4]).multiplyScalar(0.5))

const midpointsGeometry = new THREE.BufferGeometry().setFromPoints(midpoints)
const midCloud = new THREE.Points(
    midpointsGeometry,
    new THREE.PointsMaterial({color: 0x0000ff, size: 0.25})
)

scene.add(midCloud)

// const midpointUnitVecs = midpoints.map(vec => new THREE.Vector3().copy(vec).normalize())
//
// const sagPercents = centeredCornerPoints.map((point, index) => (point.distanceTo(centeredCornerPoints[(index + 1) % 4]) * 0.1) / midpoints[index].length())

// console.log(midpoints, midpointUnitVecs, sagPercents)

// const shiftedPoints = centeredPoints.map((point, index) => {
//     if (centeredCornerPoints.some(cornerPoint => cornerPoint.angleTo(point) < 0.0001 )) {
//         return point
//     }
//     const minDeviation = Math.min(...midpointUnitVecs.map(vec => vec.distanceToSquared(normVec)))
//
//     const quadrant = midpointUnitVecs.findIndex(unitVec => unitVec.distanceToSquared(normVec) === minDeviation)
//     const prevQuadrant = quadrant === 0 ? 3 : quadrant - 1
//     const centerFactor = midpoints[quadrant].angleTo(point) ** 2 / (centeredCornerPoints[quadrant].angleTo(centeredCornerPoints[prevQuadrant]) / 2) ** 2
//     // const sagFactor = ((1 - minDeviation) ** 0.5)
//     // const distFactor = ((midpoints[quadrant].distanceTo(point))/ midpoints[quadrant].length())
//     // if (index < 11) {
//     //     console.log(minDeviation)
//     //     console.log(sagFactor, distFactor)
//     // }
//     //
//     return new THREE.Vector3().copy(point).multiplyScalar(0.9 + 0.1 * centerFactor)
// })

const quadrants = []

for (let i = 0; i < 4; i++) {
    const ends = [centeredCornerPoints[i], centeredCornerPoints[(i + 1) % 4]]
    const angle = ends[0].angleTo(ends[1])
    const shape = new THREE.Triangle(...ends)
    const vertex = new THREE.Line3(...ends)
    const midpoint = vertex.getCenter(new THREE.Vector3())
    const vertLength = vertex.distance()
    const sag = vertLength * 0.1
    const distFromCenter = midpoint.length()
    quadrants.push({ends, shape, vertex, midpoint, vertLength, sag, distFromCenter, angle})
}


console.log(quadrants)

const shiftedPoints = centeredPoints.map((point, index) => {
    const quadrant = quadrants.find(quad => quad.shape.closestPointToPoint(point, new THREE.Vector3()).distanceTo(point) < 0.005)
    if (quadrant === undefined) {
        return point
    }
    const angleFactor = Math.min((quadrant.midpoint.angleTo(point) / (quadrant.angle / 2)) ** 2, 1)
    const scaleFactor = 1 - (quadrant.sag * (1 - angleFactor) / point.length())
    if (index % 5 ===0) {
        console.log(angleFactor, scaleFactor)
    }
    return new THREE.Vector3().copy(point).multiplyScalar(scaleFactor)
})

// console.log(shiftedPoints)
//
// console.log(shiftedPoints.map((point, index) => point.distanceTo(centeredPoints[index])))


const geom = new THREE.BufferGeometry().setFromPoints(shiftedPoints);
const cloud = new THREE.Points(
    geom,
    new THREE.PointsMaterial({color: 0x99ccff, size: 1})
);
// scene.add(cloud);

// triangulate x, z
const indexDelaunay = Delaunator.from(
    centeredPoints.map(v => {
        return [v.x, v.z];
    })
);

const meshIndex = []; // delaunay index => three.js index
for (let i = 0; i < indexDelaunay.triangles.length; i++) {
    meshIndex.push(indexDelaunay.triangles[i]);
}

geom.setIndex(meshIndex); // add three.js index to the existing geometry


geom.computeVertexNormals();
const mesh = new THREE.Mesh(
    geom, // re-use the existing geometry
    new THREE.MeshLambertMaterial({color: "purple", wireframe: true})
);
scene.add(mesh);

const gui = new dat.GUI();
gui.add(mesh.material, "wireframe");

render();

function resize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

function render() {
    if (resize(renderer)) {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}