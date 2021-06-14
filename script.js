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

const midpointsGeometry = new THREE.BufferGeometry().setFromPoints(midpoints)
const midCloud = new THREE.Points(
    midpointsGeometry,
    new THREE.PointsMaterial({color: 0x0000ff, size: 0.25})
)

scene.add(midCloud)

const adjustedMidpoints = midpoints.map((vec, idx) => {
    const length = cornerPoints[idx].distanceTo(centerPoint)
    const toShrink = 0.1 * length
    const dist = vec.length()
    const shrinkPercent = (dist - toShrink) / dist
    return new THREE.Vector3().copy(vec).multiplyScalar(shrinkPercent)
})

const adjustedMidpointsGeometry = new THREE.BufferGeometry().setFromPoints(adjustedMidpoints)
const adjustedMidCloud = new THREE.Points(
    adjustedMidpointsGeometry,
    new THREE.PointsMaterial({color: 0x00ff00, size: 0.25})
)

scene.add(adjustedMidCloud)


const findQuadratic = (point1, point2, point3) => {
  const x = [point1[0], point2[0], point3[0]]
  const y = [point1[2], point2[2], point3[2]]
  const xMat = math.matrixFromColumns(math.square(x), x, [1, 1, 1])
  return math.multiply(math.inv(xMat), y)
}

const getPointsFromQuadratic = (a, b, c, startX, endX, nPoints) => {
  const step = (endX - startX) / nPoints
  const points = []
  for (let i=0; i <= nPoints; i++) {
    const x = startX + i * step
    const y = a * (x ** 2) + b * x + c
    points.push([x, y])
  }
  return points
}

const lineToPoints = (line, numberOfPoints) => {
  const t = 1 / numberOfPoints
  const points = []
  for (let i=0; i <= numberOfPoints; i++) {
    points.push(line.at(i * t, new THREE.Vector3()))
  }
  return points
}

const testPoints = [centeredCornerPoints[0], adjustedMidpoints[0], centeredCornerPoints[1]].map(point => [point.x, point.y, point.z])
console.log(testPoints)
const quad = findQuadratic(...testPoints)
console.log(quad)
const outPoints2D = getPointsFromQuadratic(...quad, testPoints[0][0], testPoints[2][0], 10)

console.log(outPoints2D)

const testLine = new THREE.Line3(centeredCornerPoints[0], centeredCornerPoints[1])
const testLinePoints = lineToPoints(testLine, 10)

const outPoints3D = outPoints2D.map((point2d, idx) => new THREE.Vector3(point2d[0], testLinePoints[idx].y, point2d[1]))

console.log(outPoints3D)

const testGeom = new THREE.BufferGeometry().setFromPoints(outPoints3D)
const testMaterial = new THREE.LineBasicMaterial({color: 0xffffff})
const testObject = new THREE.Line(testGeom, testMaterial)
scene.add(testObject)




// for (let i=0; i < 4; i++) {
//   const curve =  new THREE.QuadraticBezierCurve3(centeredCornerPoints[i], adjustedMidpoints[i], centeredCornerPoints[(i + 1) % 4])
//   outerCurves.push(curve)
//   const points = curve.getPoints(50)
//     const geometry = new THREE.BufferGeometry().setFromPoints(points)
//     const material = new THREE.LineBasicMaterial({color: 0x00ff00})
//     const curveObject = new THREE.Line(geometry, material)
//     scene.add(curveObject)
// }



// for (let i=0; i < 2; i++) {
//   const centerLine = new THREE.QuadraticBezierCurve3(adjustedMidpoints[i + 1], centerPoint, adjustedMidpoints[(i + 3) % 4])
//   const centerPoints = centerLine.getPoints(10)
//   const centerGeometry = new THREE.BufferGeometry().setFromPoints(centerPoints)
//   const material = new THREE.LineBasicMaterial({color: 0xff0000})
//   const curveObject = new THREE.Line(centerGeometry, material)
//   scene.add(curveObject)
//   const startPoints = outerCurves[i].getPoints(10)
//   const endPoints = outerCurves[i + 2].getPoints(10).reverse()
//   for (let j=0; j < startPoints.length; j++) {
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