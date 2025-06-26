// Dummy users for explore
const people = [
  { name: "Ananya", skills: ["Python", "ML"], emoji: "👩" },
  { name: "Yuvan", skills: ["Verilog", "VLSI"], emoji: "🧑" },
  { name: "Mrunal", skills: ["UI/UX", "Figma"], emoji: "👩" },
  { name: "Rishi", skills: ["C++", "DSA"], emoji: "🧑" },
  { name: "Kavya", skills: ["HTML", "CSS", "JS"], emoji: "👩" }
];

// Show username
window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("skilllinkUser"));
  if (!user && window.location.pathname.includes("dashboard")) {
    window.location.href = "login.html";
  } else if (user && document.getElementById("userName")) {
    document.getElementById("userName").textContent = user.name || "User";
  }
  loadExplore();
});

// Logout logic
function logout() {
  localStorage.removeItem("skilllinkUser");
  window.location.href = "login.html";
}

// Load people in skill explore
function loadExplore() {
  const grid = document.getElementById("exploreGrid");
  const input = document.getElementById("skillSearch");

  const render = (filter = "") => {
    grid.innerHTML = "";
    people
      .filter(p => p.skills.some(skill => skill.toLowerCase().includes(filter.toLowerCase())))
      .forEach(p => {
        const card = document.createElement("div");
        card.className = "glass p-4 rounded-xl space-y-2 shadow";
        card.innerHTML = `
          <div class="text-4xl">${p.emoji}</div>
          <div class="text-lg font-bold">${p.name}</div>
          <div class="text-white/60 text-sm">Skills: ${p.skills.join(", ")}</div>
          <button class="bg-blue-600 hover:bg-blue-700 px-4 py-1 mt-2 rounded-md">Request</button>
        `;
        grid.appendChild(card);
      });
  };

  input.addEventListener("input", () => render(input.value));
  render("");
}

// Chat logic
function sendChat() {
  const input = document.getElementById("chatInput");
  const message = input.value.trim();
  if (message) {
    const chatWindow = document.getElementById("chatWindow");
    const msgDiv = document.createElement("div");
    msgDiv.className = "bg-white/20 w-max px-4 py-2 rounded-xl text-sm self-end ml-auto";
    msgDiv.textContent = message;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    input.value = "";
  }
}
