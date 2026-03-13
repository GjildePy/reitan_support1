const products = {
  "7038010001234": {
    name: "Red Bull Energy Drink 250ml",
    price: "39,90 kr",
    department: "Kategori & marked"
  },
  "7044610876543": {
    name: "Farris Lime 0,5L",
    price: "32,50 kr",
    department: "Kategori & marked"
  },
  "7099988776655": {
    name: "Narvesen Baguette Ost og Skinke",
    price: "69,90 kr",
    department: "Kategori"
  }
};

const scenarioTemplates = [
  {
    title: "Vare går ikke inn på kassa",
    stores: ["7-Eleven Oslo S", "7-Eleven Majorstuen", "7-Eleven Torggata"],
    build() {
      const gtinList = Object.keys(products);
      const gtin = gtinList[Math.floor(Math.random() * gtinList.length)];
      const product = products[gtin];
      const store = this.stores[Math.floor(Math.random() * this.stores.length)];

      return {
        title: this.title,
        store,
        intro: [
          `Hei! Vi får ikke slått inn en vare i kassa.`,
          `GTIN / strekkode er ${gtin}.`
        ],
        steps: [
          {
            prompt: "Hva gjør du først?",
            options: [
              {
                text: "Bekreft henvendelsen, be dem teste én gang til og slå opp GTIN i GTIN-søk.",
                correct: true,
                feedback: "Riktig. Bra start.",
                reply: "Vi testet igjen. Fortsatt ingen treff."
              },
              {
                text: "Be dem bare sette en tilfeldig pris.",
                correct: false,
                feedback: "Feil. Først må varen sjekkes.",
                reply: "Vi vil helst vite riktig vare og pris først."
              }
            ]
          },
          {
            prompt: "Hva gjør du videre?",
            options: [
              {
                text: "Informer om varenavn og pris, og opprett sak til riktig avdeling.",
                correct: true,
                feedback: "Riktig. Nå må saken sendes videre.",
                reply: "Supert. Da trenger vi at dere følger opp.",
                ticketData: {
                  correctDepartment: product.department,
                  title: "Vare går ikke inn på kassa",
                  reference: gtin,
                  description: `GTIN ${gtin} gir ikke treff i kassa. Vare: ${product.name}. Pris: ${product.price}.`
                }
              },
              {
                text: "Be butikken vente og ikke gjøre noe.",
                correct: false,
                feedback: "Feil. Du må faktisk hjelpe videre.",
                reply: "Vi trenger at dette blir sendt videre."
              }
            ]
          },
          {
            prompt: "Hva gjenstår?",
            requiresClosedTicket: true,
            options: [
              {
                text: "Lukk saken når den er løst.",
                correct: true,
                feedback: "Riktig. Nå er henvendelsen ferdig.",
                reply: "Takk, nå er det i orden."
              }
            ]
          }
        ]
      };
    }
  },
  {
    title: "Bruker får ikke logget inn",
    stores: ["Narvesen Bodø", "Narvesen Bergen", "Narvesen Oslo City"],
    build() {
      const store = this.stores[Math.floor(Math.random() * this.stores.length)];
      return {
        title: this.title,
        store,
        intro: [
          "Hei! Ny medarbeider får ikke logget inn.",
          "Vi tror passord må nullstilles."
        ],
        steps: [
          {
            prompt: "Hva gjør du først?",
            options: [
              {
                text: "Sjekk om bruker finnes og om passord må nullstilles.",
                correct: true,
                feedback: "Riktig. God start.",
                reply: "Ja, det ser ut som passord må nullstilles."
              },
              {
                text: "Be dem gjette passord til det fungerer.",
                correct: false,
                feedback: "Feil. Det er ikke riktig prosess.",
                reply: "Vi trenger at dette håndteres riktig."
              }
            ]
          },
          {
            prompt: "Hva gjør du videre?",
            options: [
              {
                text: "Opprett sak til brukeradministrasjon med riktig informasjon.",
                correct: true,
                feedback: "Riktig. Nå må saken videre.",
                reply: "Supert. Vi avventer oppdatering.",
                ticketData: {
                  correctDepartment: "Brukeradministrasjon",
                  title: "Passordnullstilling / bruker får ikke logget inn",
                  reference: "Ny medarbeider",
                  description: "Ny medarbeider får ikke logget inn. Bruker finnes, men passord må nullstilles."
                }
              },
              {
                text: "Be dem vente til i morgen uten å opprette sak.",
                correct: false,
                feedback: "Feil. Saken må opprettes.",
                reply: "Det haster siden medarbeideren er på jobb."
              }
            ]
          },
          {
            prompt: "Hva gjenstår?",
            requiresClosedTicket: true,
            options: [
              {
                text: "Lukk saken når den er løst.",
                correct: true,
                feedback: "Riktig. Nå kan henvendelsen avsluttes.",
                reply: "Perfekt, takk."
              }
            ]
          }
        ]
      };
    }
  },
  {
    title: "Pris stemmer ikke i kassa",
    stores: ["7-Eleven Storo", "Narvesen Trondheim", "7-Eleven Jernbanetorget"],
    build() {
      const store = this.stores[Math.floor(Math.random() * this.stores.length)];
      return {
        title: this.title,
        store,
        intro: [
          "Hei! Kunden sier prisen i hylla ikke stemmer med kassa.",
          "Hva gjør vi videre?"
        ],
        steps: [
          {
            prompt: "Hva gjør du først?",
            options: [
              {
                text: "Be dem sjekke hylleforkant og kassapris og bekrefte avviket.",
                correct: true,
                feedback: "Riktig. Først må prisavviket bekreftes.",
                reply: "Ja, prisene stemmer ikke overens."
              },
              {
                text: "Si at kassapris alltid gjelder og avslutt.",
                correct: false,
                feedback: "Feil. Dette må undersøkes.",
                reply: "Vi trenger hjelp til å få dette rettet."
              }
            ]
          },
          {
            prompt: "Hva gjør du videre?",
            options: [
              {
                text: "Opprett sak til kategori og marked.",
                correct: true,
                feedback: "Riktig. Dette må til riktig avdeling.",
                reply: "Takk. Da avventer vi oppfølging.",
                ticketData: {
                  correctDepartment: "Kategori & marked",
                  title: "Prisavvik mellom hylle og kasse",
                  reference: "Prisavvik",
                  description: "Butikken melder prisavvik mellom hylle og kasse. Trenger kontroll av prisoppsett."
                }
              },
              {
                text: "Be dem ignorere det.",
                correct: false,
                feedback: "Feil. Prisavvik skal følges opp.",
                reply: "Dette må vi få ordnet."
              }
            ]
          },
          {
            prompt: "Hva gjenstår?",
            requiresClosedTicket: true,
            options: [
              {
                text: "Lukk saken når den er løst.",
                correct: true,
                feedback: "Riktig. Nå er henvendelsen ferdig.",
                reply: "Flott, takk for hjelpen."
              }
            ]
          }
        ]
      };
    }
  },
  {
    title: "Skriver ikke ut kvittering",
    stores: ["Narvesen Oslo S", "Narvesen Stavanger", "7-Eleven Lillestrøm"],
    build() {
      const store = this.stores[Math.floor(Math.random() * this.stores.length)];
      return {
        title: this.title,
        store,
        intro: [
          "Hei! Kvitteringsskriveren skriver ikke ut.",
          "Kundene står i kø."
        ],
        steps: [
          {
            prompt: "Hva gjør du først?",
            options: [
              {
                text: "Be dem sjekke strøm, papir og kabler først.",
                correct: true,
                feedback: "Riktig. God enkel feilsøk.",
                reply: "Vi har sjekket det, men den fungerer fortsatt ikke."
              },
              {
                text: "Be dem starte hele butikknettet på nytt.",
                correct: false,
                feedback: "Feil. For stort tiltak som første steg.",
                reply: "Det blir litt voldsomt akkurat nå."
              }
            ]
          },
          {
            prompt: "Hva gjør du videre?",
            options: [
              {
                text: "Opprett sak til Drift.",
                correct: true,
                feedback: "Riktig. Dette må videre til Drift.",
                reply: "Supert. Da trenger vi videre hjelp.",
                ticketData: {
                  correctDepartment: "Drift",
                  title: "Kvitteringsskriver fungerer ikke",
                  reference: "Skriver",
                  description: "Kvitteringsskriver skriver ikke ut selv etter enkel feilsøk."
                }
              },
              {
                text: "Be dem ignorere problemet.",
                correct: false,
                feedback: "Feil. Dette må følges opp.",
                reply: "Vi må få dette løst."
              }
            ]
          },
          {
            prompt: "Hva gjenstår?",
            requiresClosedTicket: true,
            options: [
              {
                text: "Lukk saken når den er løst.",
                correct: true,
                feedback: "Riktig.",
                reply: "Supert, nå fungerer det igjen."
              }
            ]
          }
        ]
      };
    }
  }
];

