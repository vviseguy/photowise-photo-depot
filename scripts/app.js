// scripts/app.js

const projects = [
  {
    id: 1,
    title: "Project Alpha",
    size: "20 MB",
    files: 10,
    lastAccessed: "2024-12-20",
  },
  {
    id: 2,
    title: "Project Beta",
    size: "15 MB",
    files: 8,
    lastAccessed: "2024-12-18",
  },
  {
    id: 3,
    title: "Project Gamma",
    size: "50 MB",
    files: 25,
    lastAccessed: "2024-12-15",
  },
];

const dummyPhotos = Array.from(
  { length: 20 },
  (_, i) => `https://picsum.photos/150?random=${i}`
);

const projectList = document.getElementById("project-list");
const archiveBtn = document.getElementById("archive");
const shareBtn = document.getElementById("share");
const downloadBtn = document.getElementById("download");
const checkedCount = document.getElementById("checked-count");
const searchInput = document.getElementById("search");
const clearBtn = document.getElementById("clear-btn");
const paneOverlay = document.getElementById("pane-overlay");
const photoGrid = document.getElementById("photo-grid");

let isSelectable = false;
let canAClickEventOpenAProjectPane = true;

function updateControls() {
  const checkedBoxes = document.querySelectorAll(
    '.project input[type="checkbox"]:checked'
  );
  const count = checkedBoxes.length;
  checkedCount.textContent = `${count} Selected`;
  const enabled = count > 0;
  
  checkedCount.hidden = !enabled;
  archiveBtn.disabled = !enabled;
  shareBtn.disabled = !enabled;
  downloadBtn.disabled = !enabled;

  if (count === 0) {
    hideSelectableMode();
  }
}

function enableSelectableMode() {
  if (!isSelectable) {
    isSelectable = true;
    document.querySelectorAll(".project").forEach((project) => {
      project.classList.add("selectable");
    });
  }
}

function hideSelectableMode() {
  isSelectable = false;
  document.querySelectorAll(".project").forEach((project) => {
    project.classList.remove("selectable");
    const checkbox = project.querySelector('input[type="checkbox"]');
    checkbox.checked = false;
  });
  updateControls();
}

function handleSearch() {
  const filter = searchInput.value.toLowerCase();
  document.querySelectorAll(".project").forEach((project) => {
    const title = project
      .querySelector(".project-title")
      .textContent.toLowerCase();
    project.classList.toggle("hidden", !title.includes(filter));
  });
  clearBtn.style.display = searchInput.value ? "block" : "none";
}

function renderProjects() {
  projectList.innerHTML = "";
  projects.forEach((project) => {
    const projectDiv = document.createElement("div");
    projectDiv.className = "project";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `checkbox-${project.id}`;
    checkbox.dataset.id = project.id;
    checkbox.addEventListener("change", updateControls);


    const checkboxContainer = document.createElement("label");
    checkboxContainer.setAttribute("for", `checkbox-${project.id}`);
    // checkboxContainer.style.display = "block";
    // checkboxContainer.style.height = "100%";
    // checkboxContainer.style.width = "100%";
    checkboxContainer.className = "checkbox-container";

    checkboxContainer.appendChild(checkbox);

    const details = document.createElement("div");
    details.className = "project-details";

    const title = document.createElement("div");
    title.className = "project-title";
    title.textContent = project.title;

    const meta = document.createElement("div");
    meta.className = "project-meta";
    meta.textContent = `Size: ${project.size} | Files: ${project.files} | Last Accessed: ${project.lastAccessed}`;

    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "project-buttons";

    const archiveBtn = document.createElement("button");
    archiveBtn.textContent = "Archive";
    archiveBtn.addEventListener("click", () =>
      alert(`Archived ${project.title}`)
    );

    const shareBtn = document.createElement("button");
    shareBtn.textContent = "Share";
    shareBtn.addEventListener("click", () => alert(`Shared ${project.title}`));

    const downloadBtn = document.createElement("button");
    downloadBtn.textContent = "Download";
    downloadBtn.addEventListener("click", () =>
      alert(`Downloaded ${project.title}`)
    );

    buttonsDiv.appendChild(archiveBtn);
    buttonsDiv.appendChild(shareBtn);
    buttonsDiv.appendChild(downloadBtn);
    details.appendChild(title);
    details.appendChild(meta);

    projectDiv.appendChild(checkboxContainer);
    projectDiv.appendChild(details);
    projectDiv.appendChild(buttonsDiv);

    projectDiv.addEventListener("mousedown", (e) => {
      canAClickEventOpenAProjectPane = true;
      const timer = setTimeout(() => {
        enableSelectableMode();
        checkbox.click();
        canAClickEventOpenAProjectPane = false;
      }, 500);

      projectDiv.addEventListener("mouseup", () => {
          clearTimeout(timer);
        },
        {
          once: true,
        }
      );
    });

    title.addEventListener("click", (e) => {
      if (canAClickEventOpenAProjectPane && e.target !== checkbox) {
        openProjectPane(project);
      }
      canAClickEventOpenAProjectPane = true;
    });

    projectList.appendChild(projectDiv);
  });
}

