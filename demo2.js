function isJS(path) {
	let regx=/js$?jsx$/
	let res=regx.test(path)
	return res
}
console.log(isJS('demo.jsx'))