let state = {};

const scenarioList = document.getElementById("scenarioList");
const scenarioTitle = document.getElementById("scenarioTitle");
const scenarioMeta = document.getElementById("scenarioMeta");
const chatBox = document.getElementById("chatBox");
const stepBox = document.getElementById("stepBox");
const ticketList = document.getElementById("ticketList");
const gtinInput = document.getElementById("gtinInput");
const gtinResult = document.getElementById("gtinResult");

const ticketModal = document.getElementById("ticketModal");
const ticketDepartment = document.getElementById("ticketDepartment");
const ticketStore = document.getElementById("ticketStore");
const ticketTitle = document.getElementById("ticketTitle");
const ticketReference = document.getElementById("ticketReference");
const ticketDescription = document.getElementById("ticketDescription");
const ticketError = document.getElementById("ticketError");

let pendingScenarioId = null;
let pendingTicketCorrectDepartment = null;

function resetState() {
  state = {
    scenarios: [],
    tickets: [],
    selectedScenarioId: null,
    score: 0
  };

  addRandomScenario();
  addRandomScenario();
  render();
}

function addRandomScenario() {
  if (state.scenarios.length >= 3) return;

  const template = scenarioTemplates[Math.floor(Math.random() * scenarioTemplates.length)];
  const built = template.build();

  const scenario = {
    id: "sc_" + Date.now() + "_" + Math.floor(Math.random() * 10000),
    title: built.title,
    store: built.store,
    history: built.intro.map(text => ({ type: "store", text })),
    steps: built.steps,
    currentStep: 0,
    completed: false,
    ticketId: null,
    visited: false,
    removing: false
  };

  state.scenarios.push(scenario);

  if (!state.selectedScenarioId) {
    state.selectedScenarioId = scenario.id;
  }
}

