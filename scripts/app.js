// File: app.js

import { fetchMetadata, fetchLowQualityImages } from "./projectData.js";
import {
  redirectToLogin,
  handleAuthRedirect,
  userAuthenticated,
} from "./auth.js";

const projectList = document.getElementById("project-list");
const archiveBtn = document.getElementById("archive");
const shareBtn = document.getElementById("share");
const downloadBtn = document.getElementById("download");
const searchInput = document.getElementById("search");
const clearBtn = document.getElementById("clear-btn");

let isSelectable = false;
let canAClickEventOpenAProjectPane = true;

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

async function renderProjects() {
  if (!userAuthenticated) {
    projectList.innerHTML =
      "<p>Please <a href='#' id='login-link'>log in</a> to view projects.</p>";

    document.getElementById("login-link").addEventListener("click", (e) => {
      e.preventDefault();
      redirectToLogin();
    });
    return;
  }

  projectList.innerHTML = "";

  const projects = await fetchMetadata();
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
    checkboxContainer.className = "checkbox-container";
    checkboxContainer.appendChild(checkbox);

    const details = document.createElement("div");
    details.className = "project-details";

    const title = document.createElement("div");
    title.className = "project-title";
    title.textContent = project.title;

    const meta = document.createElement("div");
    meta.className = "project-meta";
    const metadata = {
      Size: project.size,
      Files: project.fileCount,
      "Last Updated": project.lastModified,
    };
    meta.textContent = Object.entries(metadata)
      .filter(([key, value]) => !!value)
      .map(([key, value]) => `${key}: ${value}`)
      .join(" | ");
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

      projectDiv.addEventListener(
        "mouseup",
        () => {
          clearTimeout(timer);
        },
        { once: true }
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

async function openProjectPane(project) {
  const paneOverlay = document.getElementById("pane-overlay");
  const photoGrid = document.getElementById("photo-grid");

  paneOverlay.style.display = "flex";
  photoGrid.innerHTML = "";

  const infoDiv = document.createElement("div");
  infoDiv.innerHTML = `
    <h2>${project.title}</h2>
    <p>Size: ${project.size} | Files: ${project.fileCount}</p>
    <p>Likes: <span id="likes-count">0</span> | Dislikes: <span id="dislikes-count">0</span></p>
  `;
  photoGrid.appendChild(infoDiv);

  const photos = await fetchLowQualityImages(project.id);
  let likes = 0;
  let dislikes = 0;

  photos.forEach((photo) => {
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

function updateControls() {
  const checkedBoxes = document.querySelectorAll(
    '.project input[type="checkbox"]:checked'
  );
  const count = checkedBoxes.length;
  document.getElementById("checked-count").textContent = `${count} Selected`;
  const enabled = count > 0;

  document.getElementById("checked-count").hidden = !enabled;
  document.getElementById("archive").disabled = !enabled;
  document.getElementById("share").disabled = !enabled;
  document.getElementById("download").disabled = !enabled;

  if (count === 0) {
    hideSelectableMode();
  }
}

await handleAuthRedirect();

document.getElementById("pane-overlay").addEventListener("click", (e) => {
  if (e.target.id === "pane-overlay") {
    e.target.style.display = "none";
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
