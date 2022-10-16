// alert('sd');
const inputs = document.querySelectorAll(".input");
const fcts = document.querySelectorAll(".form-control");

inputs.forEach((element) => {
  element.addEventListener("input", () => {
    if (element.value) {
      fcts[0].focus();
      console.log("ok");
    }
  });
});