function getSelectedScenario() {
  return state.scenarios.find(s => s.id === state.selectedScenarioId);
}

function render() {
  renderScenarioList();
  renderScenario();
  renderTickets();
}

function renderScenarioList() {
  scenarioList.innerHTML = "";

  state.scenarios.forEach(scenario => {
    const div = document.createElement("div");
    div.className = "scenario-item";

    if (scenario.id === state.selectedScenarioId) {
      div.classList.add("active");
    }

    if (scenario.visited) {
      div.classList.add("visited");
    }

    if (scenario.removing) {
      div.classList.add("fade-out");
    }

    div.innerHTML = `
      <div class="title">${scenario.title}</div>
      <div class="meta">${scenario.store}</div>
    `;

    div.onclick = () => {
      scenario.visited = true;
      state.selectedScenarioId = scenario.id;
      render();
    };

    scenarioList.appendChild(div);
  });
}

function renderScenario() {
  const scenario = getSelectedScenario();

  if (!scenario) {
    scenarioTitle.textContent = "Ingen henvendelse valgt";
    scenarioMeta.textContent = "";
    chatBox.innerHTML = "";
    stepBox.innerHTML = "";
    return;
  }

  scenarioTitle.textContent = scenario.title;
  scenarioMeta.textContent = scenario.store;

  chatBox.innerHTML = "";
  scenario.history.forEach(msg => {
    const div = document.createElement("div");
    let cls = "message ";
    if (msg.type === "store") cls += "store";
    if (msg.type === "agent") cls += "agent";
    if (msg.type === "system-good") cls += "system-good";
    if (msg.type === "system-bad") cls += "system-bad";
    div.className = cls;
    div.textContent = msg.text;
    chatBox.appendChild(div);
  });

  stepBox.innerHTML = "";

  if (scenario.completed) {
    const btn = document.createElement("button");
    btn.textContent = "Fjern ferdig henvendelse";
    btn.onclick = () => removeScenarioWithFade(scenario.id);
    stepBox.appendChild(btn);
    return;
  }

  const step = scenario.steps[scenario.currentStep];
  if (!step) return;

  const prompt = document.createElement("h3");
  prompt.textContent = step.prompt;
  stepBox.appendChild(prompt);

  if (step.requiresClosedTicket) {
    const ticket = state.tickets.find(t => t.id === scenario.ticketId);

    if (!ticket) {
      const info = document.createElement("p");
      info.textContent = "Du må opprette saken først.";
      stepBox.appendChild(info);
      return;
    }

    if (ticket.status !== "closed") {
      const info = document.createElement("p");
      info.textContent = "Vent til saken er løst, og lukk den deretter i fanen Saker.";
      stepBox.appendChild(info);
      return;
    }
  }

  step.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option.text;
    btn.onclick = () => handleOption(scenario.id, option);
    stepBox.appendChild(btn);
  });
}

