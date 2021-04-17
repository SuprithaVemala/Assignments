let temp = document.createElement("template");
temp.innerHTML = `
<link rel="stylesheet" href="./node_modules/font-awesome/css/font-awesome.min.css">
<link rel="stylesheet" href="./starStyle.css"> 
<div class="fa inner" id="starDiv">
</div>
`;
class demo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(temp.content.cloneNode(true));
    let rating = this.getAttribute("rating");
    let limit = this.getAttribute("maxLimit") || 5;
    let newVal=parseFloat(rating)*parseFloat(5)/parseFloat(limit)*15
    this.shadowRoot.querySelector("#starDiv").style.width=`${newVal}px`;
  }

}

window.customElements.define("star-rating", demo);
