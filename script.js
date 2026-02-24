const jobs = [
  { id: 1, company: "Google", position: "Frontend Developer", location: "Remote", type: "Full Time", salary: "$90,000" description:"Build modern UI using React.", status: "all"},
  { id: 2, company: "Microsoft", position: "Backend Developer", location: "USA", type: "Full Time", salary: "$100,000" description:"Develop scalable APIs.", status: "all"},
  { id: 3, company: "Amazon", position: "Cloud Engineer", location: "Canada", type: "Remote", salary: "$110,000" description:"Manage AWS services.", status: "all"},
  { id: 4, company: "Meta", position: "UI Designer", location: "UK", type: "Full Time", salary: "$80,000" description:"Design user-friendly interfaces.", status: "all"},
  { id: 5, company: "Netflix", position: "Data Analyst", location: "Remote", type: "Contract", salary: "$70,000" description:"Analyze streaming platform data.", status: "all"},
  { id: 6, company: "Tesla", position: "Software Engineer", location: "USA", type: "Full Time", salary: "$120,000" description:"Develop automotive software.", status: "all"},
  { id: 7, company: "Spotify", position: "Mobile Developer", location: "Sweden", type: "Full Time", salary: "$85,000" description:"Build modern UI using React.", status: "all"},
  { id: 8, company: "Adobe", position: "roduct Manager", location: "Germany", type: "Full Time", salary: "$95,000" description:"Lead product development.", status: "all"}
]

let currentTab = "all";

const container = document.getElementById("jobContainer");
const interviewCount = document.getElementById("interviewCount");
const rejectedCount = document.getElementById("rejectedCount");
const totalCount = document.getElementById("totalCount");
const tabCount = document.getElementById("tabCount");


function renderJobs() {
  container.innerHTML = "";

  let filtered = jobs.filter(job => {
    if (currentTab === "all")
      return true;
    return job.status === currentTab:

  });

  tabCount.innerText = filtered.length + " jobs";

  if (filtered.length === 0) {
    container.innerHTML = `
     <div class="empty-state">
        <img src="https://cdn-icons-png.flaticon.com/512/4076/4076506.png">
        <h3>No jobs available</h3>
        <p>Please check again later</p>
      </div>
    `;
    return;
  }

   filtered.forEach(job => {

    const card = document.createElement("div");
    card.className = "job-card";

    card.innerHTML = `
      <span class="delete-icon" onclick="deleteJob(${job.id})">🗑️</span>

      <h3>${job.company}</h3>
      <p><strong>${job.position}</strong></p>
      <p>${job.location} | ${job.type}</p>
      <p>${job.salary}</p>
      <p>${job.description}</p>

      <button class="interview-btn" onclick="setStatus(${job.id}, 'interview')">Interview</button>
      <button class="rejected-btn" onclick="setStatus(${job.id}, 'rejected')">Rejected</button>
    `;

    container.appendChild(card);
  });
}

function setStatus(id, status) {
  const job = jobs.find(j => j.id === id);

  if (job.status === status) {
    job.status = "all";
  } else {
    job.status = status;
  }

  updateDashboard();
  renderJobs();
}

function deleteJob(id) {

  const index = jobs.findIndex(j => j.id === id);
  jobs.splice(index, 1);

  updateDashboard();
  renderJobs();
}

function updateDashboard() {

  const interview = jobs.filter(j => j.status === "interview").length;
  const rejected = jobs.filter(j => j.status === "rejected").length;

  interviewCount.innerText = interview;
  rejectedCount.innerText = rejected;
  totalCount.innerText = jobs.length;
}

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", function () {

    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    this.classList.add("active");

    currentTab = this.dataset.tab;
    renderJobs();
  });
});
 

