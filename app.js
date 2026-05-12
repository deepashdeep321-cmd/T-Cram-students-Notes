// ========== SAMPLE DATA ==========
const sampleNotes = [
  {
    id: 1,
    title: "Unit 1 – Arrays & Linked Lists",
    subject: "Data Structures",
    desc: "Complete notes covering arrays, singly & doubly linked lists with examples and diagrams.",
    uploader: "Ravi K",
    date: "Dec 2024",
    downloads: 84
  },
  {
    id: 2,
    title: "Unit 3 – Trees & Graphs",
    subject: "Data Structures",
    desc: "Binary trees, BST, AVL trees, BFS, DFS explained with visual walkthroughs.",
    uploader: "Meena S",
    date: "Jan 2025",
    downloads: 62
  },
  {
    id: 3,
    title: "ER Diagrams & Normalization",
    subject: "DBMS",
    desc: "1NF to BCNF explained with real-world examples. Includes practice questions.",
    uploader: "Arjun P",
    date: "Nov 2024",
    downloads: 97
  },
  {
    id: 4,
    title: "SQL Queries – Full Reference",
    subject: "DBMS",
    desc: "DDL, DML, DCL, joins, subqueries — all in one sheet with syntax and examples.",
    uploader: "Priya M",
    date: "Dec 2024",
    downloads: 130
  },
  {
    id: 5,
    title: "Process Scheduling Algorithms",
    subject: "OS",
    desc: "FCFS, SJF, Round Robin, Priority — with Gantt chart examples and solved problems.",
    uploader: "Karthik R",
    date: "Oct 2024",
    downloads: 75
  },
  {
    id: 6,
    title: "Memory Management & Paging",
    subject: "OS",
    desc: "Virtual memory, paging, segmentation, and page replacement algorithms explained clearly.",
    uploader: "Divya T",
    date: "Jan 2025",
    downloads: 58
  },
  {
    id: 7,
    title: "OOP Concepts – Java",
    subject: "OOP",
    desc: "Classes, objects, inheritance, polymorphism, abstraction, and encapsulation with Java code.",
    uploader: "Suresh N",
    date: "Sep 2024",
    downloads: 112
  },
  {
    id: 8,
    title: "Design Patterns Overview",
    subject: "OOP",
    desc: "Singleton, Factory, Observer, and MVC patterns with real-world analogies.",
    uploader: "Aisha B",
    date: "Feb 2025",
    downloads: 44
  },
  {
    id: 9,
    title: "Supervised Learning – Unit 2",
    subject: "Machine Learning",
    desc: "Linear regression, logistic regression, decision trees, and SVM with Python examples.",
    uploader: "Vijay C",
    date: "Mar 2025",
    downloads: 89
  },
  {
    id: 10,
    title: "OSI Model & TCP/IP",
    subject: "Networks",
    desc: "All 7 OSI layers explained with protocols, port numbers, and comparison with TCP/IP.",
    uploader: "Nandhini R",
    date: "Nov 2024",
    downloads: 68
  }
];

let currentSubject = "All";
let searchQuery = "";
let allNotes = [...sampleNotes];

// ========== RENDER NOTES ==========
function renderNotes() {
  const grid = document.getElementById("notesGrid");
  let filtered = allNotes;

  if (currentSubject !== "All") {
    filtered = filtered.filter(n => n.subject === currentSubject);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(n =>
      n.title.toLowerCase().includes(q) ||
      n.subject.toLowerCase().includes(q) ||
      n.desc.toLowerCase().includes(q)
    );
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="big">📭</div>
        <p>No notes found. Be the first to upload for this subject!</p>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map((note, i) => `
    <div class="note-card" style="animation-delay:${i * 0.05}s">
      <div class="note-subject-tag">${note.subject}</div>
      <div class="note-title">${note.title}</div>
      <div class="note-desc">${note.desc}</div>
      <div class="note-footer">
        <div class="note-uploader">
          <div class="note-avatar">${note.uploader.charAt(0)}</div>
          <span>${note.uploader} · ${note.date}</span>
        </div>
        <button class="note-dl" onclick="handleDownload(${note.id})">
          ⬇ ${note.downloads}
        </button>
      </div>
    </div>
  `).join("");
}

// ========== FILTER BY SUBJECT ==========
function filterBySubject(subject, btn) {
  currentSubject = subject;
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  renderNotes();
}

// ========== SEARCH ==========
function filterNotes() {
  searchQuery = document.getElementById("searchInput").value;
  renderNotes();
}

// ========== DOWNLOAD ==========
function handleDownload(id) {
  const note = allNotes.find(n => n.id === id);
  if (note) {
    note.downloads++;
    showToast(`📥 "${note.title}" download started!`);
    renderNotes();
  }
}

// ========== UPLOAD FORM ==========
function handleUpload(e) {
  e.preventDefault();

  const name    = document.getElementById("uploaderName").value.trim();
  const title   = document.getElementById("noteTitle").value.trim();
  const subject = document.getElementById("noteSubject").value;
  const desc    = document.getElementById("noteDesc").value.trim() || "No description provided.";

  if (!name || !title || !subject) return;

  const newNote = {
    id: allNotes.length + 1,
    title,
    subject,
    desc,
    uploader: name,
    date: new Date().toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
    downloads: 0
  };

  allNotes.unshift(newNote);

  // Reset form
  e.target.reset();

  // Switch to uploaded subject
  currentSubject = "All";
  searchQuery = "";
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.querySelector(".tab").classList.add("active");
  document.getElementById("searchInput").value = "";

  renderNotes();
  showToast("✅ Notes uploaded successfully!");

  // Scroll to grid
  document.getElementById("subjects").scrollIntoView({ behavior: "smooth" });
}

// ========== TOAST ==========
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

// ========== INIT ==========
renderNotes();
