const BASE_URL = "http://localhost:5000/api";

/** given data about a cupcake, generate html */

function generateCupcakeHTML(cupcake) {
  return `
    <div class="cupcake-item" data-cupcake-id=${cupcake.id}>
      <li>
      ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
      <button class="delete-button" data-cupcake-id=${cupcake.id}>X</button>
      </li>
      <img class="cupcake-img" src="${cupcake.image}">
    </div>
  `;
}

async function showInitialCupcakes() {
  const response = await axios.get(`${BASE_URL}/cupcakes`);
  for (let cupcakeData of response.data.cupcakes) {
    let newCupcake = $(generateCupcakeHTML(cupcakeData));
    $("#cupcakes-list").append(newCupcake);
  }
}


$("#new-cupcake-form").on('submit', async function(evt) {
  evt.preventDefault();
  let flavor  = $('#form-flavor').val();
  let rating = $('#form-rating').val();
  let size = $('#form-size').val();
  let image = $('#form-image').val();

  const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, {
    flavor,
    rating,
    size,
    image
  });
  console.log('newcupcakeresponse', newCupcakeResponse.data.cupcake)
  let newCupcake = $(generateCupcakeHTML(newCupcakeResponse.data.cupcake));
  $('#cupcakes-list').append(newCupcake);
  $('#new-cupcake-form').trigger('reset');
});


/**
 * Delete cupcake
 */

function setDeleteHandlers() {
  const cupcakeListEl = document.querySelector('#cupcakes-list')
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