function handleOption(scenarioId, option) {
  const scenario = state.scenarios.find(s => s.id === scenarioId);
  if (!scenario) return;

  scenario.history.push({ type: "agent", text: option.text });

  if (option.correct) {
    scenario.history.push({ type: "system-good", text: option.feedback });
    scenario.history.push({ type: "store", text: option.reply });
    state.score++;

    if (option.ticketData) {
      pendingScenarioId = scenario.id;
      pendingTicketCorrectDepartment = option.ticketData.correctDepartment;
      openTicketModal(option.ticketData, scenario.store);
      render();
      return;
    }

    scenario.currentStep++;

    if (scenario.currentStep >= scenario.steps.length) {
      scenario.completed = true;
      scenario.history.push({ type: "system-good", text: "Henvendelsen er ferdig." });
    }
  } else {
    scenario.history.push({ type: "system-bad", text: option.feedback });
    scenario.history.push({ type: "store", text: option.reply });
  }

  render();
}

function openTicketModal(ticketData, store) {
  ticketDepartment.value = "";
  ticketStore.value = store || "";
  ticketTitle.value = ticketData.title || "";
  ticketReference.value = ticketData.reference || "";
  ticketDescription.value = ticketData.description || "";
  ticketError.textContent = "";
  ticketModal.classList.remove("hidden");
}

function closeTicketModal() {
  ticketModal.classList.add("hidden");
  pendingScenarioId = null;
  pendingTicketCorrectDepartment = null;
  ticketError.textContent = "";
}

function saveTicket() {
  const department = ticketDepartment.value.trim();
  const store = ticketStore.value.trim();
  const title = ticketTitle.value.trim();
  const reference = ticketReference.value.trim();
  const description = ticketDescription.value.trim();

  if (!department || !store || !title || !reference || !description) {
    ticketError.textContent = "Fyll inn alle feltene.";
    return;
  }

  if (department !== pendingTicketCorrectDepartment) {
    ticketError.textContent = "Feil avdeling valgt. Velg riktig avdeling for å opprette saken.";
    return;
  }

  const ticket = {
    id: "SAK-" + String(state.tickets.length + 1).padStart(3, "0"),
    scenarioId: pendingScenarioId,
    department,
    store,
    title,
    reference,
    description,
    status: "open",
    message: "Saken er sendt videre.",
    removing: false
  };

  state.tickets.push(ticket);

  const scenario = state.scenarios.find(s => s.id === pendingScenarioId);
  if (scenario) {
    scenario.ticketId = ticket.id;
    scenario.currentStep++;
    scenario.history.push({ type: "system-good", text: `${ticket.id} er opprettet og sendt til ${department}.` });
    scenario.history.push({ type: "store", text: "Takk. Da avventer vi oppdatering." });
  }

  ticketModal.classList.add("hidden");
  pendingScenarioId = null;
  pendingTicketCorrectDepartment = null;
  render();

  setTimeout(() => {
    ticket.status = "resolved";

    if (ticket.department === "Brukeradministrasjon") {
      ticket.message = "Saken er løst, passord er nullstilt.";
    } else if (ticket.department === "Kategori & marked") {
      ticket.message = "Saken er løst av Kategori & marked.";
    } else if (ticket.department === "Drift") {
      ticket.message = "Saken er løst av Drift.";
    } else {
      ticket.message = "Saken er løst av avdelingen.";
    }

    const sc = state.scenarios.find(s => s.id === ticket.scenarioId);
    if (sc) {
      sc.history.push({ type: "system-good", text: `${ticket.id}: ${ticket.message}` });
      sc.history.push({ type: "store", text: "Supert, dette ser bra ut nå." });
    }

    render();
  }, 30000);
}

