
let currentFranchise = 'marvel';

function switchFranchise(franchise) {
    currentFranchise = franchise;
    renderFranchise();
}

function renderFranchise() {
    const container = document.getElementById('franchise-list');
    container.innerHTML = "<div class='loading'>Loading...</div>";

    setTimeout(() => {
        const list = franchiseData[currentFranchise];
        container.innerHTML = "";

        const watchedKey = `watched_${currentFranchise}`;
        const watchedData = JSON.parse(localStorage.getItem(watchedKey) || "[]");

        const progress = document.createElement("div");
        progress.className = "progress";
        const progressBar = document.createElement("div");
        progressBar.className = "progress-bar";
        progress.appendChild(progressBar);
        container.appendChild(progress);

        list.forEach((movie, index) => {
            const div = document.createElement("div");
            div.className = "movie";
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = watchedData.includes(index);
            checkbox.onchange = () => {
                if (checkbox.checked) watchedData.push(index);
                else watchedData.splice(watchedData.indexOf(index), 1);
                localStorage.setItem(watchedKey, JSON.stringify(watchedData));
                renderFranchise();
            };
            const label = document.createElement("label");
            label.textContent = ` ${movie.title} (${movie.duration} mins) — ${movie.fact}`;
            div.appendChild(checkbox);
            div.appendChild(label);
            container.appendChild(div);
        });

        const percent = (watchedData.length / list.length) * 100;
        progressBar.style.width = percent + "%";
        if (percent === 100) {
            progressBar.textContent = "100% Watched! 🔥";
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }, 300);
}
window.onload = renderFranchise;
