const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

// selecting DOM elements
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factList = document.querySelector(".facts-list");

// create DOM elements / creating facts
factList.innerHTML = ""; // borro el contenido que se escribio manual en el html

// load data from API
loadFacts();

async function loadFacts() {
  const res = await fetch(
    "https://vabfrpdgqqoehabstudc.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhYmZycGRncXFvZWhhYnN0dWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcwMDc2MjEsImV4cCI6MjAyMjU4MzYyMX0.6mAztbb-8breYB-rKgJ84t_iEkGe3TjqSh0I__wnA0k",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhYmZycGRncXFvZWhhYnN0dWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcwMDc2MjEsImV4cCI6MjAyMjU4MzYyMX0.6mAztbb-8breYB-rKgJ84t_iEkGe3TjqSh0I__wnA0k",
      },
    }
  );

  const data = await res.json();
  createFactsList(data);

  // const filteredData = data.filter((fact) => fact.category === "history");
  // createFactsList(filteredData);
}

function createFactsList(dataArray) {
  const factsArr = dataArray.map(
    (fact) => `<li class="fact">
    <p>
      ${fact.text}
      <a
        class="source"
        href="${fact.source}"
        target="_blank"
        >(Source)</a>
    </p>
    <span class="tag" style="background-color: ${
      CATEGORIES.find((cat) => cat.name === fact.category).color
    }"
      >${fact.category}</span
  </li>`
  ); // crea un array con todos los facts, con el formato que llevarian dentro del html

  const facts = factsArr.join(""); // lo convierto en un string para poder volverlo a insertar en el html

  factList.insertAdjacentHTML("afterbegin", facts); // lo inserto en la estructura html llamada FactList
}

const facts = factsArr.join(""); // lo convierto en un string para poder volverlo a insertar en el html

factList.insertAdjacentHTML("afterbegin", facts); // lo inserto en la estructura html llamada FactList

// Toggle form visibility
btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Share a fact";
  }
});