function renderTickets() {
  ticketList.innerHTML = "";

  if (state.tickets.length === 0) {
    ticketList.innerHTML = "<p>Ingen saker opprettet ennå.</p>";
    return;
  }

  state.tickets.forEach(ticket => {
    const div = document.createElement("div");
    div.className = "ticket-card";

    if (ticket.removing) {
      div.classList.add("fade-out");
    }

    div.innerHTML = `
      <div class="ticket-status">Status: ${ticket.status}</div>
      <div><strong>${ticket.id}</strong> - ${ticket.title}</div>
      <div>${ticket.store}</div>
      <div>${ticket.department}</div>
      <div>${ticket.description}</div>
      <div style="margin-top:8px;">${ticket.message}</div>
    `;

    if (ticket.status === "resolved") {
      const actions = document.createElement("div");
      actions.className = "ticket-actions";

      const btn = document.createElement("button");
      btn.textContent = "Lukk sak";
      btn.onclick = () => closeTicketWithFade(ticket.id);

      actions.appendChild(btn);
      div.appendChild(actions);
    }

    ticketList.appendChild(div);
  });
}

function closeTicketWithFade(ticketId) {
  const ticket = state.tickets.find(t => t.id === ticketId);
  if (!ticket) return;

  ticket.status = "closed";
  ticket.message = "Saken er lukket.";
  ticket.removing = true;

  const scenario = state.scenarios.find(s => s.id === ticket.scenarioId);
  if (scenario) {
    scenario.history.push({ type: "system-good", text: `${ticket.id} er lukket.` });

    const step = scenario.steps[scenario.currentStep];
    if (step && step.requiresClosedTicket) {
      scenario.currentStep++;
      if (scenario.currentStep >= scenario.steps.length) {
        scenario.completed = true;
        scenario.history.push({ type: "system-good", text: "Henvendelsen er ferdig." });
      }
    }
  }

  render();

  setTimeout(() => {
    state.tickets = state.tickets.filter(t => t.id !== ticketId);

    if (state.scenarios.length < 3 && Math.random() > 0.3) {
      addRandomScenario();
    }

    render();
  }, 350);
}

function removeScenarioWithFade(scenarioId) {
  const scenario = state.scenarios.find(s => s.id === scenarioId);
  if (!scenario) return;

  scenario.removing = true;
  render();

  setTimeout(() => {
    state.scenarios = state.scenarios.filter(s => s.id !== scenarioId);

    if (state.selectedScenarioId === scenarioId) {
      state.selectedScenarioId = state.scenarios[0]?.id || null;
    }

    if (state.scenarios.length < 2) {
      addRandomScenario();
    }

    render();
  }, 350);
}

document.querySelectorAll(".tab").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(button.dataset.tab).classList.add("active");
  });
});

document.getElementById("gtinBtn").addEventListener("click", () => {
  const value = gtinInput.value.trim();
  const product = products[value];

  if (!product) {
    gtinResult.innerHTML = "<p>Fant ingen vare.</p>";
    return;
  }

  gtinResult.innerHTML = `
    <p><strong>GTIN:</strong> ${value}</p>
    <p><strong>Vare:</strong> ${product.name}</p>
    <p><strong>Pris:</strong> ${product.price}</p>
    <p><strong>Avdeling:</strong> ${product.department}</p>
  `;
});

document.getElementById("restartBtn").addEventListener("click", resetState);
document.getElementById("cancelTicketBtn").addEventListener("click", closeTicketModal);
document.getElementById("saveTicketBtn").addEventListener("click", saveTicket);

resetState();