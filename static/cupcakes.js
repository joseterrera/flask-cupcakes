const BASE_URL = "http://localhost:5000/api";
const cupcakeListEl = document.querySelector('#cupcakes-list')
const newCupcakeFormEl = document.querySelector('#new-cupcake-form');
/** given data about a cupcake, generate html */


function generateCupcakeHTML(cupcake) {
  const cupcakeItemEl = document.createElement('div')
  cupcakeItemEl.classList.add('cupcake-item');
  cupcakeItemEl.setAttribute('data-cupcake-id', `${cupcake.id}` )
  const cupcakeInfoEl = document.createElement('span');
  cupcakeInfoEl.innerText = (` ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}`);
  const deleteButtonEl = document.createElement('button');
  deleteButtonEl.classList.add('delete-button');
  deleteButtonEl.setAttribute('data-cupcake-id', `${cupcake.id}`);
  deleteButtonEl.innerText = 'X';
  const imageEl = document.createElement('img');
  imageEl.classList.add('cupcake-img');
  imageEl.src = `${cupcake.image}`;

  cupcakeItemEl.append(cupcakeInfoEl, deleteButtonEl, imageEl);

 return cupcakeListEl.append(cupcakeItemEl); 
}

// function generateCupcakeHTML(cupcake) {
//   return `
//     <div class="cupcake-item" data-cupcake-id=${cupcake.id}>
//       <li>
//       ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
//       <button class="delete-button" data-cupcake-id=${cupcake.id}>X</button>
//       </li>
//       <img class="cupcake-img" src="${cupcake.image}">
//     </div>
//   `;
// }

async function showInitialCupcakes() {
  const response = await axios.get(`${BASE_URL}/cupcakes`);
  for (let cupcakeData of response.data.cupcakes) {
    let newCupcake = generateCupcakeHTML(cupcakeData);
    cupcakeListEl.append(newCupcake);
  }
}


$("#new-cupcake-form").on('submit', async function(evt) {
  evt.preventDefault();
  let flavor  = document.querySelector('#form-flavor').value;
  let rating = document.querySelector('#form-rating').value;
  let size = document.querySelector('#form-size').value;
  let image = document.querySelector('#form-image').value;

  const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, {
    flavor,
    rating,
    size,
    image
  });
  // console.log('newcupcakeresponse', newCupcakeResponse.data.cupcake)
  let newCupcake = $(generateCupcakeHTML(newCupcakeResponse.data.cupcake));
  cupcakeListEl.append(newCupcake);
  newCupcakeFormEl.reset();
});


/**
 * Delete cupcake
 */

function setDeleteHandlers() {

  cupcakeListEl.addEventListener('click', async function(event) {
    let cupcakeId = event.target.dataset.cupcakeId;
    let cupcake = event.target.closest('div');
    await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
    cupcake.remove();
  })
  
}


// function setDeleteHandlers() {
//   console.log('he')
//   const buttons = Array.from(document.querySelectorAll('.delete-button'))
//   console.log(buttons);
//   for( let button of buttons ) {
//     button.addEventListener('click', function(event) {
//       console.log('re')
//       console.log(event.target.dataset.id)
//     })
//   }
// }



showInitialCupcakes()
setDeleteHandlers()
