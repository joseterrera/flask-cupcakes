const BASE_URL = "http://localhost:5000/api";
const cupcakeListEl = document.querySelector('#cupcakes-list')
const newCupcakeFormEl = document.querySelector('#new-cupcake-form');

/** 
 * given data about a cupcake, generate html 
 * */
function generateCupcakeHTML(cupcake) {
  return `
    <div class="cupcake-item" data-cupcake-id=${cupcake.id}>
      <li>
        ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
        <button data-cupcake-id="${cupcake.id}" class="delete-button">X</button>
      </li>
      <img class="Cupcake-img"
            src="${cupcake.image}"
            alt="(no image provided)">
    </div>
  `;
}

let cupcakeListHtml = []
async function showInitialCupcakes() {
  const response = await axios.get(`${BASE_URL}/cupcakes`);
  // initially, was going to use empty string here and concat, but concat would not have
  // been efficient in a loop as it rewrites the string every single time it loops.
  // Push is more efficient.
  for (let cupcakeData of response.data.cupcakes) {
    cupcakeListHtml.push(generateCupcakeHTML(cupcakeData))
  }
  cupcakeListEl.innerHTML = cupcakeListHtml.join('\n\n')
}


newCupcakeFormEl.addEventListener('submit', async function(evt) {
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
  let newCupcake = generateCupcakeHTML(newCupcakeResponse.data.cupcake);
  cupcakeListHtml.push(newCupcake)
  cupcakeListEl.innerHTML = cupcakeListHtml.join('\n\n')
  newCupcakeFormEl.reset();
})

/**
 * Delete cupcake
 */
function setDeleteHandlers() {
  
  const buttons = Array.from(document.querySelectorAll('.delete-button'))
  // console.log(buttons);
  for( let button of buttons ) {
    button.addEventListener('click', async function(event) {
      let cupcakeId = event.target.dataset.cupcakeId;
      let cupcake = event.target.closest('div');
      await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
      cupcake.remove();
    })
  }
}

// alternatue delete, leaving it here for reference, instead of targeting the buttons, I target the whole list and listen for clock events. Both ways are good.
// function setDeleteHandlers() {

//   cupcakeListEl.addEventListener('click', async function(event) {
//     let cupcakeId = event.target.dataset.cupcakeId;
//     let cupcake = event.target.closest('div');
//     await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
//     cupcake.remove();
//   })
  
// }



window.addEventListener('DOMContentLoaded', async () => {
  await showInitialCupcakes()
  setDeleteHandlers()  
})

