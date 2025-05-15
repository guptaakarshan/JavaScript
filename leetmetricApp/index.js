const searchButton = document.getElementById("search-button");
const inputBox = document.getElementById("user-input");

const easyCircle = document.querySelector(".easy-Progress").parentElement;
const mediumCircle = document.querySelector(".medium-Progress").parentElement;
const hardCircle = document.querySelector(".hard-Progress").parentElement;

const easyLabel = document.getElementById("easy-label");
const mediumLabel = document.getElementById("medium-label");
const hardLabel = document.getElementById("hard-label");

const statsCard = document.querySelector(".stats-card");
async function fetchUserDetails(username) {
  const url = `https://leetcode-stats-api.herokuapp.com/${username}`;

  try {
    searchButton.textContent = "Searching...";
    searchButton.disabled = true;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch");

    const data = await response.json();

    if (data.status === "success") {
      const {
        easySolved,
        totalEasy,
        mediumSolved,
        totalMedium,
        hardSolved,
        totalHard,
      } = data;

      statsCard.innerHTML = `
    <div class="card"><strong>Total Solved:</strong> ${data.totalSolved}</div>
    <div class="card"><strong>Total Questions:</strong> ${data.totalQuestions}</div>
    <div class="card"><strong>Acceptance Rate:</strong> ${data.acceptanceRate}%</div>
    <div class="card"><strong>Ranking:</strong> ${data.ranking}</div>
    <div class="card"><strong>Contribution Points:</strong> ${data.contributionPoints}</div>
    <div class="card"><strong>Reputation:</strong> ${data.reputation}</div>
  `;

      const easyPercent = Math.round((easySolved / totalEasy) * 100);
      const mediumPercent = Math.round((mediumSolved / totalMedium) * 100);
      const hardPercent = Math.round((hardSolved / totalHard) * 100);

      easyCircle.style.setProperty("--progress-degree", `${easyPercent}%`);
      mediumCircle.style.setProperty("--progress-degree", `${mediumPercent}%`);
      hardCircle.style.setProperty("--progress-degree", `${hardPercent}%`);

      easyLabel.textContent = `${easySolved}/${totalEasy}`;
      mediumLabel.textContent = `${mediumSolved}/${totalMedium}`;
      hardLabel.textContent = `${hardSolved}/${totalHard}`;
    } else {
      alert("User not found or data unavailable");
    }
  } catch (error) {
    alert("Something went wrong: " + error.message);
  } finally {
    searchButton.textContent = "Search";
    searchButton.disabled = false;
  }
}

searchButton.addEventListener("click", () => {
  const username = inputBox.value.trim();
  if (username) fetchUserDetails(username);
});
