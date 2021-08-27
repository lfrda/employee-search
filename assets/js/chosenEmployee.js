let employees = [];
var employee = {};
const id = window.location.search.split('=').pop();

const KEY = ''
const HEADERS = {
	"X-Master-Key": KEY
}

const URL = 'https://api.jsonbin.io/b/612855342aa8003612704b4c'
const myInit = {
	method: 'GET',
    headers: HEADERS
}

fetch(URL, myInit)
.then((response)=> response.json())
.then((json)=> employees = json)
.then(()=> {
	employee = employees.filter((obj)=> obj._id === id).shift();
	employee.registered = moment(employee.registered.split('T').shift()).format('dddd, MMMM Do YYYY')
	bind(employee, document.querySelector('.employee'))
	document.getElementById('picture').src = employee.picture;
	initMap(employee);
});


const followPath = (data, path) => {
  return path.split(".").reduce((prev, curr) => prev && prev[curr], data);
}

const bindSingleElement = (data, element) => {
  let path = element.getAttribute("data-bind");
  element.innerText = followPath(data, path);
}

const bind = (data, element) => {
  let holders = element.querySelectorAll("[data-bind]");
  [].forEach.call(holders, bindSingleElement.bind(null, data));
}

window.initMap = (employee) => {
	if(employee == null)
		return
	let location = {lat: employee.latitude, lng: employee.longitude};
	let map = new google.maps.Map(
	  document.getElementById('map'), {zoom: 4, center: location});
	let marker = new google.maps.Marker({position: location, map: map});
}

