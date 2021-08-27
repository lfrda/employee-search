const MIN_LENGTH = 3;
const searchBar = document.getElementById('search-bar');
const warning = document.getElementById("warning-section");
const list = document.getElementById('employees');
const neededInfoArray = ['picture','name','age','isActive','email','phone','company','balance'];
let limit = 0;
const KEY = ''
const HEADERS = new Headers( {
	"X-Master-Key": KEY
})
const URL = 'https://api.jsonbin.io/b/612855342aa8003612704b4c'
const myInit = {
	method: 'GET',
    headers: HEADERS
}

let employees = [];
fetch(URL, myInit)
.then((response)=> response.json())
.then((json)=> employees = json);


const showMore = () => {
	limit++
	searchEmployee()
};

const uniq = (array) => {
    return array.filter(function(item, index) {
        if (array.indexOf(item) === index) return item;
    });
};

const validateQuery = () => {
	if(searchBar.value.length < MIN_LENGTH) {
		limit = 0;
		warning.innerHTML = `Your search must contain at least ${MIN_LENGTH} characters`;
		return false;
	}
	return true;
};

const findMatches = (collection, query) => {
	return collection.reduce((all, obj, index)=> {
		neededInfoArray.map((key)=> {
			if(typeof obj[key] !== 'string')
				return
			if(obj[key].toUpperCase().indexOf(query.toUpperCase()) >= 0)
				all.push(obj)
		})
		return uniq(all)
	}, [])
};


const searchEmployee = () => {
	list.innerHTML = '';
	if(!validateQuery())
		return 
	let matches = findMatches(employees, searchBar.value)
	warning.innerHTML = "";
	if(!matches.length) {
		warning.innerHTML = "No matches found";
		return
	}
	if(matches.length <= limit && limit > 0)
		limit = matches.length - 1;
	for(let i = 0; i <= limit; i++) {
		appendResults(matches[i])
	}
};

const appendResults = (obj) => {
	let tr = document.createElement('tr');
	neededInfoArray.forEach((prop)=> {
		if(prop === "picture"){
			let td = document.createElement('td')
			let img = document.createElement('img')
			let text = obj[prop]
			img.src = text
			td.appendChild(img)
			tr.appendChild(td)
			return
		}
		else if (prop === "name"){
			let td = document.createElement('td');
			let a = document.createElement('a');
			let text = obj[prop];
			a.href = '/employee?id='+obj._id;
			a.innerHTML= text;
			td.appendChild(a);
			tr.appendChild(td);
			return
		}
		let td = document.createElement('td')
		let text = obj[prop]
		td.innerHTML = text
		tr.appendChild(td)
	});
	list.appendChild(tr);
};


