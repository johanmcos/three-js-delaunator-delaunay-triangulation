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

const centeredCornerPoints = cornerPoints.map(point => point.sub(centerPoint))


const cornerPointGeometry = new THREE.BufferGeometry().setFromPoints(centeredCornerPoints)
const cornerCloud = new THREE.Points(
    cornerPointGeometry,
    new THREE.PointsMaterial({color: 0xff0000, size: 0.25})
)
scene.add(cornerCloud)

const midpoints = centeredCornerPoints.map((point, index) => new THREE.Vector3().addVectors(point, centeredCornerPoints[(index + 1) % 4]).multiplyScalar(0.5))

// blue
const midpointsGeometry = new THREE.BufferGeometry().setFromPoints(midpoints)
const midCloud = new THREE.Points(
    midpointsGeometry,
    new THREE.PointsMaterial({color: 0x0000ff, size: 0.25})
)

scene.add(midCloud)

const adjustedMidpoints = midpoints.map((vec, idx) => {
    const length = cornerPoints[idx].distanceTo(cornerPoints[(idx + 1) % 4])
    const toShrink = 0.1 * length
    const dist = vec.length()
    const shrinkPercent = (dist - toShrink) / dist
    return new THREE.Vector3().copy(vec).multiplyScalar(shrinkPercent)
})

// green
const adjustedMidpointsGeometry = new THREE.BufferGeometry().setFromPoints(adjustedMidpoints)
const adjustedMidCloud = new THREE.Points(
    adjustedMidpointsGeometry,
    new THREE.PointsMaterial({color: 0x00ff00, size: 0.25})
)

scene.add(adjustedMidCloud)

const controlPoints = midpoints.map((vec, idx) => {
    const length = cornerPoints[idx].distanceTo(cornerPoints[(idx + 1) % 4])
    const toShrink = 0.2 * length
    const dist = vec.length()
    const shrinkPercent = (dist - toShrink) / dist
    return new THREE.Vector3().copy(vec).multiplyScalar(shrinkPercent)
})

// red
const controlPointsGeometry = new THREE.BufferGeometry().setFromPoints(controlPoints)
const controlPointsCloud = new THREE.Points(
    controlPointsGeometry,
    new THREE.PointsMaterial({color: 0xff0000, size: 0.25})
)

scene.add(controlPointsCloud)

const outerCurves = []

for (let i=0; i < 4; i++) {
  const curve =  new THREE.QuadraticBezierCurve3(centeredCornerPoints[i], controlPoints[i], centeredCornerPoints[(i + 1) % 4])
  outerCurves.push(curve)
  const points = curve.getPoints(50)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({color: 0x00ff00})
    const curveObject = new THREE.Line(geometry, material)
    scene.add(curveObject)
}

const lineToPoints = (line, numberOfPoints) => {
  const t = 1 / numberOfPoints
  const points = []
  for (let i=0; i <= numberOfPoints; i++) {
    points.push(line.at(i * t, new THREE.Vector3()))
  }
  return points
}

midpoints.map((point, i) => {
  console.log(centeredCornerPoints[i].distanceTo(centeredCornerPoints[(i + 1) % 4]) * 0.1)
  console.log(point.length() - adjustedMidpoints[i].length())
})

  const centerLine = new THREE.Line3(adjustedMidpoints[1], adjustedMidpoints[3])
  const centerPoints = lineToPoints(centerLine, 10).reverse()
  const centerGeometry = new THREE.BufferGeometry().setFromPoints(centerPoints)
  const material0 = new THREE.LineBasicMaterial({color: 0xffff00})
  const centerLine0 = new THREE.Line(centerGeometry, material0)
  scene.add(centerLine0)
  const startPoints = outerCurves[0].getPoints(10)
  const endPoints = outerCurves[2].getPoints(10).reverse()
  const controlPoint = new THREE.Vector3().copy(controlPoints[0]).multiplyScalar(0.8)
  console.log(controlPoint)
  const curve0 = new THREE.QuadraticBezierCurve3(startPoints[1], controlPoint, endPoints[1])
  const points = curve0.getPoints(50)
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material1 = new THREE.LineBasicMaterial({color: 0xffffff})
  const curveObject = new THREE.Line(geometry, material1)
  scene.add(curveObject)


// for (let i=0; i < 2; i++) {
//   const centerLine = new THREE.Line3(adjustedMidpoints[i + 1], adjustedMidpoints[(i + 3) % 4])
//   const centerPoints = lineToPoints(centerLine, 10)
//   const centerGeometry = new THREE.BufferGeometry().setFromPoints(centerPoints)
//   const material = new THREE.LineBasicMaterial({color: 0xffff00})
//   const curveObject = new THREE.Line(centerGeometry, material)
//   scene.add(curveObject)
//   const startPoints = outerCurves[i].getPoints(10)
//   const endPoints = outerCurves[i + 2].getPoints(10).reverse()
//   for (let j=0; j < startPoints.length; j++) {
//     const perpLine = new THREE.Line3(startPoints[j], centerPoints[j])
//     const curve = new THREE.QuadraticBezierCurve3(startPoints[j], centerPoints[j], endPoints[j])
//     const points = curve.getPoints(50)
//     const geometry = new THREE.BufferGeometry().setFromPoints(points)
//     const material = new THREE.LineBasicMaterial({color: 0xffffff})
//     const curveObject = new THREE.Line(geometry, material)
//     scene.add(curveObject)
//   }
// }

// const gui = new dat.GUI();
// gui.add(mesh.material, "wireframe");

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