function openProjectPane(project) {
  paneOverlay.style.display = "flex";
  photoGrid.innerHTML = "";

  const infoDiv = document.createElement("div");
  infoDiv.style.marginBottom = "20px";
  infoDiv.innerHTML = `
            <h2>${project.title}</h2>
            <p>Size: ${project.size} | Files: ${project.files}</p>
            <p>Likes: <span id="likes-count">0</span> | Dislikes: <span id="dislikes-count">0</span></p>
        `;
  photoGrid.appendChild(infoDiv);

  let likes = 0;
  let dislikes = 0;

  dummyPhotos.forEach((photo) => {
    const photoDiv = document.createElement("div");
    photoDiv.className = "photo";

    const img = document.createElement("img");
    img.src = photo;
    img.alt = project.title;

    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "photo-buttons";

    const thumbsUpBtn = document.createElement("button");
    thumbsUpBtn.textContent = "👍";
    const thumbsDownBtn = document.createElement("button");
    thumbsDownBtn.textContent = "👎";

    thumbsUpBtn.addEventListener("click", () => {
      if (!thumbsUpBtn.classList.contains("active")) {
        likes++;
        if (thumbsDownBtn.classList.contains("active")) dislikes--;
      } else {
        likes--;
      }
      thumbsUpBtn.classList.toggle("active");
      thumbsDownBtn.classList.remove("active");
      updateLikesDislikes();
    });

    thumbsDownBtn.addEventListener("click", () => {
      if (!thumbsDownBtn.classList.contains("active")) {
        dislikes++;
        if (thumbsUpBtn.classList.contains("active")) likes--;
      } else {
        dislikes--;
      }
      thumbsDownBtn.classList.toggle("active");
      thumbsUpBtn.classList.remove("active");
      updateLikesDislikes();
    });

    buttonsDiv.appendChild(thumbsUpBtn);
    buttonsDiv.appendChild(thumbsDownBtn);
    photoDiv.appendChild(img);
    photoDiv.appendChild(buttonsDiv);
    photoGrid.appendChild(photoDiv);
  });

  function updateLikesDislikes() {
    document.getElementById("likes-count").textContent = likes;
    document.getElementById("dislikes-count").textContent = dislikes;
  }
}

paneOverlay.addEventListener("click", (e) => {
  if (e.target === paneOverlay) {
    paneOverlay.style.display = "none";
  }
});

document.getElementById("pane-close")?.remove();

searchInput.addEventListener("input", handleSearch);
clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  handleSearch();
});

archiveBtn.addEventListener("click", () => alert("Archive selected items"));
shareBtn.addEventListener("click", () => alert("Share selected items"));
downloadBtn.addEventListener("click", () => alert("Download selected items"));

renderProjects();
