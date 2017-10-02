const deeplearn = window.deeplearn
const math = new deeplearn.NDArrayMathGPU()
const a = deeplearn.Array1D.new([1, 2, 3])
const b = deeplearn.Scalar.new(2)
math.scope(() => {
  const result = math.add(a, b)
  console.log(result.getValues())  // Float32Array([3, 4, 5])
})
