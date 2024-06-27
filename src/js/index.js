/** @format */

// select 

const addBtn = document.querySelector(".body__add");
const input = document.querySelector(".header__search");
const container = document.querySelector(".body");
const table = document.querySelector("table");
const chevronIconAll = document.querySelectorAll(".fa-chevron-down");


let tableBody;
let allData = [];

// events

chevronIconAll.forEach((icon)=>{
  icon.addEventListener("click",(e)=>{
    icon.classList.toggle("move");
    const sorted= e.target.classList.contains("move") ? "asc" : "desc";
    if(e.target.classList.contains("priceSorted")){
        axios
        .get(`http://localhost:3000/transactions?_sort=price&_order=${sorted}`).then((data)=>{
          const classUi = new UI();
          classUi.aboutSort(data)
        })
    }
    if(e.target.classList.contains("datasorted")){
      axios
      .get(`http://localhost:3000/transactions?_sort=date&_order=${sorted}`).then((data)=>{
        const classUi = new UI();
        classUi.aboutSort(data)
      })
    }
  })
})

input.addEventListener("input", (e) => {
  const classUi = new UI();
  axios
    .get(`http://localhost:3000/transactions?refId_like=${e.target.value}`)
    .then((data) => {
      allData = data.data;
      tableBody.innerHTML = " ";
      classUi.showOnDocument(allData);
    });
});

addBtn.addEventListener("click", () => {
  const classUi = new UI();
  classUi.aboutBtn();
  classUi.showAll();
});

//class

class UI {
  aboutBtn() {
    container.classList.remove("hidden");
    input.classList.remove("hidden");
    addBtn.classList.add("hidden");
  }
  showAll() {
    axios.get("http://localhost:3000/transactions").then((dataList) => {
      this.showOnDocument(dataList.data);
    });
  }
  showOnDocument(data) {
    tableBody = document.createElement("tbody");
    data.forEach((item) => {
      tableBody.innerHTML += `        
           <tr>
              <td>${item.id}</td>
              <td class=${item.type === "افزایش اعتبار" ? "green" : "red"}>${
        item.type
      }</td>
              <td>${item.price}</td>
              <td class="td">${item.refId}</td>
              <td class="td">${new Date(item.date).toLocaleString("fa", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}</td>
            </tr>  
            `;
    });
    table.append(tableBody);
  }
  aboutSort(data){
    allData = data.data;
    tableBody.innerHTML = " ";
    this.showOnDocument(data.data);
  }
}
